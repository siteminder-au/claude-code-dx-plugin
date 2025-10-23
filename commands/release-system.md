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
