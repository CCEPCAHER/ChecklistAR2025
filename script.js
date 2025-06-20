// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB0djqHeWvNLjWiBkNKMVz_SKbN2ulGcxY",
    authDomain: "checklist2025b1.firebaseapp.com",
    projectId: "checklist2025b1",
    storageBucket: "checklist2025b1.firebasestorage.app",
    messagingSenderId: "331478836194",
    appId: "1:331478836194:web:aee9b62b753da0ba940fbb",
    measurementId: "G-T6S0GQ4P4Z"
};

// --- INICIALIZACIÓN DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- ESTRUCTURA DEL PROGRAMA Y CHECKLIST (Datos de la aplicación) ---
// NOTA: Esta estructura 'programa' se usa para el checklist.
// Si deseas poblar dinámicamente 'programa' desde 'horarioProgramaCompleto',
// deberás implementar esa lógica de mapeo. Por ahora, se mantienen separadas
// para no alterar el funcionamiento del checklist existente.
const programa = [
    { sesion: "Viernes Mañana", participantes: [
        { rol: "Presidente", nombre: "David Castro", hora: "9:30" },
        { rol: "Oración", nombre: "Francisco José Sánchez" },
        { rol: "Discursante", nombre: "Julián Lasheras ¿Qué es la adoración pura?", hora: "9:40", numero: 1 },
        { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 1).", hora: "10:10", numero: 2 },
        { rol: "Discursante", nombre: "Domingo Tarrasón", hora: "10:50", numero: 3 },
        { rol: "Discursante", nombre: "Pedro Medina", hora: "11:11", numero: 4 },
        { rol: "Discursante", nombre: "Daniel Velasco", hora: "11:28", numero: 5 },
        { rol: "Discursante", nombre: "Álex Botella", hora: "11:45", numero: 6 }
      ]
    },
    { sesion: "Viernes Tarde", participantes: [
        { rol: "Presidente", nombre: "Eduardo Ayala" },
        { rol: "Discursante", nombre: "Miguel Solé", hora: "13:50", numero: 7 },
        { rol: "Discursante", nombre: "David Aleixandri", hora: "14:06", numero: 8 },
        { rol: "Discursante", nombre: "David Maldonado", hora: "14:22", numero: 9 },
        { rol: "Discursante", nombre: "Juan Martín Prior", hora: "14:36", numero: 10 },
        { rol: "Discursante", nombre: "Elliot Miguel", hora: "15:00", numero: 11 },
        { rol: "Discursante", nombre: "José Bonet", hora: "15:12", numero: 12 },
        { rol: "Discursante", nombre: "Santiago Cardona", hora: "15:21", numero: 13 },
        { rol: "Discursante", nombre: "Israel Malla", hora: "15:30", numero: 14 },
        { rol: "Discursante", nombre: "Bárbaro Yuliexi Tejera Rios", hora: "15:39", numero: 15 },
        { rol: "Discursante", nombre: "Rafael Corral", hora: "15:48", numero: 16 },
        { rol: "Discursante", nombre: "Michel Gottardo", hora: "15:58", numero: 17 },
        { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "16:10", numero: 18 },
        { rol: "Oración Final", nombre: "Pedro Mora" }
      ]
    },
    { sesion: "Sábado Mañana", participantes: [
        { rol: "Presidente", nombre: "Abel Reguant" },
        { rol: "Oración", nombre: "Ricardo Cordovilla" },
        { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:¿Qué buscan?", hora: "9:40", numero: 19 },
        { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:Las buenas noticias según Jesús (Episodio 2).", hora: "9:50", numero: 20 },
        { rol: "Discursante", nombre: "Gabriel Quintana", hora: "10:30", numero: 21 },
        { rol: "Discursante", nombre: "Manuel Casino", hora: "10:40", numero: 22 },
        { rol: "Discursante", nombre: "Esteban Martín", hora: "10:49", numero: 23 },
        { rol: "Discursante", nombre: "Kevin Adiel Cobo (BTL)", hora: "10:59", numero: 24 },
        { rol: "Discursante", nombre: "Rubén Verdés", hora: "11:09", numero: 25 },
        { rol: "Discursante", nombre: "David Mercader", hora: "11:17", numero: 26 },
        { rol: "Discursante", nombre: "Daniel Sellares", hora: "11:25", numero: 27 },
        { rol: "Discursante", nombre: "Natán Becerril", hora: "11:34", numero: 28 }
      ]
    },
    { sesion: "Sábado Tarde", participantes: [
        { rol: "Presidente", nombre: "Climent Ambrós" },
        { rol: "Discursante", nombre: "Jonatán Vicente", hora: "13:50", numero: 29 },
        { rol: "Discursante", nombre: "Santiago Sáez", hora: "14:00", numero: 30 },
        { rol: "Discursante", nombre: "Ricardo Anguita", hora: "14:09", numero: 31 },
        { rol: "Discursante", nombre: "Josué Rabaneda", hora: "14:20", numero: 32 },
        { rol: "Discursante", nombre: "Edgar Teruel (BTL)", hora: "14:45", numero: 33 },
        { rol: "Discursante", nombre: "Álvaro Paniagua", hora: "14:56", numero: 34 },
        { rol: "Discursante", nombre: "Adolfo Forniels", hora: "15:06", numero: 35 },
        { rol: "Discursante", nombre: "Alfonso Guerrero", hora: "15:30", numero: 36 },
        { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "16:00", numero: 37 },
        { rol: "Oración Final", nombre: "Jairo José Galán" }
      ]
    },
    { sesion: "Domingo Mañana", participantes: [
        { rol: "Presidente", nombre: "Juan Alcaraz" },
        { rol: "Oración", nombre: "José Diego" },
        { rol: "Discursante", nombre: "Isaac Díaz", hora: "9:40", numero: 38 },
        { rol: "Discursante", nombre: "Benjamín Ferrer", hora: "9:55", numero: 39 },
        { rol: "Discursante", nombre: "Francisco Javier Vila", hora: "10:07", numero: 40 },
        { rol: "Discursante", nombre: "Joseph Salazar", hora: "10:21", numero: 41 },
        { rol: "Discursante", nombre: "Fernando Teruel", hora: "10:35", numero: 42 },
        { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Los campos están Blacos, listos para la cosecha", hora: "10:49", numero: 43 },
        { rol: "Discursante", nombre: "José Manuel Lara", hora: "11:15", numero: 44 },
        { rol: "Discursante", nombre: "Nino Llopis", hora: "11:45", numero: 45 }
      ]
    },
    { sesion: "Domingo Tarde", participantes: [
        { rol: "Presidente", nombre: "Julian Lasheras" },
        { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL", hora: "13:50", numero: 46 },
        { rol: "Discursante", nombre: "Julian Lasheras", hora: "14:45", numero: 47 },
        { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "14:54", numero: 48 },
        { rol: "Oración Final", nombre: "Andres Mayor (Betel)" }
      ]
    }
];

const itemsChecklist = [
    { id: 'recogida', texto: 'Recogida en presidencia', tipo: 'checkbox', icon: 'fa-solid fa-handshake', indicator: true },
    { id: 'orientacion', texto: 'Orientación inicial', tipo: 'checkbox', icon: 'fa-solid fa-compass', indicator: true },
    { id: 'maquillaje', texto: 'Maquillaje', tipo: 'radio', opciones: ['Sí', 'No', 'N/A'], icon: 'fa-solid fa-palette', indicator: true },
    { id: 'detras_plataforma', texto: 'Listo tras bastidores (20 min)', tipo: 'checkbox', icon: 'fa-solid fa-clock', indicator: true },
    { id: 'repaso_maquillaje', texto: 'Repaso final de maquillaje', tipo: 'checkbox', icon: 'fa-solid fa-brush', indicator: false },
    { id: 'recordatorios', texto: 'Recordatorios finales', tipo: 'checkbox', icon: 'fa-solid fa-bullhorn', indicator: false },
    { id: 'discursado', texto: 'Participación completada', tipo: 'checkbox', icon: 'fa-solid fa-microphone-slash', indicator: true }
];

// --- NUEVA DATA: HORARIO COMPLETO DEL PROGRAMA (basado en el PDF) ---
// ¡IMPORTANTE! Debes completar y verificar esta data con la información exacta de tu PDF.
const horarioProgramaCompleto = [
    // VIERNES MAÑANA
    {
        dia: "Viernes", sesion: "Mañana", hora: "8:00", numero_programa: null, duracion: "1:14",
        descripcion: "Mostrar el tema del día de la asamblea regional: \"Adora a Jehová tu Dios\" (Mateo 4:10)",
        orador_o_titulo: "(Video en bucle. Sin sonido.)", multimedia: "CO-v25 5 001"
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:14", numero_programa: null, duracion: null,
        descripcion: "Desde el atril, el presidente de sesión invita al público a sentarse",
        orador_o_titulo: "David Castro", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:15", numero_programa: null, duracion: "0:05",
        descripcion: "Comienza la cuenta regresiva del video",
        orador_o_titulo: "(5 mins. Sin sonido)", multimedia: "CO-v25_5_002"
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:19", numero_programa: null, duracion: null,
        descripcion: "Desde el atril, el presidente de sesión presenta el video musical. Permanece sentado en plataforma.",
        orador_o_titulo: "David Castro", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:20", numero_programa: null, duracion: "0:10",
        descripcion: null,
        orador_o_titulo: "VIDEO MUSICAL (10: 107 min)", multimedia: "CO-v25_5_003"
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:30", numero_programa: 74, duracion: null,
        descripcion: "Desde el atril, el presidente de sesión presenta la canción 74 y la oración de",
        orador_o_titulo: "Canción 74", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:35", numero_programa: null, duracion: null,
        descripcion: "Oración",
        orador_o_titulo: "Francisco José Sánchez", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "9:40", numero_programa: 1, duracion: "0:45",
        descripcion: "Discurso",
        orador_o_titulo: "Julián Lasheras ¿Qué es la adoración pura?", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "10:25", numero_programa: 75, duracion: null,
        descripcion: "Canción 75",
        orador_o_titulo: "Canción 75", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "10:30", numero_programa: null, duracion: null,
        descripcion: "Anuncios",
        orador_o_titulo: "David Castro", multimedia: null
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "10:35", numero_programa: 2, duracion: "0:35",
        descripcion: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 1).",
        orador_o_titulo: "PRODUCCIÓN AUDIOVISUAL", multimedia: "CO-v255_451" // Ejemplo ID multimedia
    },
    {
        dia: "Viernes", sesion: "Mañana", hora: "11:10", numero_programa: 76, duracion: null,
        descripcion: "Canción 76",
        orador_o_titulo: "Canción 76", multimedia: null
    },
    // ... Añade aquí el resto del Viernes Mañana y Tarde, Sábado y Domingo ...
    // VIERNES TARDE (Ejemplos basados en tu snippet)
    {
        dia: "Viernes", sesion: "Tarde", hora: "13:45", numero_programa: 77, duracion: null,
        descripcion: "Desde el atril, el presidente de sesión presenta la canción 77",
        orador_o_titulo: "Canción 77", multimedia: "CO-V25 5 454"
    },
    {
        dia: "Viernes", sesion: "Tarde", hora: "13:50", numero_programa: 46, duracion: "0:45",
        descripcion: "PRODUCCIÓN AUDIOVISUAL",
        orador_o_titulo: "Las buenas noticias según Jesús: Episodio 3. \"Ese soy yo\"",
        multimedia: "CO-v255_461"
    },
    {
        dia: "Viernes", sesion: "Tarde", hora: "14:35", numero_programa: 20, duracion: "3:59",
        descripcion: "El presidente de sesión presenta la canción 20",
        orador_o_titulo: "Canción 20",
        multimedia: "CD-25 5 462"
    },
    {
        dia: "Viernes", sesion: "Tarde", hora: "14:45", numero_programa: 47, duracion: "0:10",
        descripcion: "¿Qué hemos aprendido?",
        orador_o_titulo: "VIDEO: 11:38 min",
        multimedia: "CO 25 5 471"
    },
    // ... Más entradas para el viernes tarde, sábado, y domingo...
    // Puedes rellenar todo el horario aquí con la misma estructura.
];

// --- NUEVA DATA: RESPONSABLES DE TURNO ---
const dataResponsables = {
  "distribucion_tareas": {
    "COMUNICACION_AV": [
      "Manel Casino",
      "Rafael Monje"
    ],
    "ATREZZO_CRONO": [
      "Rubén Gomez",
      "Adriá Rivera"
    ],
    "ATRIL": [
      "Alejandro Hernandez",
      "Javier Bolivar",
      "Mario Martín"
    ],
    "MAQUILLAJE": [
      "Inma Casino",
      "Vanessa Intriago",
      "Raquel Pállares",
      "Ana Marañon",
      "Sandra Ortega",
      "Gemma Monje"
    ],
    "RECEPCION_ENLACE": [
      "Juan Carlos Marín",
      "Luis Fernando Paz"
    ]
  },

  "turnos": {
    "viernes": {
      "mañana": {
        "COMUNICACION_AV": "Manel Casino",
        "ATREZZO_CRONO": "Rubén Gomez",
        "ATRIL": "Javier Bolivar",
        "RECEPCION_ENLACE": "Juan Carlos Marín",
        "MAQUILLAJE": [
          "Inma Casino",
          "Vanessa Intriago",
          "Raquel Pállares"
        ],
        "MAQUILLAJE_PLATAFORMA": "Gemma Monje"
      },
      "tarde": {
        "COMUNICACION_AV": "Rafael Monje",
        "ATREZZO_CRONO": "Adriá Rivera",
        "ATRIL": "Alejandro Hernandez",
        "RECEPCION_ENLACE": "Luis Fernando Paz",
        "MAQUILLAJE": [
          "Ana Marañon",
          "Sandra Ortega",
          "Gemma Monje"
        ],
        "MAQUILLAJE_PLATAFORMA": "Raquel Pállares"
      }
    },

    "sabado": {
      "mañana": {
        "COMUNICACION_AV": "Rafael Monje",
        "ATREZZO_CRONO": "Adriá Rivera",
        "ATRIL": "Mario Martín",
        "RECEPCION_ENLACE": "Luis Fernando Paz",
        "MAQUILLAJE": [
          "Gemma Monje",
          "Inma Casino",
          "Sandra Ortega"
        ],
        "MAQUILLAJE_PLATAFORMA": "Ana Marañon"
      },
      "tarde": {
        "COMUNICACION_AV": "Manel Casino",
        "ATREZZO_CRONO": "Rubén Gomez",
        "ATRIL": "Javier Bolivar",
        "RECEPCION_ENLACE": "Juan Carlos Marín",
        "MAQUILLAJE": [
          "Vanessa Intriago",
          "Raquel Pállares",
          "Ana Marañon"
        ],
        "MAQUILLAJE_PLATAFORMA": "Sandra Ortega"
      }
    },

    "domingo": {
      "mañana": {
        "COMUNICACION_AV": "Manel Casino",
        "ATREZZO_CRONO": "Rubén Gomez",
        "ATRIL": "Alejandro Hernandez",
        "RECEPCION_ENLACE": "Juan Carlos Marín",
        "MAQUILLAJE": [
          "Ana Marañon",
          "Sandra Ortega",
          "Vanessa Intriago"
        ],
        "MAQUILLAJE_PLATAFORMA": "Inma Casino"
      },
      "tarde": {
        "COMUNICACION_AV": "Rafael Monje",
        "ATREZZO_CRONO": "Adriá Rivera",
        "ATRIL": "Mario Martín",
        "RECEPCION_ENLACE": "Luis Fernando Paz",
        "MAQUILLAJE": [
          "Gemma Monje",
          "Ana Marañon",
          "Raquel Pállares"
        ],
        "MAQUILLAJE_PLATAFORMA": "Vanessa Intriago"
      }
    }
  }
};


// --- ELEMENTOS DEL DOM ---
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');
const appContainer = document.getElementById('app-container');
const logoutButton = document.getElementById('logout-button');
const navContainer = document.getElementById('day-nav');
const programContainer = document.getElementById('program-container');
const summaryPanel = document.getElementById('summary-panel');
const horariosContainer = document.getElementById('horarios-container'); // Nuevo
const responsablesContainer = document.getElementById('responsables-container'); // Nuevo
const responsablesContent = document.getElementById('responsables-content'); // Nuevo
const body = document.body;

// Estado actual de la vista (checklist, horarios, responsables)
let currentView = 'checklist';
let currentDay = 'Viernes'; // Día seleccionado para checklist/horarios

// --- FUNCIONES DE LA APLICACIÓN ---

/**
 * Función para aplicar el tema visual (colores, sombras) del día seleccionado
 * añadiendo una clase al <body>. Esta es la pieza clave para la "iluminación".
 * @param {string} day - El día a activar ("Viernes", "Sábado", "Domingo").
 */
function setDayTheme(day) {
    // Primero, elimina cualquier clase de día anterior para limpiar el estado.
    body.classList.remove('day-viernes', 'day-sabado', 'day-domingo');

    // Luego, añade la clase correspondiente al día seleccionado.
    switch (day) {
        case 'Viernes':
            body.classList.add('day-viernes');
            break;
        case 'Sábado':
            body.classList.add('day-sabado');
            break;
        case 'Domingo':
            body.classList.add('day-domingo');
            break;
    }
}

/**
 * Crea el HTML para el acordeón de un participante.
 * @param {object} participante - El objeto del participante.
 * @param {string} idUnico - Un ID único para el DOM.
 * @returns {HTMLElement} - El elemento del acordeón.
 */
function crearAcordeon(participante, idUnico) {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'participant-accordion';
    accordionItem.dataset.id = idUnico;
    accordionItem.dataset.rol = participante.rol;
    accordionItem.dataset.nombre = participante.nombre;

    const header = document.createElement('button');
    header.className = 'accordion-header';

    const esProd = participante.nombre.includes('PRODUCCIÓN AUDIOVISUAL');
    const esBetel = participante.nombre.includes('(Betel)') || participante.nombre.includes('(BTL)');
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

/**
 * Genera el HTML inicial para todos los días y sesiones del programa.
 */
function generarProgramaHTML() {
    programContainer.innerHTML = '';
    ['Viernes', 'Sábado', 'Domingo'].forEach(dia => {
        const dayContent = document.createElement('div');
        dayContent.id = `content-${dia}`;
        dayContent.className = 'day-content hidden';

        programa.filter(s => s.sesion.startsWith(dia)).forEach(sesion => {
            const sessionBlock = document.createElement('div');
            sessionBlock.className = 'session-block';
            sessionBlock.innerHTML = `<h2>${sesion.sesion}</h2>`;
            sesion.participantes.forEach(p => {
                const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/\s+/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
                sessionBlock.appendChild(crearAcordeon(p, idUnico));
            });
            dayContent.appendChild(sessionBlock);
        });
        programContainer.appendChild(dayContent);
    });
    
    // Muestra el primer día por defecto si la vista es checklist
    if (currentView === 'checklist') {
        document.getElementById(`content-${currentDay}`).classList.remove('hidden');
    }
}

/**
 * Actualiza la UI de un acordeón individual (barra de progreso, indicadores, estado completo).
 * @param {HTMLElement} accordion - El elemento del acordeón a actualizar.
 */
function actualizarEstadoUI(accordion) {
    if (!accordion) return;

    const nombre = accordion.dataset.nombre;
    if (nombre.includes('PRODUCCIÓN AUDIOVISUAL')) {
        accordion.classList.add('is-audiovisual');
        accordion.style.setProperty('--progress-percent', '0%');
        accordion.classList.remove('is-complete');
        return;
    }

    const rol = accordion.dataset.rol;
    const esOra = rol.includes('Oración');
    const esBetel = nombre.includes('(Betel)') || nombre.includes('(BTL)');
    const ocOra = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
    const ocBet = ['orientacion', 'recordatorios'];
    const maquillajeRadio = accordion.querySelector('input[data-item-id="maquillaje"]:checked');
    const esNA = maquillajeRadio && maquillajeRadio.value === 'N/A';
    
    // Deshabilitar repaso de maquillaje si se selecciona N/A
    const repasoContainer = accordion.querySelector('[data-container-for="repaso_maquillaje"]');
    if (repasoContainer) {
        const inputRepaso = repasoContainer.querySelector('input');
        if (inputRepaso) {
            inputRepaso.disabled = esNA;
            if (esNA && inputRepaso.checked) {
                inputRepaso.checked = false;
                inputRepaso.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }

    // Calcular progreso
    const itemsAplicables = itemsChecklist.filter(it => !(esOra && ocOra.includes(it.id)) && !(esBetel && ocBet.includes(it.id)) && !(esNA && it.id === 'repaso_maquillaje'));
    const totalTasks = itemsAplicables.length;
    let completedTasks = 0;
    const seen = {};

    accordion.querySelectorAll('input[data-item-id]').forEach(input => {
        if (input.disabled || seen[input.dataset.itemId]) return;
        if ((input.type === 'checkbox' && input.checked) || (input.type === 'radio' && accordion.querySelector(`input[name="${input.name}"]:checked`))) {
            completedTasks++;
        }
        seen[input.dataset.itemId] = true;
    });
    
    const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    accordion.style.setProperty('--progress-percent', `${percent}%`);
    accordion.classList.toggle('is-complete', percent >= 100);
    
    // Actualizar indicadores de estado
    accordion.querySelectorAll('.indicator').forEach(indicator => {
        indicator.className = 'indicator'; // Reset class
        const itemId = indicator.dataset.indicatorFor;
        const input = accordion.querySelector(`input[data-item-id="${itemId}"]`);
        if (input && input.type === 'checkbox' && input.checked) {
            indicator.classList.add(itemId);
        } else if (input && input.type === 'radio') {
            const checkedRadio = accordion.querySelector(`input[name="${input.name}"]:checked`);
            if (checkedRadio) {
                const valueClass = `maquillaje-${checkedRadio.value.toLowerCase().replace('/', '')}`;
                indicator.classList.add(valueClass);
            }
        }
    });
}

/**
 * Actualiza el panel de resumen con las estadísticas del día activo.
 */
function updateSummary() {
    // El panel de resumen solo se muestra en la vista de checklist
    if (currentView !== 'checklist') {
        summaryPanel.classList.add('hidden');
        document.title = "Checklist del Programa"; // Título genérico si no es checklist
        return;
    } else {
        summaryPanel.classList.remove('hidden');
    }

    const dayContent = document.getElementById(`content-${currentDay}`);
    if (!dayContent) return;

    const totalParticipantes = dayContent.querySelectorAll('.participant-accordion:not(.is-audiovisual)').length;
    const completos = dayContent.querySelectorAll('.participant-accordion.is-complete').length;
    const conMaquillaje = dayContent.querySelectorAll('input[data-item-id="maquillaje"][value="Sí"]:checked').length;

    summaryPanel.innerHTML = `
        <div class="summary-item"><div class="count">${totalParticipantes}</div><div class="label">Participantes</div></div>
        <div class="summary-item"><div class="count">${completos}</div><div class="label">Completos</div></div>
        <div class="summary-item"><div class="count">${conMaquillaje}</div><div class="label">Maquillaje</div></div>`;
    
    document.title = `(${completos}/${totalParticipantes}) Checklist ${currentDay}`;
}

/**
 * Recorre todos los acordeones y actualiza su UI y el resumen general.
 */
function updateAllUI() {
    document.querySelectorAll('.participant-accordion').forEach(accordion => actualizarEstadoUI(accordion));
    updateSummary();
}

/**
 * Guarda el estado de un item del checklist en Firebase.
 * @param {string} id - El ID único del participante/documento.
 * @param {string} item - El ID del item del checklist.
 * @param {boolean|string|null} value - El valor a guardar.
 */
async function saveStateToFirebase(id, item, value) {
    try {
        await setDoc(doc(db, 'tareas', id), { [item]: value }, { merge: true });
    } catch (e) {
        console.error("Error al guardar en Firebase: ", e);
        alert('No se pudo guardar el cambio. Revisa tu conexión a internet.');
    }
}

/**
 * Configura los listeners de Firebase para sincronizar el estado en tiempo real.
 */
function syncStateFromFirebase() {
    programa.forEach(sesion => {
        sesion.participantes.forEach(p => {
            const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/\s+/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
            if (p.nombre.includes('PRODUCCIÓN AUDIOVISUAL')) return;

            onSnapshot(doc(db, 'tareas', idUnico), (docSnapshot) => {
                const accordion = document.querySelector(`.participant-accordion[data-id="${idUnico}"]`);
                if (!accordion) return;

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    Object.entries(data).forEach(([key, value]) => {
                        const checkbox = accordion.querySelector(`input[data-item-id="${key}"][type="checkbox"]`);
                        if (checkbox) {
                            checkbox.checked = value;
                        } else { // Radios
                            accordion.querySelectorAll(`input[data-item-id="${key}"]`).forEach(radio => {
                                radio.checked = (radio.value === value);
                                radio.dataset.wasChecked = radio.checked;
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

/**
 * Genera y muestra el horario completo del programa.
 */
function mostrarHorarioCompleto() {
    horariosContainer.innerHTML = ''; // Limpiar contenido anterior
    let currentDayHeader = '';
    let currentSessionHeader = '';

    const diasOrden = ['Viernes', 'Sábado', 'Domingo'];

    diasOrden.forEach(dia => {
        const horarioDia = horarioProgramaCompleto.filter(item => item.dia === dia);
        if (horarioDia.length > 0) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'horario-day-section';
            dayDiv.id = `horario-${dia.toLowerCase()}`;
            dayDiv.innerHTML = `<h2>${dia}</h2>`;

            const sesionesDia = {};
            horarioDia.forEach(item => {
                const sesionKey = item.sesion || 'General'; // Agrupar por sesión o un genérico
                if (!sesionesDia[sesionKey]) {
                    sesionesDia[sesionKey] = [];
                }
                sesionesDia[sesionKey].push(item);
            });

            for (const sesion in sesionesDia) {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'horario-session-block';
                sessionDiv.innerHTML = `<h3>${sesion}</h3>`;

                const table = document.createElement('table');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Nº</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                            <th>Orador / Título</th>
                            <th>Multimedia</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                const tbody = table.querySelector('tbody');

                sesionesDia[sesion].forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.hora || ''}</td>
                        <td>${item.numero_programa !== null ? item.numero_programa : ''}</td>
                        <td>${item.duracion || ''}</td>
                        <td>${item.descripcion || ''}</td>
                        <td>${item.orador_o_titulo || ''}</td>
                        <td>${item.multimedia || ''}</td>
                    `;
                    tbody.appendChild(row);
                });
                sessionDiv.appendChild(table);
                dayDiv.appendChild(sessionDiv);
            }
            horariosContainer.appendChild(dayDiv);
        }
    });
}

/**
 * Genera y muestra la tabla de responsables de turno.
 */
function mostrarResponsablesDeTurno() {
    responsablesContent.innerHTML = ''; // Limpiar contenido anterior

    // Sección de Distribución de Tareas
    const distribucionDiv = document.createElement('div');
    distribucionDiv.className = 'responsables-section';
    distribucionDiv.innerHTML = `<h3>Distribución de Tareas</h3>`;
    for (const tarea in dataResponsables.distribucion_tareas) {
        const ul = document.createElement('ul');
        ul.innerHTML = `<strong>${tarea.replace(/_/g, ' ')}:</strong>`;
        dataResponsables.distribucion_tareas[tarea].forEach(persona => {
            const li = document.createElement('li');
            li.textContent = persona;
            ul.appendChild(li);
        });
        distribucionDiv.appendChild(ul);
    }
    responsablesContent.appendChild(distribucionDiv);

    // Secciones por día y sesión
    const diasTurnoOrden = ['viernes', 'sabado', 'domingo'];
    diasTurnoOrden.forEach(diaKey => {
        const diaData = dataResponsables.turnos[diaKey];
        if (diaData) {
            const diaDiv = document.createElement('div');
            diaDiv.className = 'responsables-day-section';
            diaDiv.innerHTML = `<h2>${diaKey.charAt(0).toUpperCase() + diaKey.slice(1)}</h2>`; // Capitalizar día

            const sesiones = ['mañana', 'tarde']; // Asumiendo mañana y tarde
            sesiones.forEach(sesionKey => {
                const sesionData = diaData[sesionKey];
                if (sesionData) {
                    const sesionDiv = document.createElement('div');
                    sesionDiv.className = 'responsables-session-block';
                    sesionDiv.innerHTML = `<h3>${sesionKey.charAt(0).toUpperCase() + sesionKey.slice(1)}</h3>`; // Capitalizar sesión

                    const ul = document.createElement('ul');
                    for (const rol in sesionData) {
                        const li = document.createElement('li');
                        let personas = sesionData[rol];
                        if (Array.isArray(personas)) {
                            personas = personas.join(', ');
                        }
                        li.innerHTML = `<strong>${rol.replace(/_/g, ' ')}:</strong> ${personas}`;
                        ul.appendChild(li);
                    }
                    sesionDiv.appendChild(ul);
                    diaDiv.appendChild(sesionDiv);
                }
            });
            responsablesContent.appendChild(diaDiv);
        }
    });
}


/**
 * Maneja el cambio de vista de la aplicación (checklist, horarios, responsables).
 * @param {string} view - La vista a mostrar ('checklist', 'horarios', 'responsables').
 * @param {string|null} day - El día a mostrar para checklist/horarios.
 */
function changeAppView(view, day = null) {
    currentView = view;
    if (day) {
        currentDay = day;
    }

    // Ocultar todas las secciones de contenido
    programContainer.classList.add('hidden');
    horariosContainer.classList.add('hidden');
    responsablesContainer.classList.add('hidden');
    summaryPanel.classList.add('hidden'); // Ocultar panel de resumen por defecto

    // Desactivar todos los botones de navegación
    navContainer.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));

    // Mostrar la vista y activar el botón correspondiente
    if (view === 'checklist') {
        programContainer.classList.remove('hidden');
        summaryPanel.classList.remove('hidden'); // Mostrar panel de resumen solo para checklist
        // Activar botones de día para checklist
        navContainer.querySelector(`.nav-button[data-view="checklist"][data-day="${currentDay}"]`).classList.add('active');
        document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
        document.getElementById(`content-${currentDay}`).classList.remove('hidden');
        setDayTheme(currentDay);
        updateSummary(); // Asegurarse de que el resumen se actualice al cambiar de día en checklist
    } else if (view === 'horarios') {
        horariosContainer.classList.remove('hidden');
        navContainer.querySelector('.nav-button[data-view="horarios"]').classList.add('active');
        mostrarHorarioCompleto();
        // Para la vista de horarios, también aplicamos un tema de día si hay uno activo,
        // o un tema por defecto si no lo hay (ej. Viernes).
        setDayTheme(currentDay || 'Viernes');
        document.title = `Horario del Programa`; // Título para la vista de horarios
    } else if (view === 'responsables') {
        responsablesContainer.classList.remove('hidden');
        navContainer.querySelector('.nav-button[data-view="responsables"]').classList.add('active');
        mostrarResponsablesDeTurno();
        // Aplicar un tema de día por defecto o neutral para la vista de responsables
        setDayTheme('Viernes'); // O puedes elegir un color neutral como 'day-neutral'
        document.title = `Responsables de Turno`; // Título para la vista de responsables
    }
}


/**
 * Configura todos los event listeners de la aplicación.
 */
function setupEventListeners() {
    // Listener para abrir/cerrar acordeones (solo en la vista de checklist)
    programContainer.addEventListener('click', (e) => {
        if (currentView !== 'checklist') return; // Solo funciona en vista de checklist
        const header = e.target.closest('.accordion-header');
        if (!header) return;
        const accordion = header.closest('.participant-accordion');
        if (accordion.classList.contains('is-audiovisual')) return;
        
        header.classList.toggle('active');
        header.nextElementSibling.classList.toggle('active');
    });

    // Listener para cambios en el checklist (checkbox y radios) (solo en la vista de checklist)
    programContainer.addEventListener('change', (e) => {
        if (currentView !== 'checklist') return; // Solo funciona en vista de checklist
        const input = e.target.closest('input[data-item-id]');
        if (!input) return;
        const accordion = input.closest('.participant-accordion');
        const value = input.type === 'checkbox' ? input.checked : (accordion.querySelector(`input[name="${input.name}"]:checked`)?.value || null);
        saveStateToFirebase(accordion.dataset.id, input.dataset.itemId, value);
    });

    // Listener para la navegación de vistas y días
    navContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (!button) return;

        const newView = button.dataset.view;
        const newDay = button.dataset.day; // Podría ser undefined para responsables

        if (newView === currentView && newDay === currentDay) {
            // No hacer nada si ya está en la misma vista y día
            return;
        }

        // Si se hace clic en un botón de día (checklist/horarios)
        if (newDay) {
            // Si el botón es de "checklist" o "horarios", cambiamos el día y mantenemos la vista
            if (newView === 'checklist') {
                navContainer.querySelector('.nav-button.active[data-view="checklist"]').classList.remove('active');
                button.classList.add('active');
                document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
                document.getElementById(`content-${newDay}`).classList.remove('hidden');
                currentDay = newDay;
                setDayTheme(currentDay);
                updateSummary();
            } else if (newView === 'horarios') {
                 // Si ya estamos en la vista de horarios, no hacemos nada con los botones de día del checklist.
                 // Si venimos de la vista de checklist, cambiamos a la vista de horarios y mantenemos el día.
                if (currentView !== 'horarios') {
                    changeAppView('horarios', newDay);
                } else {
                     // Si ya estamos en horarios, podemos ignorar clics en los botones de día
                     // que originalmente eran para checklist.
                }
            }
        } else { // Si se hace clic en un botón de vista (Responsables, o el botón principal de Checklist/Horarios)
             changeAppView(newView);
        }
    });

    // Listener para el botón de logout
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    });
}

// --- LÓGICA DE INICIO Y AUTENTICACIÓN ---

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    appContainer.classList.add('hidden');
    loginError.classList.add('hidden');
    // Limpia cualquier tema de día del body
    body.className = '';
}

function startApp() {
    loginScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Generar el HTML de los acordeones del checklist
    generarProgramaHTML();
    // Generar el HTML de la vista de horarios
    mostrarHorarioCompleto();
    // Generar el HTML de la vista de responsables
    mostrarResponsablesDeTurno();

    setupEventListeners();
    syncStateFromFirebase();
    
    // Establecer la vista y el tema inicial al cargar la app
    changeAppView('checklist', 'Viernes'); // Inicia en la vista de checklist, día Viernes
}

// Observador del estado de autenticación
onAuthStateChanged(auth, user => {
    if (user) {
        startApp();
    } else {
        showLoginScreen();
    }
});

// Listener para el formulario de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (err) {
        console.error("Error de autenticación:", err.code);
        const errorMessages = {
            'auth/invalid-email': 'El formato del correo es inválido.',
            'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
            'auth/user-not-found': 'No se encontró un usuario con ese correo.',
            'auth/wrong-password': 'La contraseña es incorrecta.',
            'auth/too-many-requests': 'Demasiados intentos fallidos. Inténtalo más tarde.'
        };
        loginError.textContent = errorMessages[err.code] || 'Ocurrió un error al iniciar sesión.';
        loginError.classList.remove('hidden');
    }
});

