#!/usr/bin/env python3
"""PreToolUse hook: block hand-edits to Orval-generated code.

The generated client under src/shared/api/generated is machine-written;
CI fails on any drift. Regenerate instead: edit openapi/openapi.yaml,
then run `npm run api:gen`.
"""

import json
import sys

data = json.load(sys.stdin)
tool_input = data.get("tool_input", {})
path = tool_input.get("file_path", "") or tool_input.get("notebook_path", "")

if "src/shared/api/generated/" in path.replace("\\", "/"):
    print(
        "Blocked: src/shared/api/generated/** is Orval-generated. "
        "Edit openapi/openapi.yaml and run `npm run api:gen` instead.",
        file=sys.stderr,
    )
    sys.exit(2)
