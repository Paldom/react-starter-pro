#!/usr/bin/env python3
"""PostToolUse hook: run ESLint + Prettier on the file just edited.

Fast, file-scoped feedback loop for coding agents — a failing check exits 2
so the agent sees the output and fixes it immediately, instead of the issue
surfacing later in pre-commit/CI. Whole-project gates (tsc, vitest) stay in
the pre-push hook and CI.
"""

import json
import os
import subprocess
import sys

data = json.load(sys.stdin)
tool_input = data.get("tool_input", {})
path = tool_input.get("file_path", "")
project_dir = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())

if (
    not path
    or "/node_modules/" in path
    or "src/shared/api/generated/" in path.replace("\\", "/")
):
    sys.exit(0)

ext = os.path.splitext(path)[1]
issues: list[str] = []


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(
        cmd, capture_output=True, text=True, cwd=project_dir, timeout=120
    )


if ext in (".ts", ".tsx", ".js", ".mjs", ".cjs"):
    r = run(["npx", "eslint", "--no-warn-ignored", "--max-warnings", "0", path])
    if r.returncode != 0:
        issues.append((r.stdout + r.stderr).strip())

if ext in (".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".css", ".md",
           ".mdx", ".yml", ".yaml", ".html"):
    r = run(["npx", "prettier", "--check", path])
    if r.returncode != 0:
        issues.append(
            f"Prettier: {path} is not formatted. Run: npx prettier --write {path}"
        )

if issues:
    # cap output so a huge lint dump doesn't flood the agent context
    print("\n\n".join(issues)[:4000], file=sys.stderr)
    sys.exit(2)
