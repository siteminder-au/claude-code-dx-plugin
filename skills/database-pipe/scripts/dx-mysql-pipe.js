#!/usr/bin/env zx
// dx-mysql-pipe.js
// Claude Code plugin to create a local mysql tunnel via `npx @siteminder/dx infrastructure mysql-pipe`
// Works both as interactive CLI (prompts for host/port) and as a programmatic tool (Claude).

import net from 'net';
import { spawn } from 'child_process';
import { promises as fsPromises, openSync } from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export const metadata = {
  name: 'dx-mysql-pipe',
  version: '1.0.0',
  description: 'Tunnel a remote MySQL server locally using npx @siteminder/dx infrastructure mysql-pipe. Interactive when run manually; programmatic when invoked by Claude.',
  author: 'Your Name'
};

export const tools = [
  {
    name: 'mysql_pipe',
    description: 'Create a local tunnel to a remote MySQL instance. Inputs: host (required), port (optional). If port is omitted it will auto-pick a free local port and run the tunnel detached.',
    input_schema: {
      type: 'object',
      properties: {
        host: { type: 'string', description: 'Remote MySQL host (e.g. my-db.cluster-xxx.us-west-2.rds.amazonaws.com)' },
        port: { type: ['integer', 'null'], description: 'Local port to bind the tunnel to (optional). If omitted, plugin will choose a free port.' },
        extraArgs: { type: 'string', description: 'Optional extra args passed verbatim to dx command (e.g. "--verbose true")' },
        detach: { type: 'boolean', description: 'If true (default true) spawn the tunnel as a detached background process.' }
      },
      required: ['host']
    }
  },
  {
    name: 'stop_tunnel',
    description: 'Stop a previously started tunnel. Provide either pid (preferred) or port.',
    input_schema: {
      type: 'object',
      properties: {
        pid: { type: 'integer' },
        port: { type: 'integer' }
      },
      required: []
    }
  }
];

/** Find a free local port by binding to port 0 */
async function findFreePort() {
  return await new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', (err) => reject(err));
    srv.listen(0, () => {
      const addr = srv.address();
      const port = addr && addr.port;
      srv.close((err) => {
        if (err) reject(err);
        else resolve(port);
      });
    });
  });
}

/** Check if a port is free (basic check) */
async function isPortFree(port) {
  return await new Promise((resolve) => {
    const s = net.createServer().once('error', () => {
      resolve(false);
    }).once('listening', () => {
      s.close(() => resolve(true));
    }).listen(port);
  });
}

/** Helper to prompt (only used when running interactively and inputs missing) */
async function promptFor(fieldName, hint = '') {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question(`${fieldName}${hint ? ` (${hint})` : ''}: `);
    return answer.trim();
  } finally {
    await rl.close();
  }
}

/** Execute tool */
export async function execute({ tool_name, tool_input = {}, cwd = process.cwd() }) {
  if (tool_name === 'mysql_pipe') {
    try {
      // Extract inputs
      let { host, port, extraArgs = '', detach = true } = tool_input;

      // If host missing and we are interactive (tty available), prompt
      if (!host && process.stdin.isTTY) {
        host = await promptFor('Enter MySQL host', 'e.g. platform-dev-...us-west-2.rds.amazonaws.com');
      }

      if (!host) {
        return { success: false, error: 'Missing required parameter: host' };
      }

      // If port missing and interactive, prompt; if left blank choose free port
      if ((port === undefined || port === null) && process.stdin.isTTY) {
        const portAns = await promptFor('Enter local port (leave blank to auto-pick)', 'or press Enter');
        if (portAns) {
          port = parseInt(portAns, 10);
          if (!Number.isInteger(port) || port < 1 || port > 65535) {
            return { success: false, error: `Invalid port entered: ${portAns}` };
          }
        } else {
          port = await findFreePort();
        }
      }

      // If port still missing (non-interactive), auto-pick
      if (port === undefined || port === null) {
        port = await findFreePort();
      } else {
        // ensure integer and port is free (if not free, return error)
        port = Number(port);
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
          return { success: false, error: `Invalid port provided: ${tool_input.port}` };
        }
        const free = await isPortFree(port);
        if (!free) {
          return { success: false, error: `Port ${port} is already in use` };
        }
      }

      // Build dx command args array
      // we call via `npx` so the first arg is @siteminder/dx
      const baseArgs = ['@siteminder/dx', 'infrastructure', 'mysql-pipe', '-h', host, '-p', String(port)];
      // If extra args provided, split by space (simple)
      const extraParts = extraArgs ? String(extraArgs).trim().split(/\s+/) : [];
      const finalArgs = baseArgs.concat(extraParts);

      const commandString = `npx ${finalArgs.map(a => a.includes(' ') ? `"${a}"` : a).join(' ')}`;

      // Logs
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const safeName = host.replace(/[^a-zA-Z0-9-_\.]/g, '_');
      const logDir = path.resolve(cwd, 'dx-mysql-pipe-logs');
      await fsPromises.mkdir(logDir, { recursive: true });
      const logPath = path.join(logDir, `dx-mysql-pipe_${safeName}_${port}_${timestamp}.log`);
      // Create or open the log file and get a file descriptor for redirection
      const fd = openSync(logPath, 'a');

      // If detach === true, spawn detached process (so tunnel stays up)
      if (detach) {
        // Spawn detached background process using OS shell-like npx invocation
        // Use 'npx' as command and finalArgs as args
        const child = spawn('npx', finalArgs, {
          cwd,
          detached: true,
          stdio: ['ignore', fd, fd] // ignore stdin, stdout+stderr -> logfile
        });

        // Detach from parent
        child.unref();

        // Return metadata to caller
        return {
          success: true,
          data: {
            requestedHost: host,
            usedLocalHost: '127.0.0.1',
            usedLocalPort: port,
            command: commandString,
            pid: child.pid,
            logPath,
            startedAt: new Date().toISOString(),
            detached: true,
            message: `Tunnel started (detached). Connect to 127.0.0.1:${port}. Logs: ${logPath}`
          }
        };
      } else {
        // Not detached: run and capture output (await completion). Useful for short-lived runs or debugging.
        // Use zx $ to capture stdout/stderr conveniently
        const fullCmd = `${commandString}`;
        const runResult = await $`${fullCmd}`;
        // runResult will have stdout/stderr strings
        // Write outputs to the logfile as well
        await fsPromises.appendFile(logPath, `=== STDOUT ===\n${runResult.stdout}\n\n=== STDERR ===\n${runResult.stderr}\n`);
        return {
          success: true,
          data: {
            requestedHost: host,
            usedLocalHost: '127.0.0.1',
            usedLocalPort: port,
            command: commandString,
            pid: null,
            logPath,
            startedAt: new Date().toISOString(),
            detached: false,
            stdout: String(runResult.stdout || ''),
            stderr: String(runResult.stderr || ''),
            message: `Command finished. See logs: ${logPath}`
          }
        };
      }

    } catch (error) {
      return { success: false, error: `Failed to create mysql pipe: ${error && error.message ? error.message : String(error)}` };
    }
  }

  if (tool_name === 'stop_tunnel') {
    try {
      const { pid, port } = tool_input || {};
      if (!pid && !port) {
        return { success: false, error: 'Provide pid or port to stop the tunnel' };
      }

      // If pid provided, kill process
      if (pid) {
        try {
          process.kill(pid, 'SIGTERM');
          return { success: true, data: { pid, message: `Sent SIGTERM to pid ${pid}` } };
        } catch (err) {
          return { success: false, error: `Failed to kill pid ${pid}: ${err.message}` };
        }
      }

      // If only port is provided, attempt to find process using that port (platform specific)
      if (port) {
        // Best-effort: run lsof to find pid (may not exist on all systems)
        try {
          // This uses shell; may require lsof installed (Linux/macOS). If unavailable, instruct user to kill manually.
          const findCmd = `lsof -ti tcp:${port} || true`;
          const ids = (await $`${findCmd}`).stdout.trim().split(/\s+/).filter(Boolean);
          if (ids.length === 0) {
            return { success: false, error: `No process found listening on port ${port}` };
          }
          const results = [];
          for (const id of ids) {
            try {
              process.kill(Number(id), 'SIGTERM');
              results.push({ pid: Number(id), killed: true });
            } catch (err) {
              results.push({ pid: Number(id), killed: false, error: err.message });
            }
          }
          return { success: true, data: { port, results } };
        } catch (err) {
          return { success: false, error: `Error while attempting to stop by port: ${err.message}` };
        }
      }
    } catch (error) {
      return { success: false, error: `stop_tunnel failed: ${error.message}` };
    }
  }

  return { success: false, error: `Unknown tool: ${tool_name}` };
}

export async function initialize() {
  console.log('dx-mysql-pipe plugin initialized');
}

export async function cleanup() {
  console.log('dx-mysql-pipe plugin cleanup');
}
