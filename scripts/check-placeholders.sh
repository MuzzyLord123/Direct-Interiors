#!/usr/bin/env bash
# CI/QA gate (brief §2.1): fail the build if any Duda template placeholder
# string survives into the built HTML output.
set -u

DIST="${1:-_site}"

if [ ! -d "$DIST" ]; then
  echo "ERROR: build output directory '$DIST' not found — run the build first." >&2
  exit 2
fi

PATTERNS=(
  "Slide title"
  "Write your caption here"
  "John Doe"
  "Molorpe"
  ">Button<"
  "Birthday Sparks"
  "Fashion Magazine"
  "Blurred Lines"
  "Lorem ipsum"
  "lorem ipsum"
)

status=0
for pattern in "${PATTERNS[@]}"; do
  matches=$(grep -rl --include="*.html" -F "$pattern" "$DIST" || true)
  if [ -n "$matches" ]; then
    echo "PLACEHOLDER FOUND: '$pattern' in:" >&2
    echo "$matches" >&2
    status=1
  fi
done

if [ "$status" -eq 0 ]; then
  echo "check-placeholders: OK — no template placeholder strings in $DIST"
else
  echo "check-placeholders: FAILED" >&2
fi
exit $status
