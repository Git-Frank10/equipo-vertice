# Vértice — Página del equipo de desarrollo

Aplicación web de presentación del equipo, desarrollada con **HTML, CSS y JavaScript**
puros: sin frameworks, sin dependencias y sin proceso de compilación.

Corresponde a la **Etapa 2** del proyecto de la materia.

## Integrantes

| Integrante | Rol | Habilidades |
|---|---|---|
| Yhoselin Mamani | Desarrollo móvil y modelado 3D | Base de datos · Desarrollo móvil · Blender |
| Jean Marco Mendoza Aliaga | Desarrollo full stack y QA | Full stack · QA · Unity |
| Frank Marine | Backend y bases de datos | Base de datos · Laravel · Lógica de negocios |

## Cómo ejecutarla

No requiere instalación. Basta con abrir `index.html` en el navegador.

Para levantarla con un servidor local (recomendado para presentarla):

```bash
# Con Python
python -m http.server 5500

# Con Node
npx serve
```

Después, abrir <http://localhost:5500>.

En VS Code también funciona con la extensión **Live Server**
(`code --install-extension ritwickdey.LiveServer`) y el botón *Go Live*.

## Estructura

```
.
├── index.html          Estructura de la página
├── css/
│   └── styles.css      Estilos, variables de tema y diseño responsive
└── js/
    ├── datos.js        Datos del equipo  ← único archivo a editar
    └── app.js          Renderizado e interacción
```

## Cómo modificar el contenido

Toda la información del equipo vive en `js/datos.js`. La página se construye a partir
de ese archivo: al agregar o quitar un integrante, las tarjetas, los filtros de
habilidades y los contadores se actualizan automáticamente.

```js
{
  nombre: "Nombre",
  apellido: "Apellido",
  rol: "Rol dentro del equipo",
  habilidades: ["Habilidad 1", "Habilidad 2"],
  descripcion: "Breve descripción del perfil."
}
```

## Funcionalidades

- Contenido generado dinámicamente desde `datos.js`.
- Filtro de integrantes por habilidad.
- Ventana de detalle por integrante (se cierra con `Esc` o clic fuera).
- Tema claro/oscuro con preferencia guardada en `localStorage`.
- Contadores animados y aparición progresiva de secciones al desplazarse.
- Diseño responsive con menú adaptado a móvil.
- Navegación por teclado y atributos ARIA en los elementos interactivos.
