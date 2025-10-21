---
name: Code releaser
description: To initiate a release by executing the dx-release script with appropriate parameters.
---

# Code releaser

## Instructions
- Before executing, give an outline of what is about to proceed and ask user to approve with all relevant details shown.
- DO NOT update package.json version number.
- DO NOT execute 'git push' or 'git tag' commands, these are handled by dx-release execution call.
- Ensure that the version provided follows semantic versioning (e.g., 1.0.0, 2.1.3) and does not contain the prefix 'v'.
- If version is not provided then:
  - Fetch latest changes from origin before:
    - Checking what the latest tag is
  - Ensure current branch is on master
    - If not on master, ask user if they want to switch to master branch.
  - When latest tag is found, set version appropriately based on whether user has specified major, minor, or patch increment.
    - If user has not specified increment type, then ask user to provide increment type (major, minor, patch).
- Ensure that the systemPath provided is correct and contains the .git folder.
- Ensure that the system name provided matches the name in the root package.json file, if it exists.
- If there is no package.json file at root then DO NOT proceed and exit.
- Once all parameters are validated, display a summary of the release prep details and prompt user for approval.
- When approval is given, execute dx-release script with relevant parameters, and return the output in a user friendly format with relevant release details and links if any.

## Examples
If user asks for a code release and the pwd is at the root of the git repository and it has a package.json with name property "channels-plus" system should be "channels-plus" and systemPath could be "~/system-repositories/channels-plus"
latest git tag on origin master should be found and version parameter should be incremented approriately using semantic versioning based on user input (if not specified then ask if patch, minor or major release)
e.g. latest tag found is 1.0.2
minor release would be 1.1.0
dx-release.js script will then be used to make the release