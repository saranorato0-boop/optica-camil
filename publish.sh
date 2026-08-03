#!/usr/bin/env bash
set -euo pipefail

REMOTE_URL="${1:-}"
if [ -z "$REMOTE_URL" ]; then
  read -rp "Remote URL (https://github.com/user/repo.git): " REMOTE_URL
fi

# Inicializar si hace falta
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init
fi

# Asegurar rama main
if ! git show-ref --verify --quiet refs/heads/main; then
  git checkout -b main
else
  git checkout main
fi

# Añadir y commitear
git add -A
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  git commit -m "Initial commit for GitHub Pages" || true
else
  git commit -m "Update site" -a || true
fi

# Configurar remote (reemplaza si existe)
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

# Push
echo "Pushing to origin/main..."
git push -u origin main || echo "Push failed. Revisa el mensaje de error arriba."
