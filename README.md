# DIP Historia CUJAE - Documentación

## Descripción

**DIP Historia CUJAE** es una plataforma educativa desarrollada como parte de un trabajo integrador para las asignaturas **Diseño de Interfaces y Pruebas (DIP)** e **Historia de Cuba** durante el curso 2024-2025. El proyecto combina rigor académico con un diseño centrado en el usuario, ofreciendo una experiencia interactiva para explorar temas históricos cubanos en el periodo que se nos asignó en la tarea (2005-2014).

## Características principales

- 🚀 Plataforma moderna basada en React con TypeScript y Vite
- 🎨 Estilos con TailwindCSS para un diseño consistente
- ⚡ Enrutamiento ligero mediante wouter
- 📚 Sistema de artículos basado en Markdown
- 🔍 Funcionalidad de búsqueda integrada

## Todo List:

- [x] Funcionalidad de búsqueda integrada
- [x] Soporte para navegadores mobile
- [ ] Diseño completamente responsive
- [ ] Optimización de imágenes automática
- [ ] Independencia del servidor para version apk

## Estructura del proyecto

```
├── public/                  # Archivos públicos
│   └── articles/            # Artículos en formato Markdown
│       ├── nombre-articulo/ # Carpeta por artículo
│       │   ├── images/      # Imágenes del artículo
│       │   └── index.md     # Contenido en Markdown
├── src/                     # Código fuente
│   ├── components/          # Componentes React
│   ├── pages/               # Vistas/páginas
│   ├── utils/               # Funciones utilitarias
│   └── styles/              # Estilos globales
```

## Documentación de la carpeta `public/articles`

La carpeta `public/articles` contiene todos los artículos históricos en formato Markdown, organizados de la siguiente manera:

1. **Estructura por artículo**:

   - Cada artículo tiene su propia carpeta con un nombre descriptivo en formato `kebab-case`
   - Ejemplo: `6to_congreso_del_pcc/`

2. **Contenido**:

   - `index.md`: Archivo Markdown con el contenido del artículo
     - Debe incluir metadatos en formato YAML frontmatter:
       ```markdown
       ---
       title: 'Título del artículo'
       author: 'Nombre del autor'
       desc: 'Resumen breve del artículo'
       tags: ['tag1', 'tag2']
       image:
         src: './images/Portada.jpg'
         alt: 'Desc. de la portada'
       ---
       ```
   - `images/`: Carpeta con imágenes relacionadas al artículo
     - Debe incluir al menos `Portada.jpg` (imagen principal)
     - Todas las imágenes deben estar optimizadas (recomendado: 1200px ancho máximo)

3. **Requisitos de formato**:
   - Los archivos Markdown deben usar encabezados semánticos (`##`, `###`)
   - Las imágenes se referencian con rutas relativas: `![Descripción](./images/nombre-imagen.jpg)`
   - Se recomienda mantener párrafos breves (3-5 líneas máximo)

## Instalación y desarrollo

### Requisitos previos

- Node.js v18+
- pnpm (recomendado) o npm

### Pasos para configurar el entorno

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/rodnye/dip-historia-cujae.git
   cd dip-historia-cujae
   ```

2. Instalar dependencias:

   ```bash
   pnpm install  # o npm install
   ```

3. Iniciar servidor de desarrollo:

   ```bash
   pnpm dev # o npm run dev
   ```

4. Para producción:
   ```bash
   pnpm start
   ```

## Scripts disponibles

| Comando        | Descripción                             |
| -------------- | --------------------------------------- |
| `pnpm dev`     | Inicia servidor de desarrollo           |
| `pnpm build`   | Crea versión optimizada para producción |
| `pnpm preview` | Previsualiza build de producción        |
| `pnpm lint`    | Ejecuta ESLint                          |
| `pnpm format`  | Formatea código con Prettier            |

## Cómo contribuir

Para añadir un nuevo artículo:

- Crear una nueva carpeta en `public/articles/`
- Incluir `index.md` con frontmatter válido
- Añadir imágenes en la subcarpeta `images/`
