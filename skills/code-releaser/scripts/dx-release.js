// dx-release.js
// A Claude Code plugin that initiates a release process by running @siteminder/dx release command and utilises atlassian mcp to create a release document on confluence

import { readFile } from 'fs/promises';
import { join } from 'path';
import { $, cd } from 'zx';

/**
 * Plugin metadata - Claude Code uses this to understand your plugin
 */
export const metadata = {
  name: 'dx-release',
  version: '1.0.0',
  description: 'Should handle when a release needs to be done',
  author: 'Mark Dagher'
};

/**
 * Define the tools your plugin provides
 * Each tool needs a name, description, and parameter schema
 */
export const tools = [
  {
    name: 'release',
    description: 'To initiate a release for a given system by executing the dx-release command with appropriate parameters',
    input_schema: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
          description: 'The version number for the release. This should follow semantic versioning (e.g., 1.0.0, 2.1.3) and not contain the prefix `v`'
        },
        systemPath: {
          type: 'string',
          description: 'The file system path to the root directory of the system to release'
        },
        system: {
          type: 'string',
          description: 'The system to release, this should be the root working directory that contains .git folder (Root of git repo). This should be the name provided in the root package.json file. If there is no package.json file at root then DO NOT proceed and exit'
        }
      },
      required: ['version', 'system', 'systemPath']
    }
  }
];

/**
 * Handle tool execution
 * This function is called when Claude decides to use your tool
 */
export async function execute({ tool_name, tool_input, cwd }) {
  if (tool_name === 'release') {
    try {

      // npx @siteminder/dx github release --new-version 4.410.0 --verbose true
      // cd into the system directory
      cd(tool_input.systemPath);

      // Execute the release command
      const releaseOutput = await $`npx @siteminder/dx github release --do-not-push --new-version ${tool_input.version} --verbose true`;
      // npx @siteminder/dx github release --do-not-push --new-version <input.version> --verbose true
      
      // Return results in a structured format
      return {
        success: true,
        data: {
          version: tool_input.version,
          system: tool_input.system,
          systemPath: tool_input.systemPath,
          releaseOutput: releaseOutput.stdout
        }
      };
      
    } catch (error) {
      // Return error information to Claude
      return {
        success: false,
        error: `Failed to release: ${error.message}`
      };
    }
  }
  
  return {
    success: false,
    error: `Unknown tool: ${tool_name}`
  };
}

/**
 * Optional: Initialize plugin (runs once when plugin loads)
 */
export async function initialize() {
  console.log('Release plugin initialized!');
}

/**
 * Optional: Cleanup (runs when Claude Code exits)
 */
export async function cleanup() {
  console.log('Release plugin shutting down...');
}