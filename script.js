// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyB0djqHeWvNLjWiBkNKMVz_SKbN2ulGcxY",
    authDomain: "checklist2025b1.firebaseapp.com",
    projectId: "checklist2025b1",
    storageBucket: "checklist2025b1.firebasestorage.app",
    messagingSenderId: "331478836194",
    appId: "1:331478836194:web:aee9b62b753da0ba940fbb",
    measurementId: "G-T6S0GQ4P4Z"
};

// --- DATOS DE LA APLICACIÓN ---
const programa = [ { sesion: "Viernes Mañana", participantes: [ { rol: "Presidente", nombre: "David Castro", hora: "9:30" }, { rol: "Oración", nombre: "Francisco José Sánchez" }, { rol: "Discursante", nombre: "Julián Lasheras ¿Qué es la adoración pura?", hora: "9:40", numero: 1 }, { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 1).", hora: "10:10", numero: 2 }, { rol: "Discursante", nombre: "Domingo Tarrasón", hora: "10:50", numero: 3 }, { rol: "Discursante", nombre: "Pedro Medina", hora: "11:11", numero: 4 }, { rol: "Discursante", nombre: "Daniel Velasco", hora: "11:28", numero: 5 }, { rol: "Discursante", nombre: "Álex Botella", hora: "11:45", numero: 6 } ] }, { sesion: "Viernes Tarde", participantes: [ { rol: "Presidente", nombre: "Eduardo Ayala" }, { rol: "Discursante", nombre: "Miguel Solé", hora: "13:50", numero: 7 }, { rol: "Discursante", nombre: "David Aleixandri", hora: "14:06", numero: 8 }, { rol: "Discursante", nombre: "David Maldonado", hora: "14:22", numero: 9 }, { rol: "Discursante", nombre: "Juan Martín Prior", hora: "14:36", numero: 10 }, { rol: "Discursante", nombre: "Elliot Miguel", hora: "15:00", numero: 11 }, { rol: "Discursante", nombre: "José Bonet", hora: "15:12", numero: 12 }, { rol: "Discursante", nombre: "Santiago Cardona", hora: "15:21", numero: 13 }, { rol: "Discursante", nombre: "Israel Malla", hora: "15:30", numero: 14 }, { rol: "Discursante", nombre: "Bárbaro Yuliexi Tejera Ríos", hora: "15:39", numero: 15 }, { rol: "Discursante", nombre: "Rafael Corral", hora: "15:48", numero: 16 }, { rol: "Discursante", nombre: "Míchel Gottardo", hora: "15:58", numero: 17 }, { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "16:10", numero: 18 }, { rol: "Oración Final", nombre: "Pedro Mora" } ] }, { sesion: "Sábado Mañana", participantes: [ { rol: "Presidente", nombre: "Abel Reguant" }, { rol: "Oración", nombre: "Ricardo Cordovilla" }, { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:¿Qué buscan?", hora: "9:40", numero: 19 }, { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:Las buenas noticias según Jesús (Episodio 2).", hora: "9:50", numero: 20 }, { rol: "Discursante", nombre: "Gabriel Quintana", hora: "10:30", numero: 21 }, { rol: "Discursante", nombre: "Manuel Casino", hora: "10:40", numero: 22 }, { rol: "Discursante", nombre: "Esteban Martín", hora: "10:49", numero: 23 }, { rol: "Discursante", nombre: "Kevin Adiel Cobo (BTL)", hora: "10:59", numero: 24 }, { rol: "Discursante", nombre: "Rubén Verdés", hora: "11:09", numero: 25 }, { rol: "Discursante", nombre: "David Mercader", hora: "11:17", numero: 26 }, { rol: "Discursante", nombre: "Daniel Sellares", hora: "11:25", numero: 27 }, { rol: "Discursante", nombre: "Natán Becerril", hora: "11:34", numero: 28 } ] }, { sesion: "Sábado Tarde", participantes: [ { rol: "Presidente", nombre: "Climent Ambrós" }, { rol: "Discursante", nombre: "Jonatán Vicente", hora: "13:50", numero: 29 }, { rol: "Discursante", nombre: "Santiago Sáez", hora: "14:00", numero: 30 }, { rol: "Discursante", nombre: "Ricardo Anguita", hora: "14:09", numero: 31 }, { rol: "Discursante", nombre: "Josué Rabaneda", hora: "14:20", numero: 32 }, { rol: "Discursante", nombre: "Edgar Teruel (BTL)", hora: "14:45", numero: 33 }, { rol: "Discursante", nombre: "Álvaro Paniagua", hora: "14:56", numero: 34 }, { rol: "Discursante", nombre: "Adolfo Fornieles", hora: "15:06", numero: 35 }, { rol: "Discursante", nombre: "Alfonso Guerrero", hora: "15:30", numero: 36 }, { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "16:00", numero: 37 }, { rol: "Oración Final", nombre: "Jairo José Galán" } ] }, { sesion: "Domingo Mañana", participantes: [ { rol: "Presidente", nombre: "Juan Alcaraz" }, { rol: "Oración", nombre: "José Diego" }, { rol: "Discursante", nombre: "Isaac Díaz", hora: "9:40", numero: 38 }, { rol: "Discursante", nombre: "Benjamín Ferrer", hora: "9:55", numero: 39 }, { rol: "Discursante", nombre: "Francisco Javier Vila", hora: "10:07", numero: 40 }, { rol: "Discursante", nombre: "Joseph Salazar", hora: "10:21", numero: 41 }, { rol: "Discursante", nombre: "Fernando Teruel", hora: "10:35", numero: 42 }, { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Los campos están Blacos, listos para la cosecha", hora: "10:49", numero: 43 }, { rol: "Discursante", nombre: "José Manuel Lara", hora: "11:15", numero: 44 }, { rol: "Discursante", nombre: "Nino Llopis", hora: "11:45", numero: 45 } ] }, { sesion: "Domingo Tarde", participantes: [ { rol: "Presidente", nombre: "Julián Lasheras" }, { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL", hora: "13:50", numero: 46 }, { rol: "Discursante", nombre: "Julián Lasheras", hora: "14:45", numero: 47 }, { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "14:54", numero: 48 }, { rol: "Oración Final", nombre: "Andrés Mayor (Betel)" } ] } ];
const itemsChecklist = [
    { id: 'recogida', texto: 'Recogida en presidencia', tipo: 'checkbox', icon: 'fa-solid fa-handshake', indicator: true },
    { id: 'orientacion', texto: 'Orientación inicial', tipo: 'checkbox', icon: 'fa-solid fa-compass', indicator: true },
    { id: 'maquillaje', texto: 'Maquillaje', tipo: 'radio', opciones: ['Maquillado', 'Sí', 'No', 'N/A'], icon: 'fa-solid fa-palette', indicator: true }, // 'Maquillado' añadido aquí
    { id: 'detras_plataforma', texto: 'Listo tras bastidores (20 min)', tipo: 'checkbox', icon: 'fa-solid fa-clock', indicator: true },
    { id: 'repaso_maquillaje', texto: 'Repaso final de maquillaje', tipo: 'checkbox', icon: 'fa-solid fa-brush', indicator: false },
    { id: 'recordatorios', texto: 'Recordatorios finales', tipo: 'checkbox', icon: 'fa-solid fa-bullhorn', indicator: false },
    { id: 'discursado', texto: 'Participación completada', tipo: 'checkbox', icon: 'fa-solid fa-microphone-slash', indicator: true }
];
const responsablesPorTurno = [ { "Día": "Viernes", "Turno": "Mañana", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Javier Bolivar", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Inma C., Vanessa C., Raquel P.", "Maquillaje Plataforma": "Gemma Monje" }, { "Día": "Viernes", "Turno": "Tarde", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Alejandro Hernandez", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Ana M., Sandra O., Gemma M.", "Maquillaje Plataforma": "Raquel Pallares" }, { "Día": "Sábado", "Turno": "Mañana", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Mario Martín", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Gemma M., Inma C., Sandra O.", "Maquillaje Plataforma": "Ana Marañón" }, { "Día": "Sábado", "Turno": "Tarde", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Javier Bolivar", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Vanessa C., Raquel P., Ana M.", "Maquillaje Plataforma": "Sandra Ortega" }, { "Día": "Domingo", "Turno": "Mañana", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Alejandro Hernandez", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Ana M., Sandra O., Vanessa C.", "Maquillaje Plataforma": "Inma Casino" }, { "Día": "Domingo", "Turno": "Tarde", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Mario Martín", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Gemma Monje, Ana M., Raquel P.", "Maquillaje Plataforma": "Vanessa Intriago" } ];
const instruccionesPorPerfil = [
  {
    perfil: "Recepción",
    icono: "fa-solid fa-hands-holding-child",
    color: "color-recepcion",
    instrucciones: [
      "Esperaremos a los oradores en presidencia donde les daremos la bienvenida.",
      `Los llevaremos a plataforma para las orientaciones. <span class="importante"><strong>Asignados por las mañanas 8:45</strong></span> y <span class="importante"><strong>asignados por las tardes 12:45</strong></span>`,
      "Dirigirlos a maquillaje (en principio estará situado al lado de presidencia)",
      "Asegurarnos que estén en plataforma al menos 20 minutos antes de su participación.",
      "Comprobar que llevan su tarjeta de solapa. (Tener preparada una tarjeta por si fuera necesario)."
    ]
  },
  {
    perfil: "Maquillaje",
    icono: "fa-solid fa-palette",
    color: "color-maquillaje",
    instrucciones: [
      "La decisión de usar maquillaje le corresponde a los participantes.",
      "No debe parecer que los hombres van maquillados, se trata de evitar brillos o reflejos en el rostro.",
      "No se maquilla a quienes hagan las oraciones, comenten durante la atalaya o sean entrevistados.",
      "Debemos asegurarnos que nuestra vestimenta sea decente \"en cualquier postura\" especialmente al acercarnos al orador para maquillarle."
    ]
  },
  {
    perfil: "Plataforma / Atrezzo",
    icono: "fa-solid fa-chair",
    color: "color-plataforma",
    instrucciones: [
      {
        titulo: "Antes del inicio de cada sesión:",
        puntos: [
          "Colocaremos una silla en el lado izquierdo de la plataforma. (El presidente del programa se sentará durante el video musical de 10 minutos).",
          "Comprobar el buen funcionamiento del cronómetro. (Disponemos de un cronómetro de repuesto si fuera necesario)."
        ]
      },
      {
        titulo: "Durante el programa:",
        puntos: [
          "Se pondrá en marcha el cronómetro al inicio del video musical con el que se empiezan todas las sesiones. (Sirve de referencia al presidente del programa para saber cuando va a terminar el video).",
          "Durante la canción de inicio de la sesión retiraremos la silla que usó el presidente del programa.",
          "Poner en marcha el cronómetro justo cuando el orador empiece a hablar y ponerlo a cero cuando termine."
        ]
      },
      {
        titulo: "Entrevistas:",
        puntos: [
          "Indicar a los entrevistados por donde deberán entrar y salir a plataforma y donde situarse (habrá unas marcas en el suelo como referencia).",
          "Entregar los micrófonos a los entrevistados y recordarles cómo usarlos.",
          "Preguntar al hermano de comunicación con AV qué micrófonos usar."
        ]
      }
    ]
  },
  {
    perfil: "Atril",
    icono: "fa-solid fa-person-chalkboard",
    color: "color-atril",
    instrucciones: [
      {
        titulo: "Comentar a los oradores las siguientes pautas antes de salir a plataforma: APENDICE F",
        puntos: [
          "En la plataforma, todos los teléfonos móviles y tabletas deben ponerse en modo avión. Además, el participante debe asegurarse de silenciar todas las alertas",
          "No aleje el atril del micrófono de pie.",
          "Proyecte la voz y utilice algo más de volumen e intensidad que en una conversación normal.",
          "Colocaremos el atril a la altura que les sea más cómoda para ellos, pero la altura y posición del micrófono la decidiréis vosotros.",
          "En el momento de ajustar el micrófono el orador debe permanecer erguido mirando al frente para facilitar vuestra labor.",
          "Recordarles que tienen que mirar a las cámaras que tienen enfrente y no al auditorio.",
          "Indique por qué lado de la plataforma saldrán los participantes.",
        ]
      },
      {
        titulo: "Recordatorios sobre la entrada y salida a plataforma:",
        puntos: [
          "Al acceder a plataforma se hará en este orden: Primero el hermano de plataforma, seguido del orador y del presidente de la sesión. (Entrarán en el mismo momento pero en este orden).",
          "El orador siempre entrarán por la derecha y saldrán por el lado izquierdo de plataforma.",
          "El hermano de plataforma entrará por la derecha y saldrá por la izquierda. (Excepto cuando el presidente use el atril, entonces saldrá por el lado derecho).",
          "El presidente del programa entrará y saldrá por la derecha cuando use el micrófono de pie. Solo en los inicios de sesión, cuando presenta desde el atril, saldrá por la izquierda."
        ]
      }
    ]
  },
  {
    perfil: "Comunicación AV",
    icono: "fa-solid fa-satellite-dish",
    color: "color-comunicación",
    instrucciones: [
      "Estar en contacto con audio y video antes del inicio de la sesión y durante todo el programa.",
      "1 minuto antes del inicio de cada sesión comunicar al hermano que se ocupa del atril que acompañe al presidente del programa a plataforma para iniciar el programa.",
      "Al mismo tiempo avisar a AV que el presidente del programa sale a plataforma.",
      "Comunicar al hermano de plataforma cualquier indicación que nos den desde AV (ajustar el micrófono del orador...)."
    ]
  }
];


// --- INICIALIZACIÓN DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- SELECTORES DEL DOM ---
const DOMElements = {
    body: document.body,
    login: {
        screen: document.getElementById('login-screen'),
        form: document.getElementById('login-form'),
        emailInput: document.getElementById('email-input'),
        passwordInput: document.getElementById('password-input'),
        error: document.getElementById('login-error'),
        togglePasswordIcon: document.getElementById('toggle-password-visibility') 
    },
    app: {
        container: document.getElementById('app-container'),
        logoutButton: document.getElementById('logout-button'),
        navContainer: document.getElementById('day-nav'),
        programContainer: document.getElementById('program-container'),
        summaryPanel: document.getElementById('summary-panel'),
        responsablesContainer: document.getElementById('responsables-container'),
        responsablesContent: document.getElementById('responsables-content'),
        instruccionesContainer: document.getElementById('instrucciones-container'),
        instruccionesContent: document.getElementById('instrucciones-content')
    }
};

// --- ESTADO DE LA APLICACIÓN ---
let appState = {
    currentView: 'checklist',
    currentDay: 'Viernes'
};

// --- FUNCIONES DE RENDERIZADO Y UI ---

/** Cambia el tema de color del body según el día. */
function setDayTheme(day) {
    DOMElements.body.classList.remove('day-viernes', 'day-sabado', 'day-domingo');
    if (day) {
        DOMElements.body.classList.add(`day-${day.toLowerCase()}`);
    }
}

/** Crea un acordeón individual para un participante. */
function crearAcordeon(participante, idUnico) {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'participant-accordion';
    accordionItem.dataset.id = idUnico;
    accordionItem.dataset.rol = participante.rol;
    accordionItem.dataset.nombre = participante.nombre;

    const header = document.createElement('button');
    header.className = 'accordion-header';

    const esProd = participante.nombre.includes('PRODUCCIÓN AUDIOVISUAL');
    const esBetel = participante.nombre.includes('(Betel)') || participante.nombre.includes('(B)');
    const esOra = participante.rol.includes('Oración');
    const ocOra = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
    const ocBet = ['orientacion', 'recordatorios'];
    
    let indicatorsHTML = '';
    if (!esProd) {
        indicatorsHTML = itemsChecklist
            .filter(it => it.indicator && !(esOra && ocOra.includes(it.id)) && !(esBetel && ocBet.includes(it.id)))
            .map(it => `<span class="indicator" data-indicator-for="${it.id}"></span>`).join('');
    }

    header.innerHTML = `
        <div class="participant-info">
            <div class="participant-name">${participante.nombre}</div>
            <div class="participant-role">${participante.rol}</div>
        </div>
        <div class="participant-details">
            <div class="status-indicators">${indicatorsHTML}</div>
            ${participante.hora ? `<span class="details-time">${participante.hora}</span>` : ''}
            ${participante.numero ? `<span class="details-number">#${participante.numero}</span>` : ''}
            ${!esProd ? '<i class="fas fa-chevron-down accordion-icon"></i>' : ''}
        </div>`;

    const content = document.createElement('div');
    content.className = 'accordion-content';

    if (!esProd) {
        const checklistContainer = document.createElement('div');
        checklistContainer.className = 'checklist-container';

        itemsChecklist.forEach(item => {
            if ((esOra && ocOra.includes(item.id)) || (esBetel && ocBet.includes(item.id))) return;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item';
            itemDiv.dataset.containerFor = item.id;
            itemDiv.innerHTML = `<i class="icon ${item.icon}"></i><label for="check-${idUnico}-${item.id}">${item.texto}</label>`;

            if (item.tipo === 'checkbox') {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.dataset.itemId = item.id;
                input.id = `check-${idUnico}-${item.id}`;
                itemDiv.appendChild(input);
            } else { // tipo 'radio'
                const radioGroup = document.createElement('div');
                radioGroup.className = 'makeup-options';
                item.opciones.forEach(opt => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `radio-${idUnico}-${item.id}`;
                    radio.value = opt;
                    radio.dataset.itemId = item.id;
                    radio.id = `radio-${idUnico}-${item.id}-${opt}`;
                    const label = document.createElement('label');
                    label.setAttribute('for', radio.id);
                    label.textContent = opt;
                    
                    // Lógica para permitir deseleccionar un radio button
                    radio.addEventListener('mousedown', () => radio.dataset.wasChecked = radio.checked);
                    radio.addEventListener('click', () => {
                        if (radio.dataset.wasChecked === 'true') {
                            radio.checked = false;
                            radio.dataset.wasChecked = 'false';
                            radio.dispatchEvent(new Event('change', { bubbles: true }));
                        } else {
                            radio.dataset.wasChecked = 'true';
                        }
                    });
                    radioGroup.append(radio, label);
                });
                itemDiv.appendChild(radioGroup);
            }
            checklistContainer.appendChild(itemDiv);
        });
        content.appendChild(checklistContainer);
    }

    accordionItem.append(header, content);
    return accordionItem;
}

/** Genera toda la estructura HTML del programa. */
function generarProgramaHTML() {
    DOMElements.app.programContainer.innerHTML = '';
    ['Viernes', 'Sábado', 'Domingo'].forEach(dia => {
        const dayContent = document.createElement('div');
        dayContent.id = `content-${dia}`;
        dayContent.className = 'day-content hidden';

        programa.filter(s => s.sesion.startsWith(dia)).forEach(sesion => {
            const sessionBlock = document.createElement('div');
            sessionBlock.className = 'session-block';
            sessionBlock.innerHTML = `<h2>${sesion.sesion}</h2>`;
            sesion.participantes.forEach(p => {
                const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/[^a-zA-Z0-9-]/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
                sessionBlock.appendChild(crearAcordeon(p, idUnico));
            });
            dayContent.appendChild(sessionBlock);
        });
        DOMElements.app.programContainer.appendChild(dayContent);
    });
}

/** Genera el HTML para la sección de responsables. */
function mostrarResponsablesDeTurno() {
    DOMElements.app.responsablesContent.innerHTML = '';
    ['Viernes', 'Sábado', 'Domingo'].forEach(diaKey => {
        const dayData = responsablesPorTurno.filter(item => item['Día'] === diaKey);
        if (dayData.length > 0) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'responsables-day-section';
            dayDiv.id = `responsables-${diaKey.toLowerCase()}`;
            dayDiv.innerHTML = `<h2>${diaKey}</h2>`;
            ['Mañana', 'Tarde'].forEach(sesionKey => {
                const sesionData = dayData.find(item => item['Turno'] === sesionKey);
                if (sesionData) {
                    const sesionDiv = document.createElement('div');
                    sesionDiv.className = 'responsables-session-block';
                    sesionDiv.innerHTML = `<h3>${sesionKey}</h3>`;
                    const ul = document.createElement('ul');
                    for (const rol in sesionData) {
                        if (rol !== 'Día' && rol !== 'Turno') {
                            ul.innerHTML += `<li><strong>${rol}:</strong> ${sesionData[rol]}</li>`;
                        }
                    }
                    sesionDiv.appendChild(ul);
                    dayDiv.appendChild(sesionDiv);
                }
            });
            DOMElements.app.responsablesContent.appendChild(dayDiv);
        }
    });
}

/** Genera el HTML para la sección de instrucciones. */
function mostrarInstrucciones() {
    DOMElements.app.instruccionesContent.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'instrucciones-grid';

    const createList = (items) => {
        let listHtml = '<ul>';
        items.forEach(item => {
            if (typeof item === 'string') {
                listHtml += `<li>${item}</li>`;
            } else if (item.titulo) {
                listHtml += `<li><strong>${item.titulo}</strong>${createList(item.puntos)}</li>`;
            }
        });
        return listHtml + '</ul>';
    };

    instruccionesPorPerfil.forEach(perfil => {
        const card = document.createElement('div');
        card.className = `instruccion-card ${perfil.color}`;
        card.innerHTML = `
            <div class="card-header">
                <i class="${perfil.icono}"></i>
                <h3>${perfil.perfil}</h3>
            </div>
            <div class="card-body">${createList(perfil.instrucciones)}</div>`;
        grid.appendChild(card);
    });
    DOMElements.app.instruccionesContent.appendChild(grid);
}

/** Actualiza el estado visual de un acordeón (progreso, completado, etc.). */
function actualizarEstadoUI(accordion) {
    if (!accordion || accordion.classList.contains('is-audiovisual')) return;
    
    const { nombre, rol } = accordion.dataset;
    const esOra = rol.includes('Oración');
    const esBetel = nombre.includes('(Betel)') || nombre.includes('(BT)');
    const ocultaParaOracion = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
    const ocultaParaBetel = ['orientacion', 'recordatorios'];
    
    // Lógica para el campo de Maquillaje y Repaso final de maquillaje
    const maquillajeRadios = accordion.querySelectorAll('input[data-item-id="maquillaje"]');
    const repasoMaquillajeInput = accordion.querySelector('input[data-item-id="repaso_maquillaje"]');
    const repasoMaquillajeContainer = accordion.querySelector('[data-container-for="repaso_maquillaje"]');

    let maquillajeValue = null;
    maquillajeRadios.forEach(radio => {
        if (radio.checked) {
            maquillajeValue = radio.value;
        }
    });

    if (repasoMaquillajeInput && repasoMaquillajeContainer) {
        if (maquillajeValue === 'No' || maquillajeValue === 'N/A') {
            repasoMaquillajeInput.checked = false; // Desmarca si estaba marcado
            repasoMaquillajeInput.disabled = true; // Deshabilita el input
            repasoMaquillajeContainer.classList.add('disabled-item'); // Opcional: estilo para indicar que está deshabilitado
        } else {
            repasoMaquillajeInput.disabled = false; // Habilita el input
            repasoMaquillajeContainer.classList.remove('disabled-item');
        }
    }

    const itemsAplicables = itemsChecklist.filter(it => 
        !(esOra && ocultaParaOracion.includes(it.id)) && 
        !(esBetel && ocultaParaBetel.includes(it.id)) && 
        !(it.id === 'repaso_maquillaje' && (maquillajeValue === 'No' || maquillajeValue === 'N/A')) // Excluye si 'maquillaje' es 'No' o 'N/A'
    );
    
    let completedTasks = 0;
    const checkedItems = new Set();
    accordion.querySelectorAll('input[data-item-id]:checked').forEach(input => {
        const itemId = input.dataset.itemId;
        // Solo cuenta si el ítem no está deshabilitado lógicamente
        if (itemId === 'repaso_maquillaje' && (maquillajeValue === 'No' || maquillajeValue === 'N/A')) {
            // No cuenta 'repaso_maquillaje' si está deshabilitado
        } else if (!checkedItems.has(itemId)) {
            completedTasks++;
            checkedItems.add(itemId);
        }
    });

    const percent = itemsAplicables.length > 0 ? (completedTasks / itemsAplicables.length) * 100 : 0;
    accordion.style.setProperty('--progress-percent', `${percent}%`);
    accordion.classList.toggle('is-complete', percent >= 100);

    accordion.querySelectorAll('.indicator[data-indicator-for]').forEach(indicator => {
        indicator.className = 'indicator';
        const itemId = indicator.dataset.indicatorFor;
        const input = accordion.querySelector(`input[data-item-id="${itemId}"]`);
        
        if (input?.type === 'checkbox' && input.checked) {
            indicator.classList.add(itemId);
        } else if (input?.type === 'radio') {
            const checkedRadio = accordion.querySelector(`input[name="${input.name}"]:checked`);
            if (checkedRadio) {
                // Asegúrate de que las clases CSS 'maquillaje-maquillado', 'maquillaje-si', 'maquillaje-no', 'maquillaje-na' existan
                indicator.classList.add(`maquillaje-${checkedRadio.value.toLowerCase().replace('/', '')}`);
            }
        }
    });
}

/** Actualiza el panel de resumen con las estadísticas del día actual. */
function updateSummary() {
    if (appState.currentView !== 'checklist') {
        DOMElements.app.summaryPanel.classList.add('hidden');
        document.title = "Checklist del Programa";
        return;
    }
    DOMElements.app.summaryPanel.classList.remove('hidden');
    const dayContent = document.getElementById(`content-${appState.currentDay}`);
    if (!dayContent) return;

    const totalParticipantes = dayContent.querySelectorAll('.participant-accordion:not(.is-audiovisual)').length;
    const completos = dayContent.querySelectorAll('.participant-accordion.is-complete').length;
    const conMaquillaje = dayContent.querySelectorAll('input[data-item-id="maquillaje"][value="Sí"]:checked').length;
    const yaMaquillados = dayContent.querySelectorAll('input[data-item-id="maquillaje"][value="Maquillado"]:checked').length;
    
    DOMElements.app.summaryPanel.innerHTML = `
        <div class="summary-item"><div class="count">${totalParticipantes}</div><div class="label">Participantes</div></div>
        <div class="summary-item"><div class="count">${completos}</div><div class="label">Completos</div></div>
        <div class="summary-item"><div class="count">${conMaquillaje + yaMaquillados}</div><div class="label">Maquillaje</div></div>`; // Suma 'Sí' y 'Maquillado'
    document.title = `(${completos}/${totalParticipantes}) Checklist ${appState.currentDay}`;
}

/** Cambia la vista principal de la aplicación. */
function changeAppView(view, day = null) {
    appState.currentView = view;
    if (day) appState.currentDay = day;

    Object.values(DOMElements.app)
        .filter(el => el.id?.includes('container') || el.id?.includes('panel'))
        .forEach(c => c.classList.add('hidden'));
    DOMElements.app.container.classList.remove('hidden'); 

    DOMElements.app.navContainer.querySelectorAll('.nav-button').forEach(b => b.classList.remove('active'));
    DOMElements.app.navContainer.querySelectorAll('.sub-day-button').forEach(b => b.classList.add('hidden'));

    DOMElements.app.navContainer.querySelector(`.nav-button.main-view-button[data-view="${view}"]`)?.classList.add('active');
    
    setDayTheme(null);
    let pageTitle = "Checklist del Programa";

    if (view === 'checklist') {
        DOMElements.app.navContainer.querySelectorAll('.sub-day-button[data-view="checklist"]').forEach(b => b.classList.remove('hidden'));
        DOMElements.app.navContainer.querySelector(`.nav-button.sub-day-button[data-day="${appState.currentDay}"]`)?.classList.add('active');
        
        setDayTheme(appState.currentDay);
        DOMElements.app.programContainer.classList.remove('hidden');
        document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
        document.getElementById(`content-${appState.currentDay}`)?.classList.remove('hidden');
        updateSummary();
    } else if (view === 'responsables') {
        DOMElements.app.responsablesContainer.classList.remove('hidden');
        setDayTheme('Viernes');
        pageTitle = 'Responsables de Turno';
    } else if (view === 'instrucciones') {
        DOMElements.app.instruccionesContainer.classList.remove('hidden');
        pageTitle = 'Instrucciones por Perfil';
    }
    
    document.title = pageTitle;
}

// --- LÓGICA DE FIREBASE ---

/** Guarda un cambio de estado en un documento de Firebase. */
async function saveStateToFirebase(id, item, value) {
    try {
        await setDoc(doc(db, 'tareas', id), { [item]: value }, { merge: true });
    } catch (e) {
        console.error("Error al guardar en Firebase: ", e);
        alert('No se pudo guardar el cambio. Revisa tu conexión a internet.');
    }
}

/** Sincroniza el estado de todos los participantes desde Firebase en tiempo real. */
function syncStateFromFirebase() {
    programa.forEach(sesion => {
        sesion.participantes.forEach(p => {
            if (p.nombre.includes('PRODUCCIÓN AUDIOVISUAL')) return;
            const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/[^a-zA-Z0-9-]/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
            
            onSnapshot(doc(db, 'tareas', idUnico), (docSnapshot) => {
                const accordion = document.querySelector(`.participant-accordion[data-id="${idUnico}"]`);
                if (!accordion) return;

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    Object.entries(data).forEach(([key, value]) => {
                        const checkbox = accordion.querySelector(`input[data-item-id="${key}"][type="checkbox"]`);
                        if (checkbox) {
                            checkbox.checked = !!value;
                        } else {
                            accordion.querySelectorAll(`input[data-item-id="${key}"][type="radio"]`).forEach(radio => {
                                radio.checked = (radio.value === value);
                            });
                        }
                    });
                }
                actualizarEstadoUI(accordion);
                updateSummary();
            });
        });
    });
}

// --- MANEJADORES DE EVENTOS ---

/** Configura todos los event listeners de la aplicación. */
function setupEventListeners() {
    DOMElements.app.programContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (header && !header.closest('.is-audiovisual')) {
            header.classList.toggle('active');
            header.nextElementSibling.classList.toggle('active');
        }
    });

    DOMElements.app.programContainer.addEventListener('change', (e) => {
        const input = e.target.closest('input[data-item-id]');
        if (!input) return;
        const accordion = input.closest('.participant-accordion');
        const value = input.type === 'checkbox' ? input.checked : (accordion.querySelector(`input[name="${input.name}"]:checked`)?.value || null);
        saveStateToFirebase(accordion.dataset.id, input.dataset.itemId, value);
    });

    DOMElements.app.navContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (button) {
            changeAppView(button.dataset.view, button.dataset.day || appState.currentDay);
        }
    });

    DOMElements.app.logoutButton.addEventListener('click', () => {
        signOut(auth).catch(err => console.error("Error al cerrar sesión: ", err));
    });

    DOMElements.login.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        DOMElements.login.error.classList.add('hidden');
        try {
            await signInWithEmailAndPassword(auth, DOMElements.login.emailInput.value, DOMElements.login.passwordInput.value);
        } catch (err) {
            const errorMessages = {
                'auth/invalid-email': 'El formato del correo es inválido.',
                'auth/user-not-found': 'No se encontró un usuario con ese correo.',
                'auth/wrong-password': 'La contraseña es incorrecta.',
                'auth/too-many-requests': 'Demasiados intentos fallidos. Inténtalo más tarde.'
            };
            DOMElements.login.error.textContent = errorMessages[err.code] || 'Ocurrió un error al iniciar sesión.';
            DOMElements.login.error.classList.remove('hidden');
        }
    });

    DOMElements.login.togglePasswordIcon.addEventListener('click', () => {
        const passwordInput = DOMElements.login.passwordInput;
        const icon = DOMElements.login.togglePasswordIcon;
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// --- LÓGICA DE INICIO Y AUTENTICACIÓN ---

function showLoginScreen() {
    DOMElements.login.screen.classList.remove('hidden');
    DOMElements.app.container.classList.add('hidden');
    DOMElements.login.error.classList.add('hidden');
    DOMElements.body.className = '';
}

/** Inicializa la aplicación principal después del login. */
function initApp() {
    DOMElements.login.screen.classList.add('hidden');
    DOMElements.app.container.classList.remove('hidden');
    
    generarProgramaHTML();
    mostrarResponsablesDeTurno();
    mostrarInstrucciones();
    
    syncStateFromFirebase();
    
    changeAppView('checklist', 'Viernes');
}

// --- PUNTO DE ENTRADA DE LA APLICACIÓN ---
onAuthStateChanged(auth, user => {
    if (user) {
        initApp();
    } else {
        showLoginScreen();
    }
});

// Finalmente, registrar los listeners una sola vez.
setupEventListeners();
