// word-count-plugin.js
// A Claude Code plugin that counts words, lines, and characters in text files

import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Plugin metadata - Claude Code uses this to understand your plugin
 */
export const metadata = {
  name: 'word-count',
  version: '1.0.0',
  description: 'Analyze text files by counting words, lines, and characters',
  author: 'Your Name'
};

/**
 * Define the tools your plugin provides
 * Each tool needs a name, description, and parameter schema
 */
export const tools = [
  {
    name: 'count_words',
    description: 'Count words, lines, and characters in a text file. Returns detailed statistics about the file content.',
    input_schema: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path to the text file to analyze (relative or absolute)'
        },
        include_spaces: {
          type: 'boolean',
          description: 'Whether to include spaces in character count',
          default: true
        }
      },
      required: ['file_path']
    }
  }
];

/**
 * Handle tool execution
 * This function is called when Claude decides to use your tool
 */
export async function execute({ tool_name, tool_input, cwd }) {
  if (tool_name === 'count_words') {
    try {
      // Resolve the file path relative to current working directory
      const filePath = join(cwd, tool_input.file_path);
      
      // Read the file content
      const content = await readFile(filePath, 'utf-8');
      
      // Perform the analysis
      const lines = content.split('\n').length;
      const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
      
      let characters;
      if (tool_input.include_spaces !== false) {
        characters = content.length;
      } else {
        characters = content.replace(/\s/g, '').length;
      }
      
      // Calculate additional stats
      const avgWordsPerLine = lines > 0 ? (words / lines).toFixed(2) : 0;
      const avgCharsPerWord = words > 0 ? (characters / words).toFixed(2) : 0;
      
      // Return results in a structured format
      return {
        success: true,
        data: {
          file: tool_input.file_path,
          statistics: {
            lines,
            words,
            characters,
            avg_words_per_line: parseFloat(avgWordsPerLine),
            avg_chars_per_word: parseFloat(avgCharsPerWord)
          }
        }
      };
      
    } catch (error) {
      // Return error information to Claude
      return {
        success: false,
        error: `Failed to analyze file: ${error.message}`
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
  console.log('Word Count plugin initialized!');
}

/**
 * Optional: Cleanup (runs when Claude Code exits)
 */
export async function cleanup() {
  console.log('Word Count plugin shutting down...');
}