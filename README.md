# Óptica Camil — Sitio estático

Este repositorio contiene una versión estática de la web de prueba para Óptica Camil.

Cómo desplegar en GitHub Pages (resumen):

1. Crear el repositorio en GitHub (por ejemplo `optica-camil`).
2. En tu máquina local:
   ```bash
   cd "C:\Users\ferno\Downloads\HTML5"
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<TU_USUARIO>/optica-camil.git
   git push -u origin main
   ```
3. El workflow `pages.yml` desplegará automáticamente a GitHub Pages tras el `push`.
4. La URL será `https://<TU_USUARIO>.github.io/optica-camil/` (puede tardar unos minutos).

Notas:
- Asegúrate de usar `main` como la rama por defecto o cambiar el workflow.
- Si prefieres, puedes usar Netlify o Vercel para despliegues rápidos.

## Solución rápida a errores comunes de `git push`

- `remote origin already exists` — significa que ya tienes un `origin` configurado. Para reemplazarlo:

```powershell
git remote set-url origin https://github.com/<TU_USUARIO>/optica-camil.git
```

- `src refspec main does not match any` — significa que no existe la rama `main` localmente o no hay commits. Solución rápida:

```bash
git add .
git commit -m "Initial commit"   # si no hay commits aún
git branch -M main
git push -u origin main
```

Si quieres eliminar y volver a configurar el `origin`:

```bash
git remote remove origin
git remote add origin https://github.com/<TU_USUARIO>/optica-camil.git
git push -u origin main
```

## Scripts de publicación

He añadido dos scripts que automatizan la inicialización, commit y push:

- `publish.ps1` — PowerShell (Windows).
- `publish.sh` — Bash (Linux/macOS/Git Bash).

Uso (PowerShell):

```powershell
.\publish.ps1 https://github.com/<TU_USUARIO>/optica-camil.git
```

Uso (Bash):

```bash
./publish.sh https://github.com/<TU_USUARIO>/optica-camil.git
```

Ambos scripts intentan crear la rama `main`, hacer commit (si hay cambios), establecer o actualizar `origin` y hacer `push -u origin main`.
