/* ===========================================================================
   Lógica de la página del equipo
   Toda la información se lee de EQUIPO (js/datos.js). Este archivo solo
   construye el HTML a partir de esos datos y maneja la interacción.
   =========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------
     1. UTILIDADES
     --------------------------------------------------------------- */

  // Devuelve las iniciales a partir del nombre y el apellido: "Jean Marco" + "Mendoza" -> "JM"
  function iniciales(nombre, apellido) {
    const a = (nombre   || '').trim().charAt(0);
    const b = (apellido || '').trim().charAt(0);
    return (a + b).toUpperCase() || '?';
  }

  // Genera un color estable a partir de un texto, para que cada integrante
  // tenga siempre el mismo avatar sin necesidad de definirlo a mano.
  function colorDesdeTexto(texto) {
    let suma = 0;
    for (let i = 0; i < texto.length; i++) {
      suma = texto.charCodeAt(i) + ((suma << 5) - suma);
    }
    const tono = Math.abs(suma) % 360;
    return 'linear-gradient(135deg, hsl(' + tono + ', 62%, 52%), hsl(' +
           ((tono + 42) % 360) + ', 66%, 44%))';
  }

  // Escapa texto antes de insertarlo como HTML
  function limpiar(texto) {
    const div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
  }

  const integrantes = Array.isArray(EQUIPO.integrantes) ? EQUIPO.integrantes : [];

  /* ---------------------------------------------------------------
     2. AVISO DE DATOS SIN COMPLETAR
     Recorre los datos buscando la palabra COMPLETAR y avisa. Cuando
     ya no queda ninguna, el aviso no se muestra.
     --------------------------------------------------------------- */

  (function verificarDatos() {
    const texto = JSON.stringify(EQUIPO).toUpperCase();
    const faltantes = (texto.match(/COMPLETAR/g) || []).length;

    if (faltantes > 0) {
      const aviso = document.getElementById('aviso');
      document.getElementById('avisoDetalle').textContent =
        ' Quedan ' + faltantes + ' campo(s) con el texto de ejemplo. ';
      aviso.hidden = false;
    }
  })();

  /* ---------------------------------------------------------------
     3. TEXTOS DE LA PORTADA Y EL PIE
     --------------------------------------------------------------- */

  document.getElementById('marcaTexto').textContent      = EQUIPO.nombre;
  document.getElementById('heroNombre').textContent      = EQUIPO.nombre;
  document.getElementById('heroLema').textContent        = EQUIPO.lema;
  document.getElementById('heroDescripcion').textContent = EQUIPO.descripcion;
  document.getElementById('sobreTexto').textContent      = EQUIPO.sobreNosotros;
  document.getElementById('pieNombre').textContent       = EQUIPO.nombre;
  document.title = EQUIPO.nombre + ' — Equipo de Desarrollo';

  document.getElementById('pieMeta').textContent =
    [EQUIPO.materia, EQUIPO.universidad, EQUIPO.anio].filter(Boolean).join(' · ');

  /* ---------------------------------------------------------------
     4. LISTA ÚNICA DE HABILIDADES DEL EQUIPO
     --------------------------------------------------------------- */

  const todasLasHabilidades = [];
  integrantes.forEach(function (persona) {
    (persona.habilidades || []).forEach(function (h) {
      if (todasLasHabilidades.indexOf(h) === -1) todasLasHabilidades.push(h);
    });
  });
  todasLasHabilidades.sort(function (a, b) { return a.localeCompare(b, 'es'); });

  /* ---------------------------------------------------------------
     5. CONTADORES DE LA PORTADA
     --------------------------------------------------------------- */

  const datosStats = [
    { valor: integrantes.length,          etiqueta: 'Integrantes' },
    { valor: todasLasHabilidades.length,  etiqueta: 'Habilidades' },
    { valor: 3,                           etiqueta: 'Tecnologías' }
  ];

  document.getElementById('stats').innerHTML = datosStats.map(function (s) {
    return '<li><span class="stat__valor" data-destino="' + s.valor + '">0</span>' +
           '<span class="stat__etiqueta">' + limpiar(s.etiqueta) + '</span></li>';
  }).join('');

  // Animación de conteo ascendente
  function animarContador(elemento) {
    const destino = parseInt(elemento.dataset.destino, 10) || 0;
    const duracion = 900;
    const inicio = performance.now();

    function paso(ahora) {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      // easing suave al final
      elemento.textContent = Math.round(destino * (1 - Math.pow(1 - avance, 3)));
      if (avance < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
  document.querySelectorAll('.stat__valor').forEach(animarContador);

  /* ---------------------------------------------------------------
     6. TARJETAS DE LOS INTEGRANTES
     --------------------------------------------------------------- */

  const grid = document.getElementById('gridIntegrantes');

  grid.innerHTML = integrantes.map(function (persona, indice) {
    const nombreCompleto = persona.nombre + ' ' + persona.apellido;
    const chips = (persona.habilidades || []).slice(0, 3).map(function (h) {
      return '<span class="chip">' + limpiar(h) + '</span>';
    }).join('');

    // Si tiene más de 3 habilidades, se indica cuántas quedan
    const extras = (persona.habilidades || []).length - 3;
    const chipExtra = extras > 0
      ? '<span class="chip chip--contador">+' + extras + '</span>'
      : '';

    return '' +
      '<article class="tarjeta revelar" data-indice="' + indice + '" tabindex="0" ' +
               'role="button" aria-label="Ver detalle de ' + limpiar(nombreCompleto) + '">' +
        '<div class="avatar" style="background:' + colorDesdeTexto(nombreCompleto) + '">' +
          limpiar(iniciales(persona.nombre, persona.apellido)) +
        '</div>' +
        '<h3 class="tarjeta__nombre">' + limpiar(nombreCompleto) + '</h3>' +
        '<p class="tarjeta__rol">' + limpiar(persona.rol) + '</p>' +
        '<div class="chips">' + chips + chipExtra + '</div>' +
        '<span class="tarjeta__ver">Ver detalle →</span>' +
      '</article>';
  }).join('');

  /* ---------------------------------------------------------------
     7. NUBE DE HABILIDADES
     --------------------------------------------------------------- */

  document.getElementById('nubeHabilidades').innerHTML =
    todasLasHabilidades.map(function (h) {
      return '<span class="chip">' + limpiar(h) + '</span>';
    }).join('');

  /* ---------------------------------------------------------------
     8. FILTRO POR HABILIDAD
     --------------------------------------------------------------- */

  const contenedorFiltros = document.getElementById('filtros');
  const sinResultados = document.getElementById('sinResultados');

  contenedorFiltros.innerHTML =
    '<button class="filtro is-activo" data-filtro="todos">Todos</button>' +
    todasLasHabilidades.map(function (h) {
      return '<button class="filtro" data-filtro="' + limpiar(h) + '">' + limpiar(h) + '</button>';
    }).join('');

  contenedorFiltros.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.filtro');
    if (!boton) return;

    // Marca el filtro activo
    contenedorFiltros.querySelectorAll('.filtro').forEach(function (b) {
      b.classList.toggle('is-activo', b === boton);
    });

    const filtro = boton.dataset.filtro;
    let visibles = 0;

    grid.querySelectorAll('.tarjeta').forEach(function (tarjeta) {
      const persona = integrantes[tarjeta.dataset.indice];
      const coincide = filtro === 'todos' ||
                       (persona.habilidades || []).indexOf(filtro) !== -1;

      tarjeta.classList.toggle('is-oculta', !coincide);
      if (coincide) visibles++;
    });

    sinResultados.hidden = visibles > 0;
  });

  /* ---------------------------------------------------------------
     9. MODAL DE DETALLE
     --------------------------------------------------------------- */

  const modal = document.getElementById('modal');
  let ultimoFoco = null;

  function abrirModal(indice) {
    const persona = integrantes[indice];
    if (!persona) return;

    const nombreCompleto = persona.nombre + ' ' + persona.apellido;
    const avatar = document.getElementById('modalAvatar');

    avatar.textContent = iniciales(persona.nombre, persona.apellido);
    avatar.style.background = colorDesdeTexto(nombreCompleto);

    document.getElementById('modalNombre').textContent      = nombreCompleto;
    document.getElementById('modalRol').textContent         = persona.rol;
    document.getElementById('modalDescripcion').textContent = persona.descripcion;
    document.getElementById('modalHabilidades').innerHTML =
      (persona.habilidades || []).map(function (h) {
        return '<span class="chip">' + limpiar(h) + '</span>';
      }).join('');

    ultimoFoco = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('sin-scroll');
    document.getElementById('modalCerrar').focus();
  }

  function cerrarModal() {
    modal.hidden = true;
    document.body.classList.remove('sin-scroll');
    if (ultimoFoco) ultimoFoco.focus();
  }

  // Abrir con clic o con teclado (Enter / Espacio)
  grid.addEventListener('click', function (evento) {
    const tarjeta = evento.target.closest('.tarjeta');
    if (tarjeta) abrirModal(tarjeta.dataset.indice);
  });

  grid.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Enter' && evento.key !== ' ') return;
    const tarjeta = evento.target.closest('.tarjeta');
    if (tarjeta) {
      evento.preventDefault();
      abrirModal(tarjeta.dataset.indice);
    }
  });

  document.getElementById('modalCerrar').addEventListener('click', cerrarModal);
  document.getElementById('modalFondo').addEventListener('click', cerrarModal);
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !modal.hidden) cerrarModal();
  });

  /* ---------------------------------------------------------------
     10. TEMA CLARO / OSCURO
     Se guarda en localStorage para recordar la preferencia.
     --------------------------------------------------------------- */

  const btnTema   = document.getElementById('btnTema');
  const iconoTema = document.getElementById('iconoTema');

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-tema', tema);
    iconoTema.textContent = tema === 'oscuro' ? '☀' : '☾';
    try { localStorage.setItem('tema-equipo', tema); } catch (e) { /* modo privado */ }
  }

  let temaGuardado = null;
  try { temaGuardado = localStorage.getItem('tema-equipo'); } catch (e) { /* ignorar */ }

  aplicarTema(temaGuardado ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'));

  btnTema.addEventListener('click', function () {
    const actual = document.documentElement.getAttribute('data-tema');
    aplicarTema(actual === 'oscuro' ? 'claro' : 'oscuro');
  });

  /* ---------------------------------------------------------------
     11. MENÚ RESPONSIVE
     --------------------------------------------------------------- */

  const btnMenu = document.getElementById('btnMenu');
  const nav = document.getElementById('nav');

  btnMenu.addEventListener('click', function () {
    const abierto = nav.classList.toggle('is-abierto');
    btnMenu.setAttribute('aria-expanded', abierto);
  });

  nav.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('nav__enlace')) {
      nav.classList.remove('is-abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------------------------------------------------------------
     12. EFECTOS AL HACER SCROLL
     --------------------------------------------------------------- */

  // Borde inferior de la cabecera al bajar
  const cabecera = document.getElementById('cabecera');
  window.addEventListener('scroll', function () {
    cabecera.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });

  // Aparición progresiva de los elementos marcados con .revelar
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.revelar').forEach(function (elemento, i) {
    elemento.style.transitionDelay = (i % 4) * 80 + 'ms';
    observador.observe(elemento);
  });

  // Resalta en el menú la sección que se está viendo
  const secciones = document.querySelectorAll('main section[id]');
  const enlaces = document.querySelectorAll('.nav__enlace');

  const observadorNav = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      enlaces.forEach(function (enlace) {
        enlace.classList.toggle('is-activo',
          enlace.getAttribute('href') === '#' + entrada.target.id);
      });
    });
  }, { threshold: 0.4 });

  secciones.forEach(function (seccion) { observadorNav.observe(seccion); });

});
