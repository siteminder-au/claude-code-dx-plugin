For Claude Code plugins, you should put your plugin file in the plugins directory that Claude Code uses.    ##### Here's where to place it:
Default Plugin Location

`~/.claude/plugins/`

So your full path would be:


Linux/Mac: `~/.claude/plugins/word-count-plugin.js`

Steps to Install

Create the plugins directory (if it doesn't exist):

`bash   mkdir -p ~/.claude/plugins`

Save your plugin file:

bash   # Copy or create the file
   `nano ~/.claude/plugins/word-count-plugin.js`
   # Then paste the plugin code

Restart Claude Code to load the plugin

Verify Installation
You can check if your plugin loaded successfully by:

Looking for the initialization message when Claude Code starts
Asking Claude to use the word count tool on a file
Checking Claude Code's plugin list (if available in your version)

Alternative: Custom Plugin Directory
If you want to use a different location, Claude Code typically supports configuring a custom plugins directory through its settings or config file, though you should check the official documentation at https://docs.claude.com for the exact configuration options available in your version.
The key is that Claude Code automatically discovers and loads all .js plugin files from the plugins directory on startup!


Once you've placed the plugin file in ~/.claude/plugins/, the tool is automatically available to Claude - you don't need to manually register commands!
How It Works

Automatic Loading: When Claude Code starts, it automatically discovers and loads all plugins from the plugins directory
Claude Decides When to Use It: During your conversation, Claude will automatically use the count_words tool when it's relevant to your request

Using Your Plugin
Just ask Claude naturally in your conversation:
bash# Start Claude Code in your project
claude-code

# Then in the conversation, just ask:
```
"Can you count the words in my README.md file?"
"Analyze the text statistics for docs/guide.txt"
"How many lines are in src/index.js?"
```

Claude will automatically:

Recognize it should use your count_words tool
Call the tool with the appropriate file path
Show you the results

No Manual Registration Needed!
Unlike some systems, Claude Code plugins don't require you to:

Run installation commands
Register the plugin manually
Import it explicitly

The plugin system is declarative - you just define what your tool does (in the tools array), and Claude figures out when to use it based on the conversation context.
Debugging
If the plugin isn't working:

Check Claude Code's startup logs for any loading errors
Ensure the file has proper ES module syntax (export statements)
Verify the file permissions are readable
Restart Claude Code after adding/modifying the plugin

That's it - the plugin integrates seamlessly into Claude's available toolset!