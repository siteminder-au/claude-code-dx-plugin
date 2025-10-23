# `/release-system` Command

## Usage

```shell
/release-system <system> [version]
```
- `<system>`: **Required**. The system to release.
- `[version]`: Optional. The version to release.

## Workflow

1. **Trigger Release**
  - Calls the `code-releaser` skill with provided arguments.

2. **Release Documentation**
  - Prompt: "Do you want to also create a release doc?"
    - If **yes**, calls the `release-documenter` skill.

3. **Post-Release Checks**
  - Ask: "Is the build complete and config PR merged?"
    - If **yes**:
      - Ask user if they want to provide the buildkite pipeline url manually
      - If no - If user has buildkite MCP server setup, then use it to find the release pipeline that has been triggered by the release and monitor until any issues arise or some of it's jobs become pending and awaiting user approval / input.
        - if the pipeline is pending then ask user if they want to approve the release.
          - If yes use the dx approve all skill with the pipeline link as the buildkite url to pass to the dx approve skill
      - else:
        - Prompt: "Please provide the Buildkite link for the release."
          - Once provided call the `dx-approve` skill on the buildkite link provided and show the output

---

## Example

```shell
/release-system demand-manager 2.3.0
```

---

## Skills Used

- `code-releaser`
- `release-documenter` (if requested)
- `dx-approve` (if approved)
