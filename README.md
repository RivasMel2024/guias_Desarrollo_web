# Guías de Desarrollo Web - Melisa Rivas

Este repositorio contiene guías y ejercicios de desarrollo web.

## Contenido

- **index.html**: Página principal con navegación a los ejemplos
- **20245324_guia1/**: Directorio con ejemplos y ejercicios de la Guía 1
  - Ejemplo 1: Estilos embebidos
  - Ejemplo 2: Ejemplo adicional
  - Ejemplo 3: Países
  - Ejercicio 1: Videojuego

## Hosting con GitHub Pages

Este sitio está configurado para ser desplegado automáticamente usando GitHub Pages. 

### Configuración

El sitio se despliega automáticamente cuando se realiza un push a la rama principal usando GitHub Actions. El workflow se encuentra en `.github/workflows/pages.yml`.

### Acceso al sitio

Una vez configurado GitHub Pages en el repositorio, el sitio estará disponible en:
`https://rivasmel2024.github.io/guias_Desarrollo_web/`

## Estructura de archivos

```
.
├── index.html              # Página principal
├── 20245324_guia1/        # Guía 1
│   ├── css/               # Archivos CSS
│   ├── img/               # Imágenes
│   ├── estilos_embebidos.html
│   ├── ejemplo2.html
│   ├── paises.html
│   └── videojuego.html
└── .github/
    └── workflows/
        └── pages.yml      # Workflow de GitHub Actions para Pages
```