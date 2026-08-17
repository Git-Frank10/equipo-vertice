# Vértice — Página web del equipo de desarrollo

> Tres perfiles, un mismo punto de encuentro.

Aplicación web de presentación del equipo **Vértice**, correspondiente a las Etapas 2 y 3
del proyecto de la materia.

---

## Descripción breve

Sitio web de una sola página que presenta al equipo de desarrollo: quiénes lo integran,
qué habilidades aporta cada uno y cómo se organizan para trabajar.

Toda la información se carga desde un único archivo de datos (`js/datos.js`), y la página
se construye dinámicamente a partir de él: las tarjetas de los integrantes, los filtros de
habilidades y los contadores se generan solos. Agregar o quitar un integrante no requiere
tocar el HTML.

Está desarrollada con tecnologías web puras, sin frameworks, sin librerías externas y sin
proceso de compilación: se abre directamente en cualquier navegador.

## Integrantes

| Integrante | Rol en el equipo | Principales habilidades |
|---|---|---|
| **Yhoselin Mamani** | Desarrollo móvil y modelado 3D | Base de datos · Desarrollo móvil · Blender |
| **Jean Marco Mendoza Aliaga** | Desarrollo full stack y QA | Full stack · QA · Unity |
| **Frank Marine** | Backend y bases de datos | Base de datos · Laravel · Lógica de negocios |

## Tecnologías utilizadas

| Tecnología | Uso dentro del proyecto |
|---|---|
| **HTML5** | Estructura semántica de la página (`header`, `main`, `section`, `article`, `footer`) y atributos ARIA para accesibilidad. |
| **CSS3** | Diseño completo mediante variables personalizadas (temas claro y oscuro), CSS Grid y Flexbox para el maquetado, *media queries* para el diseño responsive y animaciones con `@keyframes`. |
| **JavaScript (ES6+)** | Generación dinámica del contenido desde los datos, filtrado de integrantes, ventana modal, cambio de tema, contadores animados y efectos al desplazarse. |
| **Git y GitHub** | Control de versiones y publicación del repositorio. |
| **Visual Studio Code** | Entorno de desarrollo. |

**Sin dependencias externas.** No se utilizan frameworks (React, Vue, Bootstrap), ni
librerías (jQuery), ni gestores de paquetes. El proyecto no requiere `npm install` ni
ningún paso de compilación.

### APIs del navegador empleadas

- **IntersectionObserver** — aparición progresiva de las secciones al desplazarse y
  resaltado automático del enlace activo en el menú.
- **localStorage** — recuerda si el usuario eligió tema claro u oscuro.
- **matchMedia** — detecta la preferencia de tema del sistema operativo.
- **requestAnimationFrame** — animación de los contadores de la portada.

---

## Cómo ejecutar el proyecto

No requiere instalación. Basta con abrir `index.html` en cualquier navegador.

Para levantarlo con un servidor local (recomendado para presentarlo):

```bash
# Con Python
python -m http.server 5500

# Con Node.js
npx serve
```

Luego abrir <http://localhost:5500>.

En Visual Studio Code también funciona con la extensión **Live Server**:

```bash
code --install-extension ritwickdey.LiveServer
```

y el botón **Go Live** de la barra inferior.

## Estructura del proyecto

```
.
├── index.html          Estructura de la página
├── README.md
├── css/
│   └── styles.css      Estilos, variables de tema y diseño responsive
└── js/
    ├── datos.js        Datos del equipo  ← único archivo a editar
    └── app.js          Renderizado e interacción
```

## Funcionalidades

- Contenido generado dinámicamente a partir de `js/datos.js`.
- Filtro de integrantes por habilidad.
- Ventana de detalle por integrante, que se cierra con `Esc` o con clic fuera.
- Tema claro/oscuro con la preferencia guardada entre visitas.
- Contadores animados y aparición progresiva de las secciones.
- Diseño responsive, con menú adaptado a pantallas pequeñas.
- Navegación por teclado y atributos ARIA en los elementos interactivos.
- Avatares generados por código a partir de las iniciales, sin archivos de imagen.

## Cómo modificar el contenido

Toda la información del equipo se encuentra en `js/datos.js`. Para agregar un integrante,
basta con añadir un objeto al arreglo `integrantes`:

```js
{
  nombre: "Nombre",
  apellido: "Apellido",
  rol: "Rol dentro del equipo",
  habilidades: ["Habilidad 1", "Habilidad 2", "Habilidad 3"],
  descripcion: "Breve descripción del perfil."
}
```

Las tarjetas, los filtros y los contadores se actualizan automáticamente.
