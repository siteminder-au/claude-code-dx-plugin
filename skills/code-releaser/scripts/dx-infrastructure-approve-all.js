import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const metadata = {
  name: 'dx infrastructure approve-all',
  version: '1.0.0',
  description: 'approve all builds of a buildkite link',
  author: 'Alan Zhang'
}

export const tools = [
  {
    name: 'approve_all',
    description: 'Approve all builds of a buildkite link.',
    input_schema: {
      type: 'object',
      properties: {
        build_path: {
          type: 'string',
          description: 'Path to the buildkite build to approve'
        },
      },
      required: ['build_path']
    }
  }
]

export async function execute({ tool_name, tool_input }) {
  if (tool_name === 'approve_all') {
    try {
      const buildPath = tool_input.build_path

      const command = `npx @siteminder/dx infrastructure approve-all --tagged-build-url ${buildPath}`
      const { stdout, stderr } = await execAsync(command)

      return {
        success: true,
        data: {
          build_path: buildPath,
          approved: true,
          output: stdout,
          command_executed: command
        }
      }

    } catch (error) {
      return {
        success: false,
        error: `Failed to approve all builds: ${error.message}`,
        stderr: error.stderr
      }
    }
  }

  return {
    success: false,
    error: `Unknown tool: ${tool_name}`
  }
}

export async function initialize() {
  console.log('Approve All plugin initialized!');
}

export async function cleanup() {
  console.log('Approve All plugin shutting down...');
}
