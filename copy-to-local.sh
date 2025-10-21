#!/bin/bash

DEST="$HOME/.claude/plugins/dev-marketplace/siteminder-dx"
SCRIPT_NAME="$(basename "$0")"

rsync -av --exclude 'README.md' --exclude '.git' --exclude "$SCRIPT_NAME" ./ "$DEST"