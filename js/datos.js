/* ===========================================================================
   DATOS DEL EQUIPO
   ---------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR.

   La página se arma sola con estos datos: si agregan o quitan integrantes,
   las tarjetas, los filtros y los contadores se actualizan solos.

   OJO: los campos marcados con  // ← REVISAR  son una propuesta. Cámbienlos
   por lo que el equipo decida antes de presentar.
   =========================================================================== */

const EQUIPO = {

  // Nombre del equipo -------------------------------------------------------
  nombre: "Vértice",                                          // ← REVISAR

  // Frase corta que aparece bajo el nombre
  lema: "Tres perfiles, un mismo punto de encuentro.",        // ← REVISAR

  // Descripción breve del equipo (aparece en la portada)
  descripcion:                                                // ← REVISAR
    "Somos un equipo de tres desarrolladores que combina bases de datos, " +
    "desarrollo web y móvil, control de calidad y creación de contenido 3D. " +
    "Cada integrante cubre un frente distinto del proceso de desarrollo.",

  // Texto más extenso para la sección 'Sobre el equipo'
  sobreNosotros:                                              // ← REVISAR
    "Nos formamos como equipo buscando cubrir el ciclo completo de un producto " +
    "de software: desde el modelo de datos y la lógica de negocio en el backend, " +
    "hasta la interfaz móvil, los recursos 3D y las pruebas que garantizan que " +
    "todo funcione. Trabajamos repartiendo responsabilidades según la fortaleza " +
    "de cada uno, pero revisando en conjunto lo que entregamos.",

  // Pie de página
  materia: "",                                                // ← COMPLETAR con el nombre de la materia
  universidad: "Universidad Privada del Valle",
  anio: "2026",

  // Integrantes -------------------------------------------------------------
  integrantes: [
    {
      nombre: "Yhoselin",
      apellido: "Mamani",
      rol: "Desarrollo móvil y modelado 3D",
      habilidades: ["Base de datos", "Desarrollo móvil", "Blender"],
      descripcion:
        "Se encarga del desarrollo de aplicaciones móviles y del diseño de la " +
        "estructura de datos que las sostiene. Aporta además el modelado y " +
        "renderizado 3D del equipo con Blender."
    },
    {
      nombre: "Jean Marco",
      apellido: "Mendoza Aliaga",
      rol: "Desarrollo full stack y QA",
      habilidades: ["Full stack", "QA", "Unity"],
      descripcion:
        "Trabaja tanto en el frontend como en el backend del proyecto y lleva " +
        "el control de calidad, definiendo y ejecutando las pruebas. Maneja " +
        "Unity para el desarrollo de aplicaciones interactivas."
    },
    {
      nombre: "Frank",
      apellido: "Marine",
      rol: "Backend y bases de datos",
      habilidades: ["Base de datos", "Laravel", "Lógica de negocios"],
      descripcion:
        "Construye el backend con Laravel y diseña las bases de datos del " +
        "proyecto. Se ocupa de traducir los requisitos del cliente en la " +
        "lógica de negocio que la aplicación debe cumplir."
    }
  ]
};
