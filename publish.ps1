param(
    [string]$RemoteUrl
)

if (-not $RemoteUrl) {
    $RemoteUrl = Read-Host "Remote URL (https://github.com/usuario/repo.git)"
}

# Inicializar repo si hace falta
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    git init
}

# Asegurar que estamos en la rama main
git show-ref --verify --quiet refs/heads/main
if ($LASTEXITCODE -ne 0) {
    git checkout -b main
} else {
    git checkout main
}

# Añadir y commitear
git add -A
# Si no hay commits aún, crear el commit inicial
git rev-parse --verify HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "Initial commit for GitHub Pages"
} else {
    git commit -m "Update site" -a 2>$null || Write-Host "No changes to commit"
}

# Configurar remote origin (reemplaza si existe)
$existing = git remote get-url origin 2>$null
if ($existing) {
    git remote set-url origin $RemoteUrl
} else {
    git remote add origin $RemoteUrl
}

# Push
Write-Host "Pushing to origin/main..."
git push -u origin main
Write-Host "Push finished or reported an error above."