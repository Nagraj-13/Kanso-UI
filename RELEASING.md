# Releasing & Versioning Guide for Kanso UI

This document provides a comprehensive overview of the automated release process, commit guidelines, versioning workflow, and release lifecycle for Kanso UI.

---

## Table of Contents

1. [Overview & Tech Stack](#overview--tech-stack)
2. [Commit Message Guidelines](#commit-message-guidelines)
3. [Changeset Workflow](#changeset-workflow)
4. [CI/CD Workflow (GitHub Actions)](#cicd-workflow-github-actions)
5. [Release Lifecycle](#release-lifecycle)
6. [Local Testing & Manual Release](#local-testing--manual-release)
7. [npm Publishing Configuration](#npm-publishing-configuration)
8. [Troubleshooting & Recovery](#troubleshooting--recovery)
9. [Branch Protection Recommendations](#branch-protection-recommendations)

---

## Overview & Tech Stack

To manage versions and releases, Kanso UI uses **Changesets** combined with **Commitlint**, **Husky**, and **GitHub Actions**.

### Why Changesets?

- **Decentralized Release Management**: Developers document version impact (major/minor/patch) and write user-facing release notes directly alongside code changes inside the feature branch.
- **Monorepo Compatibility**: While Kanso UI currently operates as a single-package repository, Changesets scales seamlessly to monorepos (e.g. standard workspace structures with multiple packages).
- **Automated & Custom Changelogs**: Changesets manages package versions and automatically generates raw changelog updates, which we then post-process to organize by Conventional Commit categories.

---

## Commit Message Guidelines

We enforce **Conventional Commits** using Commitlint and Husky to ensure clear commit history and standard categorizations. Every commit must follow this syntax:

```
type(scope): description
```

### Supported Commit Types

- `feat`: A new feature (corresponds to a **Minor** version bump)
- `fix`: A bug fix (corresponds to a **Patch** version bump)
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Breaking Changes

A breaking change must be indicated by:

1. Adding a `!` after the type/scope (e.g., `feat(button)!: remove old theme api`)
2. Including `BREAKING CHANGE:` in the footer of the commit message.

A breaking change triggers a **Major** version bump.

### Examples

- ✅ `feat(drawer): add custom animations`
- ✅ `fix(dialog): resolve keyboard trap on escape key`
- ✅ `refactor(utils): optimize cn function call`
- ❌ `added button loader` (Rejected by Commitlint: missing type)

---

## Changeset Workflow

For any pull request that includes code changes (components, hooks, lib utils, etc.), developers must create a **changeset**.

### Step 1: Run Changeset Command

Run the interactive command in your terminal:

```bash
pnpm changeset
```

### Step 2: Choose Version Impact

Use the arrow keys and spacebar to select the package and choose the version bump level (`patch`, `minor`, `major`) based on your changes:

- Select `patch` for fixes or refactoring.
- Select `minor` for new components or features.
- Select `major` for breaking API changes.

### Step 3: Enter Description

Write a description of the change. It is recommended to use Conventional Commit prefixes in the description so they can be grouped in the final release notes (e.g., `feat: added Drawer component`).

This creates a new markdown file in the `.changeset/` directory (e.g., `.changeset/slimy-crabs-dance.md`). Commit this file alongside your code changes.

```md
---
'kanso-ui': minor
---

feat: Added Drawer component.
```

---

## CI/CD Workflow (GitHub Actions)

We run two main workflows in GitHub Actions:

### 1. Continuous Integration (`ci.yml`)

Runs on **Pull Requests** targeting `dev` or `main`, and on **Pushes** to `dev`.

- Checks out code and restores the `pnpm` cache.
- Installs dependencies.
- **Verify Changeset**: Ensures that a changeset has been added/modified if any files under source directories (`app/`, `components/`, `lib/`, `hooks/`) have changed.
- Runs `pnpm lint`, `pnpm type-check`, `pnpm test run`, and `pnpm build`.
- If any step fails, the workflow fails and blocks the PR from merging.

### 2. Continuous Delivery / Release (`release.yml`)

Runs on **Pushes/Merges** to `main`.

- Runs all validation steps (lint, typecheck, tests, build).
- Runs our version bumper script (`pnpm version:bump`), which:
  1. Parses pending changeset files.
  2. Bumps package versions in `package.json`.
  3. Prepends the grouped changes to the root `CHANGELOG.md`.
  4. Generates `.github/RELEASE_NOTES.md`.
- Commits the updated version bump and `CHANGELOG.md` back to `main` with `[skip ci]` to prevent build loops.
- Creates the corresponding Git tag and GitHub Release using the generated release notes.
- Optionally publishes the packages to npm if enabled.

---

## Release Lifecycle

The typical progression of a feature release:

```
[Feature Branch]
   ├── Write code
   ├── Commit (validated by Husky + Commitlint)
   ├── Run 'pnpm changeset'
   └── Create Pull Request to 'dev'

[dev Branch (Integration)]
   ├── Pull Request triggers CI (runs checks + verifies changeset)
   └── Merge PR to 'dev' -> Triggers CI check on 'dev'

[main Branch (Production)]
   ├── Create PR from 'dev' to 'main'
   ├── Merge PR to 'main'
   └── 'Release' Action runs:
         ├── Bumps package version in package.json
         ├── Appends formatted release log to CHANGELOG.md
         ├── Creates Git tag (e.g., v1.1.0)
         ├── Creates GitHub Release grouped by Features, Fixes, etc.
         └── Publishes package to npm (optional)
```

---

## Local Testing & Manual Release

### 1. Testing the Version Bumper Locally

You can test the generation of release notes and changelog updates locally without committing or pushing tags:

```bash
# 1. Create a mock changeset if you don't have one
pnpm changeset

# 2. Run the version bump script
pnpm version:bump
```

Inspect the changes to `package.json` and `CHANGELOG.md`, as well as the generated `.github/RELEASE_NOTES.md`.

Once verified, you can revert the changes:

```bash
git checkout package.json CHANGELOG.md
git clean -fd .changeset/
rm -f .github/RELEASE_NOTES.md
```

### 2. Performing a Manual Release

If you need to release manually from your local command line (e.g., during network issues with CI/CD):

```bash
# 1. Clean build and test
pnpm lint && pnpm type-check && pnpm test run && pnpm build

# 2. Consume changesets and bump versions
pnpm version:bump

# 3. Commit version updates
git add package.json CHANGELOG.md
git commit -m "chore(release): v$(node -p "require('./package.json').version")"

# 4. Push to remote
git push origin main

# 5. Create Git Tag & Push
git tag v$(node -p "require('./package.json').version")
git push origin --tags

# 6. Publish to npm (if publishing is desired)
pnpm changeset publish
```

---

## npm Publishing Configuration

Publishing is disabled by default in `release.yml`. To enable it:

1. Add your npm publishing token as a GitHub Actions repository secret named `NPM_TOKEN`.
2. Ensure the repository's `package.json` `"private"` field is either removed or set to `false`.
3. In `.github/workflows/release.yml`, update the environment variable `PUBLISH_TO_NPM` to `'true'`:
   ```yaml
   env:
     PUBLISH_TO_NPM: 'true'
   ```

---

## Troubleshooting & Recovery

### 1. Release Failed During Push or Tagging

If the GitHub Actions runner failed after committing the version update but before pushing the tag or creating the release:

1. Identify the version number in the failed commit (e.g., `v1.2.0`).
2. Locally verify that the changesets are deleted and versions are bumped.
3. Manually tag the commit: `git tag v1.2.0` and push it: `git push origin v1.2.0`.
4. Create the GitHub Release manually from the tagged commit, using the version changelog section as the description.

### 2. Accidental Version Bump Without Changeset

If a PR was merged to `main` without a changeset, the Release workflow will notice no version changes and exit cleanly without publishing. To release these changes:

1. Create a branch from `main`.
2. Run `pnpm changeset` and commit the generated changeset.
3. Merge this branch back into `main` (or create a PR). The Release action will trigger and perform the release successfully.

---

## Branch Protection Recommendations

To prevent manual errors and protect the integrity of the release flow, apply the following branch protection settings in your GitHub Repository:

### For `main` (Production Branch)

- **Require a pull request before merging**: Prevent direct pushes to `main` from team members.
- **Require status checks to pass before merging**: Select the `CI Pipeline` check to guarantee only tested code is merged.
- **Require approvals**: Require at least 1 approval before merging.
- **Require branches to be up to date before merging**: Enforce rebase/merge of `dev` with `main` before landing.

### For `dev` (Integration Branch)

- **Require status checks to pass before merging**: Enforce successful `CI Pipeline` run.
- **Restrict force pushes**: Ensure Git history is kept linear.
