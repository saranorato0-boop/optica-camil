# Guía del proyecto Óptica Camil

## ¿Qué es Git?

Git es un sistema de control de versiones. Sirve para guardar los cambios de un proyecto, llevar historial y trabajar en equipo sin perder información.

### Conceptos básicos
- Repositorio: carpeta donde se guarda el proyecto y su historial.
- Commit: un punto de guardado de cambios.
- Branch: rama de trabajo, por ejemplo `main`.
- Push: enviar los cambios a GitHub.
- Pull: traer cambios desde GitHub a tu computadora.

## ¿Qué es GitHub Pages?

GitHub Pages es un servicio de GitHub para publicar sitios estáticos como HTML, CSS y JavaScript.

Cuando subes tu proyecto a GitHub y activas Pages, GitHub lo muestra en una URL pública como:

`https://tu-usuario.github.io/optica-camil/`

## ¿Cómo se subió este proyecto a GitHub Pages?

### Paso 1: preparar el proyecto
El proyecto ya está listo como una página estática con:
- [index.html](index.html)
- [detail.html](detail.html)
- [product.html](product.html)
- [Estilo.css](Estilo.css)
- [script.js](script.js)

### Paso 2: crear o usar un repositorio en GitHub
Se creó un repositorio en GitHub con el nombre `optica-camil`.

### Paso 3: iniciar Git en la carpeta del proyecto
Se inicializó Git localmente y se conectó con el repositorio remoto.

### Paso 4: guardar los cambios
Los archivos se añadieron con un commit:

```powershell
git add .
git commit -m "Actualizar sitio responsive y nuevas imágenes"
```

### Paso 5: subirlos a GitHub
Se enviaron los cambios al remoto con:

```powershell
git push -u origin main
```

### Paso 6: activar GitHub Pages
En GitHub debes entrar a:
1. `Settings`
2. `Pages`
3. Elegir `Deploy from a branch`
4. Seleccionar la rama `main`
5. Guardar

Luego GitHub procesa la publicación. Puede tardar unos minutos.

## Estructura del proyecto (tipo presentación)

### 1. Página principal
Archivo: [index.html](index.html)

Aquí está la portada del sitio:
- encabezado con menú
- banner principal
- sección “Quiénes Somos”
- productos
- promociones
- galería
- formulario de contacto
- footer

### 2. Detalle de productos
Archivo: [detail.html](detail.html)

Aquí se muestra información más detallada de cada categoría de productos.

### 3. Página de productos
Archivo: [product.html](product.html)

Sirve para mostrar el catálogo y la navegación entre productos.

### 4. Estilos
Archivo: [Estilo.css](Estilo.css)

Aquí se controlan:
- colores
- tipografías
- tamaños
- responsive
- botones
- secciones

### 5. Funcionalidad interactiva
Archivo: [script.js](script.js)

Aquí van las funciones de:
- menú móvil
- botón de subir
- carrito simple
- formularios
- animaciones

### 6. Imágenes
Carpeta: [imagenes](imagenes)

Aquí están las imágenes y recursos visuales del proyecto, como:
- [imagenes/banner.svg](imagenes/banner.svg)
- [imagenes/nosotros.svg](imagenes/nosotros.svg)
- [imagenes/armazones.svg](imagenes/armazones.svg)
- [imagenes/sol.svg](imagenes/sol.svg)
- [imagenes/contacto.svg](imagenes/contacto.svg)
- [imagenes/accesorios.svg](imagenes/accesorios.svg)
- [imagenes/logo.png](imagenes/logo.png)

## ¿Dónde cambiar las imágenes?

### Opción 1: cambiar una imagen ya usada
Busca la etiqueta `<img>` en los archivos HTML y cambia la ruta `src`.

Ejemplo:

```html
<img src="imagenes/banner.svg" alt="Banner principal">
```

Si quieres reemplazarla, puedes:
- cambiar el archivo en la carpeta [imagenes](imagenes)
- o usar otro nombre y actualizar la ruta en el HTML

### Opción 2: agregar una imagen nueva
1. Guarda la imagen nueva dentro de [imagenes](imagenes)
2. Abre el archivo HTML donde la quieras mostrar
3. Agrega una línea como esta:

```html
<img src="imagenes/mi-nueva-imagen.png" alt="Descripción">
```

### Opción 3: cambiar la imagen de un producto
Si los productos se cargan desde [script.js](script.js), también debes cambiar las rutas allí.

Por ejemplo, en la sección de productos del script puedes ver referencias como:

```javascript
img: 'imagenes/armazones.svg'
```

## Resumen rápido
- Git guarda los cambios del proyecto.
- GitHub Pages publica el sitio en internet.
- El código principal está en [index.html](index.html), [Estilo.css](Estilo.css) y [script.js](script.js).
- Las imágenes se cambian en la carpeta [imagenes](imagenes) y se referencian desde los archivos HTML o JavaScript.
