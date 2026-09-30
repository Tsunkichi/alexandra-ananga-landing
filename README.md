# Sitio web — Alexandra Ananga, Candidata a la Alcaldía de Palora

Landing page de scroll vertical para la campaña de Alexandra Ananga (Pachakutik Lista 18) a la Alcaldía de Palora, Morona Santiago, Ecuador. Elecciones seccionales: 29 de noviembre de 2026.

## Estructura del proyecto

```
alexandra/
├── index.html            ← Página principal
├── styles.css            ← Estilos (mobile-first)
├── main.js               ← JavaScript (~6 KB)
├── site.config.js        ← Configuración y modos
├── manifest.json         ← Manifiesto PWA
├── robots.txt            ← Para motores de búsqueda
├── sitemap.xml           ← Mapa del sitio
├── _headers              ← Ejemplo de cabeceras de seguridad
├── process_images.py     ← Script de procesamiento de imágenes
├── PENDIENTES.md         ← Lista de ítems por completar
├── assets/
│   └── img/
│       ├── hero-{480,800,1200}w.webp    ← Foto principal responsive
│       ├── photo2-{480,800,1200}w.webp  ← Foto secundaria responsive
│       ├── logo.png                      ← Logo con transparencia (400px)
│       ├── logo-small.png                ← Logo pequeño (200px)
│       ├── favicon-{32,180,512}.png     ← Favicons
│       └── og-image.jpg                  ← Imagen para compartir (1200×630)
├── DSC01450.jpg          ← Foto original (no subir al hosting)
├── DSC01348.jpg          ← Foto original (no subir al hosting)
└── logo.jpg              ← Logo original (no subir al hosting)
```

## Cómo editar contenido

### 1. Textos y propuestas

Abre `index.html` con cualquier editor de texto. Busca `[[POR COMPLETAR` para encontrar todos los campos que necesitan datos reales. Los más importantes:

- **Trayectoria**: Sección "Quién es" (~línea 100)
- **Propuestas**: 4 tarjetas en la sección "Propuestas" (~línea 130)
- **Enlaces**: TikTok, Facebook, WhatsApp (busca `POR COMPLETAR: URL`)

### 2. Enlaces de WhatsApp

Reemplaza `[[POR COMPLETAR: número]]` por el número con código de país, sin `+` ni espacios. Ejemplo: `593991234567`.

Esto aparece en 4 lugares: hero, pie, sección "Participa" y botón flotante.

### 3. Modo campaña y modo silencio

En `site.config.js`:

```js
MODO_CAMPANA: false,  // cambiar a true cuando inicie la campaña (12 nov 2026)
MODO_SILENCIO: false, // cambiar a true durante silencio electoral
```

- **`MODO_CAMPANA = true`**: Muestra el número de lista 18 destacado y activa llamados al voto.
- **`MODO_SILENCIO = true`**: Oculta toda propaganda. Solo queda la sección "Cómo votar".

### 4. Dominio

Busca y reemplaza `[[POR COMPLETAR: dominio]]` en todos los archivos por el dominio real (ej: `alexandraananga.ec`).

## Cómo desplegar

Este sitio es HTML/CSS/JS estático. Se puede subir a cualquier hosting:

### Cloudflare Pages (recomendado, gratis)

1. Sube la carpeta del proyecto a un repo de GitHub/GitLab
2. Ve a [Cloudflare Pages](https://pages.cloudflare.com)
3. Conecta el repo
4. Framework preset: "None"
5. Build command: (vacío)
6. Build output directory: `/` o `.`
7. El archivo `_headers` se aplicará automáticamente

### Netlify (alternativa, gratis)

1. Arrastra la carpeta a [Netlify Drop](https://app.netlify.com/drop)
2. El archivo `_headers` se aplicará automáticamente

### Cualquier otro hosting

Sube todos los archivos excepto:
- `DSC01450.jpg`, `DSC01348.jpg`, `logo.jpg` (originales, muy pesados)
- `process_images.py` (script de desarrollo)
- `.agents/` (configuración de skills)
- `skills-lock.json`

## Decisiones sobre imágenes

| Decisión | Justificación |
|---|---|
| **Fondo gris conservado** | Ambas fotos tienen un fondo gris claro uniforme de estudio que funciona bien sobre fondo blanco y sobre el panel gris claro del hero. No se justifica eliminarlo: el resultado sería peor (bordes en cabello largo) y violaría la regla de no alterar la apariencia. |
| **WebP sin AVIF** | No hay encoder AVIF disponible en el sistema. Pillow genera WebP con soporte nativo. El ahorro adicional de AVIF es ~10-15%, no justifica instalar dependencias extra. |
| **Logo: JPG → PNG con transparencia** | El logo original es JPG con fondo blanco sólido. Se removió el blanco mediante umbral de color (>240). Revisar bordes y, si no es satisfactorio, entregar un PNG/SVG original con transparencia. |
| **Favicons como cuadrado con logo centrado** | El logo es texto horizontal; no tiene un ícono separado. Se centra el logo completo en un cuadrado. A 32px el texto es muy pequeño pero reconocible. Idealmente, entregar un isotipo o inicial por separado. |
| **Calidad hero-1200w: q=75** | Se redujo de q=80 a q=75 para cumplir el presupuesto de ≤150KB. Resultado: 121.9KB con calidad visual aceptable. |

## Verificación

### Métricas del build

| Métrica | Resultado | Objetivo |
|---|---|---|
| JS total | 8.8 KB | < 30 KB ✅ |
| Peso total del sitio | ~700 KB | < 1 MB ✅ |
| Hero más grande | 121.9 KB | ≤ 150 KB ✅ |
| Recursos externos | 0 | 0 ✅ |
| `<h1>` en la página | 1 | 1 ✅ |
| `lang="es-EC"` | ✅ | ✅ |

### Accesibilidad

- HTML semántico con `<nav>`, `<main>`, `<section>`, `<footer>`
- Un solo `<h1>`, jerarquía h2 → h3
- Alt descriptivo en todas las imágenes
- `width` y `height` explícitos en todas las `<img>`
- `loading="lazy"` en todas las imágenes excepto el hero (`fetchpriority="high"`)
- Skip link al contenido principal
- Objetivos táctiles ≥ 48×48 px (botones) y ≥ 44×44 px (enlaces)
- Foco visible con `outline` de 3px
- `prefers-reduced-motion` respetado (scroll suave y animaciones desactivadas)
- Contraste verificado: azul marino #133C6D sobre blanco = 9.6:1 (AAA)
- Navegación por teclado funcional (Tab, Escape cierra menú)
- Atributos ARIA en botón de menú y regiones

### Paleta y contraste

| Combinación | Ratio | Nivel |
|---|---|---|
| #133C6D (primario) sobre #FFFFFF | 11.1:1 | AAA ✅ |
| #1a6b35 (acento) sobre #FFFFFF | 6.6:1 | AA ✅ |
| #4a4a5a (texto suave) sobre #FFFFFF | 8.7:1 | AAA ✅ |
| #FFFFFF sobre #133C6D (sección Participa) | 11.1:1 | AAA ✅ |
| #FFFFFF sobre #0d2a4d (pie) | 14.4:1 | AAA ✅ |
| #0a3d1a sobre #25d366 (botón WhatsApp) | 7.5:1 | AAA ✅ |
| #c93030 (rojo lista 18) sobre #FFFFFF | 5.3:1 | AA ✅ |

> Todas las combinaciones de texto cumplen WCAG 2.2 AA como mínimo.
