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
const programa = [
    { sesion: "Viernes Mañana", dia: "Viernes", participantes: [
        { id: "VM-PRESIDENTE-DAVID-CASTRO", rol: "Presidente", nombre: "David Castro", congregacion: "Manresa-Este", telefono: "618200006", hora: "9:20" },
        { id: "VM-ORACION-FRANCISCO-JOSE-SANCHEZ", rol: "Oración", nombre: "Francisco José Sánchez", congregacion: "Sant Feliu de Llobregat- Norte", telefono: "697818981", hora: "9:30" },
        { id: "VM-DISCURSANTE-JULIAN-LASHERAS", rol: "Discursante", nombre: "Julián Lasheras", congregacion: "Circuito ESP-B-03", telefono: "609919464", hora: "9:40", numero: 1, titulo: "¿Qué es la adoración pura?", duracion: "0:30" },
        { id: "VM-VIDEO-PRODUCCION-AUDIOVISUAL-1", rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús: Episodio 2.", hora: "10:10", numero: 2, titulo: "\"Este es mi Hijo\"(Parte 1).", duracion: "0:30" },
        { id: "VM-DISCURSANTE-DOMINGO-TARRASON", rol: "Discursante", nombre: "Domingo Tarrasón", congregacion: "Barcelona- Artesania", telefono: "34649455497", hora: "10:50", numero: 3, titulo: "Reconocido por Días", duracion: "0:20" },
        { id: "VM-DISCURSANTE-PEDRO-MEDINA", rol: "Discursante", nombre: "Pedro Medina", congregacion: "Circuito ESP-B-09", telefono: "34675734270", hora: "11:11", numero: 4, titulo: "Descendiente del rey David", duracion: "0:16" },
        { id: "VM-DISCURSANTE-DANIEL-VELASCO", rol: "Discursante", nombre: "Daniel Velasco", congregacion: "Barcelona- Gracia", telefono: "34622033449", hora: "11:28", numero: 5, titulo: "Ungido para ser \"el Mesías, el Líder\"", duracion: "0:16" },
        { id: "VM-DISCURSANTE-ALEX-BOTELLA", rol: "Discursante", nombre: "Álex Botella", congregacion: "Barcelona- Pueblo Nuevo", telefono: "34691556419", hora: "11:45", numero: 6, titulo: "¿Quién es realmente el gobernante del mundo?", duracion: "0:29" }
    ]},
    { sesion: "Viernes Tarde", dia: "Viernes", participantes: [
        { id: "VT-PRESIDENTE-EDUARDO-AYALA", rol: "Presidente", nombre: "Eduardo Ayala", congregacion: "Hospitalet- Can Serra", telefono: "669380176", hora: "13:35" },
        { id: "VT-DISCURSANTE-MIGUEL-SOLE", rol: "Discursante", nombre: "Miguel Solé", congregacion: "Circuito ESP-B-12", telefono: "34656331939", hora: "13:50", numero: 7, titulo: "Apoyémonos en la Palabra de Dios", duracion: "0:15" },
        { id: "VT-DISCURSANTE-DAVID-ALEIXANDRI", rol: "Discursante", nombre: "David Aleixandri", congregacion: "Badalona- Llefia", telefono: "34610455277", hora: "14:05", numero: 8, titulo: "No pongamos a prueba a Jehová", duracion: "0:15" },
        { id: "VT-DISCURSANTE-DAVID-MALDONADO", rol: "Discursante", nombre: "David Maldonado", congregacion: "Sant Vicenç de Castellet- Centro", telefono: "34676607301", hora: "14:22", numero: 9, titulo: "Adoremos solo a Jehová", duracion: "0:14" },
        { id: "VT-DISCURSANTE-JUAN-MARTIN-PRIOR", rol: "Discursante", nombre: "Juan Martín Prior", congregacion: "Badalona- Oeste", telefono: "34645573306", hora: "14:36", numero: 10, titulo: "Defendamos la verdad", duracion: "0:13" },
        { id: "VT-DISCURSANTE-ELLIOT-MIGUEL", rol: "Discursante", nombre: "Elliot Miguel", congregacion: "Barcelona- Guinardó", telefono: "667250970", hora: "15:00", numero: 11, titulo: "El desierto de Judea", duracion: "0:11" },
        { id: "VT-DISCURSANTE-JOSE-BONET", rol: "Discursante", nombre: "José Bonet", congregacion: "Barcelona- Triunfo", telefono: "34695354568", hora: "15:12", numero: 12, titulo: "El valle del Jordán", duracion: "0:09" },
        { id: "VT-DISCURSANTE-SANTIAGO-CARDONA", rol: "Discursante", nombre: "Santiago Cardona", congregacion: "Barcelona- Horta", telefono: "34671181894", hora: "15:21", numero: 13, titulo: "Jerusalén", duracion: "0:09" },
        { id: "VT-DISCURSANTE-ISRAEL-MALLA", rol: "Discursante", nombre: "Israel Malla", congregacion: "Manresa- Guinardó", telefono: "34658609587", hora: "15:30", numero: 14, titulo: "Samaria", duracion: "0:09" },
        { id: "VT-DISCURSANTE-BARBARO-YULIEXI-TEJERA-RIOS", rol: "Discursante", nombre: "Bárbaro Yuliexi Tejera Rios", congregacion: "Manresa- Norte", telefono: "34688586628", hora: "15:39", numero: 15, titulo: "Galilea", duracion: "0:09" },
        { id: "VT-DISCURSANTE-RAFAEL-CORRAL", rol: "Discursante", nombre: "Rafael Corral", congregacion: "San Feliu de Llobregat- Norte", telefono: "34616329783", hora: "15:48", numero: 16, titulo: "Fenicia", duracion: "0:09" },
        { id: "VT-DISCURSANTE-MICHEL-GOTTARDO", rol: "Discursante", nombre: "Michel Gottardo", congregacion: "Cornellá- Centro", telefono: "34697578921", hora: "15:58", numero: 17, titulo: "Siria", duracion: "0:11" },
        { id: "VT-DISCURSANTE-ANDRES-MAYOR-BETEL", rol: "Discursante", nombre: "Andres Mayor (Betel)", congregacion: "Alcalá de Henares- Inglesa", telefono: "34657107524", hora: "16:10", numero: 18, titulo: "¿Qué ve Jesús en cada uno de nosotros?", duracion: "0:34" },
        { id: "VT-ORACION-FINAL-PEDRO-MORA", rol: "Oración Final", nombre: "Pedro Mora", congregacion: "Cornellá- Linda Vista", telefono: "627584967", hora: "16:45" }
    ]},
    { sesion: "Sábado Mañana", dia: "Sábado", participantes: [
        { id: "SM-PRESIDENTE-ABEL-REGUANT", rol: "Presidente", nombre: "Abel Reguant", congregacion: "Manresa- Oeste", telefono: "619785527", hora: "9:20" },
        { id: "SM-ORACION-RICARDO-CORDOVILLA", rol: "Oración", nombre: "Ricardo Cordovilla", congregacion: "Hospitalet- Bellvitge", telefono: "609831085", hora: "9:30" },
        { id: "SM-VIDEO-PRODUCCION-AUDIOVISUAL-2", rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: ¿Qué buscan?", hora: "9:40", numero: 19, duracion: "0:10" },
        { id: "SM-VIDEO-PRODUCCION-AUDIOVISUAL-3", rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 2).", hora: "9:50", numero: 20, titulo: "\"Este es mi Hijo\"(Parte 2).", duracion: "0:35" },
        { id: "SM-DISCURSANTE-GABRIEL-QUINTANA", rol: "Discursante", nombre: "Gabriel Quintana", congregacion: "Berga", telefono: "34627750431", hora: "10:30", numero: 21, titulo: "Juan el Bautista", duracion: "0:09" },
        { id: "SM-DISCURSANTE-MANUEL-CASINO", rol: "Discursante", nombre: "Manuel Casino", congregacion: "Barcelona- Industria", telefono: "34684041108", hora: "10:40", numero: 22, titulo: "Andrés", duracion: "0:09" },
        { id: "SM-DISCURSANTE-ESTEBAN-MARTIN", rol: "Discursante", nombre: "Esteban Martín", congregacion: "Barcelona- Correos", telefono: "34647418124", hora: "10:49", numero: 23, titulo: "Pedro", duracion: "0:09" },
        { id: "SM-DISCURSANTE-KEVIN-ADIEL-COBO", rol: "Discursante", nombre: "Kevin Adiel Cobo (BTL)", congregacion: "Madrid- Moratalaz", telefono: "34622026474", hora: "10:59", numero: 24, titulo: "Juan", duracion: "0:09" },
        { id: "SM-DISCURSANTE-RUBEN-VERDES", rol: "Discursante", nombre: "Rubén Verdés", congregacion: "Barcelona- Ramblas", telefono: "34613777095", hora: "11:09", numero: 25, titulo: "Santiago", duracion: "0:08" },
        { id: "SM-DISCURSANTE-DAVID-MERCADER", rol: "Discursante", nombre: "David Mercader", congregacion: "Prat de Llobregat- Centric", telefono: "34603299172", hora: "11:17", numero: 26, titulo: "Felipe", duracion: "0:08" },
        { id: "SM-DISCURSANTE-DANIEL-SELLLARES", rol: "Discursante", nombre: "Daniel Sellares", congregacion: "Manresa- Sur", telefono: "34635670682", hora: "11:25", numero: 27, titulo: "Natanael", duracion: "0:09" },
        { id: "SM-DISCURSANTE-NATAN-BECERRIL", rol: "Discursante", nombre: "Natán Becerril", congregacion: "Hospitalet de Llobregat- Can Serra", telefono: "34650677392", hora: "11:34", numero: 28, titulo: "El significado de su bautismo", duracion: "0:29" }
    ]},
    { sesion: "Sábado Tarde", dia: "Sábado", participantes: [
        { id: "ST-PRESIDENTE-CLIMENT-AMBROS", rol: "Presidente", nombre: "Climent Ambrós", congregacion: "Barcelona- Gracia", telefono: "670227872", hora: "13:35" },
        { id: "ST-DISCURSANTE-JONATAN-VICENTE", rol: "Discursante", nombre: "Jonatán Vicente", congregacion: "Santa Coloma de Gramanet- Sur", telefono: "34696683559", hora: "13:50", numero: 29, titulo: "a ser compasivos", duracion: "0:09" },
        { id: "ST-DISCURSANTE-SANTIAGO-SAEZ", rol: "Discursante", nombre: "Santiago Sáez", congregacion: "Sant Feliu de Llobregat- Norte", telefono: "34665817304", hora: "14:00", numero: 30, titulo: "a ser humildes", duracion: "0:09" },
        { id: "ST-DISCURSANTE-RICARDO-ANGUITA", rol: "Discursante", nombre: "Ricardo Anguita", congregacion: "Barcelona- Horts", telefono: "34630830486", hora: "14:09", numero: 31, titulo: "a ser generosos", duracion: "0:10" },
        { id: "ST-DISCURSANTE-JOSUE-RABANEDA", rol: "Discursante", nombre: "Josué Rabaneda", congregacion: "Barcelona- Ronda", telefono: "34627977232", hora: "14:20", numero: 32, titulo: "¿Cómo quita el pecado \"el Cordero de Dios\"?", duracion: "0:24" },
        { id: "ST-DISCURSANTE-EDGAR-TERUEL-BTL", rol: "Discursante", nombre: "Edgar Teruel (BTL)", congregacion: "Alcalá de Henares- Inglesa", telefono: "34627732231", hora: "14:45", numero: 33, titulo: "La devoción por la casa de Jehová ardió en su interior", duracion: "0:10" },
        { id: "ST-DISCURSANTE-ALVARO-PANIAGUA", rol: "Discursante", nombre: "Álvaro Paniagua", congregacion: "Manresa- Norte", telefono: "609325570", hora: "14:56", numero: 34, titulo: "Anunció \"buenas noticias a los mansos\"", duracion: "0:10" },
        { id: "ST-DISCURSANTE-ADOLFO-FORNIELES", rol: "Discursante", nombre: "Adolfo Fornieles", congregacion: "Circuito ESP-B-04", telefono: "34676716403", hora: "15:06", numero: 35, titulo: "\"Una gran luz brilló en Galilea\"", duracion: "0:13" },
        { id: "ST-DISCURSANTE-ALFONSO-GUERRERO", rol: "Discursante", nombre: "Alfonso Guerrero", congregacion: "Alcalá de Henares- Pueblo Nuevo", telefono: "34693931362", hora: "15:30", numero: 36, titulo: "¡Quiten todo esto de aquí!", duracion: "0:29" },
        { id: "ST-DISCURSANTE-ANDRES-MAYOR-BETEL", rol: "Discursante", nombre: "Andres Mayor (Betel)", congregacion: "Alcalá de Henares- Inglesa", telefono: "34657107524", hora: "16:00", numero: 37, titulo: "\"Lo levantaré\"", duracion: "0:34" },
        { id: "ST-ORACION-FINAL-JAIRO-JOSE-GALAN", rol: "Oración Final", nombre: "Jairo José Galán", congregacion: "Berga", telefono: "649031832", hora: "16:45" }
    ]},
    { sesion: "Domingo Mañana", dia: "Domingo", participantes: [
        { id: "DM-PRESIDENTE-JUAN-ALCARAZ", rol: "Presidente", nombre: "Juan Alcaraz", congregacion: "Barcelona- Rondas", telefono: "600460360", hora: "9:20" },
        { id: "DM-ORACION-JOSE-DIEGO", rol: "Oración", nombre: "José Diego", congregacion: "Tona", telefono: "34624254650", hora: "9:30" },
        { id: "DM-DISCURSANTE-ISAAC-DIAZ", rol: "Discursante", nombre: "Isaac Díaz", congregacion: "Tona", telefono: "34641130765", hora: "9:40", numero: 38, titulo: "Nacer \"del agua y del espíritu\"", duracion: "0:14" },
        { id: "DM-DISCURSANTE-BENJAMIN-FERRER", rol: "Discursante", nombre: "Benjamín Ferrer", congregacion: "Barcelona- Verneda", telefono: "34669407731", hora: "9:55", numero: 39, titulo: "\"Ningún hombre ha subido al cielo\"", duracion: "0:12" },
        { id: "DM-DISCURSANTE-FRANCISCO-JAVIER-VILA", rol: "Discursante", nombre: "Francisco Javier Vila", congregacion: "Prat de Llobregat- Centric", telefono: "34670222691", hora: "10:07", numero: 40, titulo: "Ir \"a la luz\"", duracion: "0:13" },
        { id: "DM-DISCURSANTE-JOSEPH-SALAZAR", rol: "Discursante", nombre: "Joseph Salazar", congregacion: "Barcelona- Horta", telefono: "34644611770", hora: "10:21", numero: 41, titulo: "\"Ese soy yo\"", duracion: "0:13" },
        { id: "DM-DISCURSANTE-FERNANDO-TERUEL", rol: "Discursante", nombre: "Fernando Teruel", congregacion: "Hospitalet de Llobregat- Este", telefono: "34610520042", hora: "10:35", numero: 42, titulo: "\"Mi alimento\"", duracion: "0:13" },
        { id: "DM-VIDEO-PRODUCCION-AUDIOVISUAL-4", rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Los campos están Blancos, listos para la cosecha", hora: "10:49", numero: 43, duracion: "0:15" },
        { id: "DM-DISCURSANTE-JOSE-MANUEL-LARA", rol: "Discursante", nombre: "José Manuel Lara", congregacion: "Circuito ESP-B-10", telefono: "34647905979", hora: "11:15", numero: 44, titulo: "¿Sabe en qué se basan sus creencias?", duracion: "0:29" },
        { id: "DM-DISCURSANTE-NINO-LLOPIS", rol: "Discursante", nombre: "Nino Llopis", congregacion: "Ripoll", telefono: "34676977747", hora: "11:45", numero: 45, titulo: "Resumen de La Atalaya", duracion: "0:29" }
    ]},
    { sesion: "Domingo Tarde", dia: "Domingo", participantes: [
        { id: "DT-PRESIDENTE-JULIAN-LASHERAS", rol: "Presidente", nombre: "Julian Lasheras", congregacion: "ESP-B-03", telefono: "609919464", hora: "13:35" },
        { id: "DT-VIDEO-PRODUCCION-AUDIOVISUAL-5", rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús: Episodio 3. \"Ese soy yo\"", hora: "13:50", numero: 46, duracion: "0:45" },
        { id: "DT-DISCURSANTE-JULIAN-LASHERAS-2", rol: "Discursante", nombre: "Julian Lasheras", congregacion: "ESP-B-03", telefono: "609919464", hora: "14:45", numero: 47, titulo: "¿Qué hemos aprendido?", duracion: "0:10" },
        { id: "DT-DISCURSANTE-ANDRES-MAYOR-BETEL-2", rol: "Discursante", nombre: "Andres Mayor (Betel)", congregacion: "Alcalá de Henares- Inglesa", telefono: "34657107524", hora: "14:55", numero: 48, titulo: "Permanezcamos en el gran templo espiritual de Jehová", duracion: "0:49" },
        { id: "DT-ORACION-FINAL-ANDRES-MAYOR-BETEL", rol: "Oración Final", nombre: "Andres Mayor (Betel)", congregacion: "Alcalá de Henares- Inglesa", telefono: "34657107524", hora: "15:45" }
    ]}
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

// --- ELEMENTOS DEL DOM (se obtienen después de que el usuario se autentica o al cargar el DOM para el login) ---
let loginScreen;
let loginForm;
let emailInput;
let passwordInput;
let loginError;
let appContainer;
let logoutButton;
let navContainer; // Ahora es el <ul> dentro de nav-menu
let programContainer;
let summaryPanel;
let body;

// Nueva funcionalidad de tabla del programa
let openProgramTableBtn;
let closeProgramTableBtn;
let programTableOverlay;
let tabButtons;
let tabContents;
let hamburgerMenu; // Elemento del menú hamburguesa
let navMenu;       // Menú de navegación (UL)

// Función para obtener los elementos del DOM una vez que la estructura HTML esté visible
function getDOMElements() {
    loginScreen = document.getElementById('login-screen');
    loginForm = document.getElementById('login-form');
    emailInput = document.getElementById('email-input');
    passwordInput = document.getElementById('password-input');
    loginError = document.getElementById('login-error');
    appContainer = document.getElementById('app-container');
    logoutButton = document.getElementById('logout-button');
    navContainer = document.getElementById('day-nav'); // El UL que contiene los botones de día
    programContainer = document.getElementById('program-container');
    summaryPanel = document.getElementById('summary-panel');
    body = document.body;

    // Elementos de la nueva tabla
    openProgramTableBtn = document.getElementById('openProgramTable');
    closeProgramTableBtn = document.getElementById('closeProgramTable');
    programTableOverlay = document.getElementById('programTableOverlay');
    tabButtons = document.querySelectorAll('.tab-navigation .tab-button');
    tabContents = document.querySelectorAll('.tab-content');
    hamburgerMenu = document.getElementById('hamburger-menu');
    navMenu = document.getElementById('nav-menu');
}

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
 * @returns {HTMLElement} - El elemento del acordeón.
 */
function crearAcordeon(participante) {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'participant-accordion';
    accordionItem.dataset.id = participante.id;
    accordionItem.dataset.rol = participante.rol;
    accordionItem.dataset.nombre = participante.nombre;

    const header = document.createElement('button');
    header.className = 'accordion-header';

    const esProd = participante.rol.includes('Video') && participante.nombre.includes('PRODUCCIÓN AUDIOVISUAL');
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

    // Ocultar el número de teléfono en la UI principal
    const whatsappLink = participante.telefono ? 
        `<a href="https://wa.me/${participante.telefono.replace(/\D/g,'')}" target="_blank" class="whatsapp-icon-container" title="Enviar WhatsApp a ${participante.nombre}">
            <i class="fa-brands fa-whatsapp whatsapp-icon"></i>
        </a>` : '';

    header.innerHTML = `
        <div class="participant-info">
            <div class="participant-name">${participante.nombre}</div>
            <div class="participant-role">${participante.rol}</div>
            ${participante.congregacion ? `<div class="participant-congregation">${participante.congregacion}</div>` : ''}
        </div>
        <div class="participant-details">
            <div class="status-indicators">${indicatorsHTML}</div>
            ${participante.hora ? `<span class="details-time">${participante.hora}</span>` : ''}
            ${participante.numero ? `<span class="details-number">#${participante.numero}</span>` : ''}
            ${whatsappLink}
            ${!esProd ? '<i class="fas fa-chevron-down accordion-icon"></i>' : ''}
        </div>`;

    const content = document.createElement('div');
    content.className = 'accordion-content';

    if (!esProd) {
        const checklistContainer = document.createElement('div');
        checklistContainer.className = 'checklist-container';

        itemsChecklist.forEach(item => {
            // Condición para ocultar/deshabilitar elementos del checklist
            if ((esOra && ocOra.includes(item.id)) || (esBetel && ocBet.includes(item.id))) {
                // Si el elemento debe ser ocultado por estas reglas, simplemente no lo creamos.
                return;
            }

            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item';
            itemDiv.dataset.containerFor = item.id;
            itemDiv.innerHTML = `<i class="icon ${item.icon}"></i><label for="check-${participante.id}-${item.id}">${item.texto}</label>`;

            if (item.tipo === 'checkbox') {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.dataset.itemId = item.id;
                input.id = `check-${participante.id}-${item.id}`;
                itemDiv.appendChild(input);
            } else { // tipo 'radio'
                const radioGroup = document.createElement('div');
                radioGroup.className = 'makeup-options';
                item.opciones.forEach(opt => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `radio-${participante.id}-${item.id}`;
                    radio.value = opt;
                    radio.dataset.itemId = item.id;
                    radio.id = `radio-${participante.id}-${item.id}-${opt}`;
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
 * Genera el HTML inicial para todos los días y sesiones del programa en el contenedor principal.
 */
function generarProgramaHTML() {
    programContainer.innerHTML = '';
    ['Viernes', 'Sábado', 'Domingo'].forEach(dia => {
        const daySection = document.createElement('section');
        daySection.id = `content-${dia}`; // ID para la sección del día
        daySection.className = 'day-content hidden'; // Clase para ocultar por defecto

        const dayTitle = document.createElement('h2');
        dayTitle.textContent = dia;
        daySection.appendChild(dayTitle);

        programa.filter(s => s.dia === dia).forEach(sesion => {
            const sessionBlock = document.createElement('div');
            sessionBlock.className = 'session-block';
            sessionBlock.innerHTML = `<h3>${sesion.sesion}</h3>`; // Usar h3 para sesiones internas
            sesion.participantes.forEach(p => {
                sessionBlock.appendChild(crearAcordeon(p));
            });
            daySection.appendChild(sessionBlock);
        });
        programContainer.appendChild(daySection);
    });
    
    // Muestra el primer día por defecto (Viernes)
    document.getElementById('content-Viernes').classList.remove('hidden');
}


/**
 * Actualiza la UI de un acordeón individual (barra de progreso, indicadores, estado completo).
 * @param {HTMLElement} accordion - El elemento del acordeón a actualizar.
 */
function actualizarEstadoUI(accordion) {
    if (!accordion) return;

    const rol = accordion.dataset.rol;
    const nombre = accordion.dataset.nombre;

    // Identificar si es una producción audiovisual
    const esProd = rol.includes('Video') && nombre.includes('PRODUCCIÓN AUDIOVISUAL');

    if (esProd) {
        accordion.classList.add('is-audiovisual');
        accordion.style.setProperty('--progress-percent', '0%');
        accordion.classList.remove('is-complete');
        // Asegurarse de que el icono del acordeón no se muestre o se comporte como un desplegable
        const accordionIcon = accordion.querySelector('.accordion-icon');
        if (accordionIcon) accordionIcon.style.display = 'none';
        return;
    } else {
        accordion.classList.remove('is-audiovisual');
        const accordionIcon = accordion.querySelector('.accordion-icon');
        if (accordionIcon) accordionIcon.style.display = ''; // Mostrar el icono si no es prod
    }

    const esBetel = nombre.includes('(Betel)') || nombre.includes('(BTL)');
    const esOra = rol.includes('Oración');
    const ocOra = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
    const ocBet = ['orientacion', 'recordatorios'];
    const maquillajeRadioNA = accordion.querySelector('input[data-item-id="maquillaje"][value="N/A"]'); 
    const esNA = maquillajeRadioNA && maquillajeRadioNA.checked;
    
    // Deshabilitar repaso de maquillaje si se selecciona N/A
    const repasoContainer = accordion.querySelector('[data-container-for="repaso_maquillaje"]');
    if (repasoContainer) {
        const inputRepaso = repasoContainer.querySelector('input');
        if (inputRepaso) {
            inputRepaso.disabled = esNA;
            if (esNA && inputRepaso.checked) {
                inputRepaso.checked = false;
                inputRepaso.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change to save to Firebase
            }
        }
        repasoContainer.classList.toggle('disabled', esNA);
    }

    // Calcular progreso
    const itemsAplicables = itemsChecklist.filter(item => {
        if ((esOra && ocOra.includes(item.id)) || (esBetel && ocBet.includes(item.id))) {
            return false;
        }
        if (esNA && item.id === 'repaso_maquillaje') {
            return false;
        }
        return true;
    });

    const totalTasks = itemsAplicables.length;
    let completedTasks = 0;
    
    const completedItemIds = new Set(); 

    itemsAplicables.forEach(item => {
        if (item.tipo === 'checkbox') {
            const checkbox = accordion.querySelector(`input[data-item-id="${item.id}"][type="checkbox"]`);
            if (checkbox && checkbox.checked) {
                completedItemIds.add(item.id);
            }
        } else if (item.tipo === 'radio') {
            const checkedRadio = accordion.querySelector(`input[data-item-id="${item.id}"]:checked`);
            if (checkedRadio) {
                completedItemIds.add(item.id);
            }
        }
    });
    completedTasks = completedItemIds.size;
    
    const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    accordion.style.setProperty('--progress-percent', `${percent}%`);
    accordion.classList.toggle('is-complete', percent >= 100);
    
    // Actualizar indicadores de estado
    accordion.querySelectorAll('.indicator').forEach(indicator => {
        indicator.className = 'indicator'; // Reset class
        const itemId = indicator.dataset.indicatorFor;

        const itemConfig = itemsChecklist.find(it => it.id === itemId);
        let shouldHideIndicator = false;
        if (itemConfig) {
            if ((esOra && ocOra.includes(itemConfig.id)) || (esBetel && ocBet.includes(itemConfig.id))) {
                shouldHideIndicator = true;
            }
            if (esNA && itemConfig.id === 'repaso_maquillaje') {
                shouldHideIndicator = true;
            }
        }

        if (shouldHideIndicator) {
            indicator.style.display = 'none'; // Hide the indicator if not applicable
        } else {
            indicator.style.display = ''; // Ensure it's visible if applicable
            const input = accordion.querySelector(`input[data-item-id="${itemId}"]`);
            
            if (input && !input.disabled) { 
                if (input.type === 'checkbox' && input.checked) {
                    // Normalize the itemId for class name (e.g., "repaso_maquillaje" -> "repasofinaldemaquillaje")
                    const className = itemId.replace(/_|-|\s/g, ''); // Remove underscores, hyphens, spaces
                    if (itemId === 'repaso_maquillaje') { // Specific fix for this one
                         indicator.classList.add('repasofinaldemaquillaje');
                    } else {
                        indicator.classList.add(className);
                    }
                } else if (input.type === 'radio') {
                    const checkedRadio = accordion.querySelector(`input[name="${input.name}"]:checked`);
                    if (checkedRadio) {
                        const valueClass = `maquillaje${checkedRadio.value.toLowerCase().replace(/\s|\//g, '')}`; 
                        indicator.classList.add(valueClass);
                    }
                }
            }
        }
    });
}

/**
 * Actualiza el panel de resumen con las estadísticas del día activo.
 */
function updateSummary() {
    const activeButton = navContainer.querySelector('.nav-button.active');
    if (!activeButton) return;

    const day = activeButton.dataset.day;
    const dayContent = document.getElementById(`content-${day}`);
    if (!dayContent) return;

    const totalParticipantes = dayContent.querySelectorAll('.participant-accordion:not(.is-audiovisual)').length;
    const completos = dayContent.querySelectorAll('.participant-accordion.is-complete').length;
    
    // Count 'Maquillaje: Sí' explicitly
    let conMaquillaje = 0;
    dayContent.querySelectorAll('.participant-accordion').forEach(accordion => {
        const maquillajeSiRadio = accordion.querySelector('input[data-item-id="maquillaje"][value="Sí"]');
        if (maquillajeSiRadio && maquillajeSiRadio.checked) {
            conMaquillaje++;
        }
    });

    summaryPanel.innerHTML = `
        <div class="summary-item"><div class="count">${totalParticipantes}</div><div class="label">Participantes</div></div>
        <div class="summary-item"><div class="count">${completos}</div><div class="label">Completos</div></div>
        <div class="summary-item"><div class="count">${conMaquillaje}</div><div class="label">Maquillaje</div></div>`;
    
    document.title = `(${completos}/${totalParticipantes}) Checklist ${day}`;
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
    // Recorre todos los participantes para configurar listeners individuales
    programa.forEach(sesion => {
        sesion.participantes.forEach(p => {
            // Solo sincroniza si no es una producción audiovisual
            if (p.rol.includes('Video') && p.nombre.includes('PRODUCCIÓN AUDIOVISUAL')) return;

            onSnapshot(doc(db, 'tareas', p.id), (docSnapshot) => {
                const accordion = document.querySelector(`.participant-accordion[data-id="${p.id}"]`);
                if (!accordion) return;

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    Object.entries(data).forEach(([key, value]) => {
                        const checkbox = accordion.querySelector(`input[data-item-id="${key}"][type="checkbox"]`);
                        if (checkbox) {
                            checkbox.checked = value;
                        } else { // Radios
                            const radioElements = accordion.querySelectorAll(`input[data-item-id="${key}"]`);
                            radioElements.forEach(radio => {
                                radio.checked = (radio.value === value);
                                radio.dataset.wasChecked = radio.checked; // Mantener el estado para deselección
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
 * Genera el contenido de las tablas del programa para el overlay.
 */
function generateProgramTables() {
    const dayMap = {
        'Viernes': ['Viernes Mañana', 'Viernes Tarde'],
        'Sábado': ['Sábado Mañana', 'Sábado Tarde'],
        'Domingo': ['Domingo Mañana', 'Domingo Tarde']
    };

    for (const day in dayMap) {
        const tableContentDiv = document.getElementById(`${day}TableContent`);
        if (!tableContentDiv) continue;

        tableContentDiv.innerHTML = ''; // Clear previous content

        dayMap[day].forEach(sessionName => {
            const sessionData = programa.find(s => s.sesion === sessionName);
            if (!sessionData) return;

            const sessionTableHTML = `
                <h3>${sessionName}</h3> <div class="speech-table"> <table>
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>Hora</th>
                                <th>Min</th>
                                <th>Función/Título del Discurso</th>
                                <th>Orador/Presidente</th>
                                <th>Congregación</th>
                                <th>PD</th>
                                <th>DA</th>
                                <th>AA</th>
                                <th>REAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sessionData.participantes.map(p => {
                                const isPresident = p.rol.includes('Presidente');
                                const isPrayer = p.rol.includes('Oración');
                                const isVideo = p.rol.includes('Video');
                                
                                const rowClass = isPresident ? 'table-president-row' : '';

                                return `
                                    <tr class="${rowClass}">
                                        <td>${p.numero || ''}</td>
                                        <td>${p.hora || ''}</td>
                                        <td>${p.duracion || ''}</td>
                                        <td>${p.titulo || (isPresident ? 'PRESIDENTE DE LA SESIÓN' : (isPrayer ? `Canción y oración` : (isVideo ? p.nombre : '')))}</td>
                                        <td>${p.nombre || ''}</td>
                                        <td>${p.congregacion || ''}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            tableContentDiv.insertAdjacentHTML('beforeend', sessionTableHTML);
        });
    }
}


/**
 * Configura todos los event listeners de la aplicación.
 */
function setupEventListeners() {
    // Listener para el menú hamburguesa
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('show');
        });
    }

    // Listener para los botones de navegación de días (menú hamburguesa)
    if (navContainer) {
        navContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.nav-button');
            if (!button || button.classList.contains('active')) return;

            // Remover la clase 'active' del botón de navegación previamente activo
            const currentActiveNavButton = navContainer.querySelector('.nav-button.active');
            if (currentActiveNavButton) {
                currentActiveNavButton.classList.remove('active');
            }
            button.classList.add('active');

            // Ocultar todas las secciones de día y mostrar la seleccionada
            document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
            document.getElementById(`content-${button.dataset.day}`).classList.remove('hidden');

            // Cerrar el menú hamburguesa después de la selección
            if (hamburgerMenu) hamburgerMenu.classList.remove('active');
            if (navMenu) navMenu.classList.remove('show');

            // Aplicar el tema de iluminación y actualizar el resumen
            setDayTheme(button.dataset.day);
            updateSummary();
        });
    }

    // Listener para abrir/cerrar acordeones de participantes
    if (programContainer) {
        programContainer.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (!header) return;
            const accordion = header.closest('.participant-accordion');
            if (accordion.classList.contains('is-audiovisual')) return; // No abrir si es audiovisual
            
            header.classList.toggle('active');
            header.nextElementSibling.classList.toggle('active'); // Muestra/oculta el contenido
        });
    }

    // Listener para cambios en el checklist (checkbox y radios)
    if (programContainer) {
        programContainer.addEventListener('change', (e) => {
            const input = e.target.closest('input[data-item-id]');
            if (!input) return;
            const accordion = input.closest('.participant-accordion');
            const value = input.type === 'checkbox' ? input.checked : (accordion.querySelector(`input[name="${input.name}"]:checked`)?.value || null);
            saveStateToFirebase(accordion.dataset.id, input.dataset.itemId, value);
        });
    }

    // Listener para el botón de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Error al cerrar sesión: ", error);
            }
        });
    }

    // --- Lógica de la nueva tabla de programa (overlay) ---
    if (openProgramTableBtn) {
        openProgramTableBtn.addEventListener('click', () => {
            if (programTableOverlay) {
                programTableOverlay.classList.add('show');
            }
        });
    }

    if (closeProgramTableBtn) {
        closeProgramTableBtn.addEventListener('click', () => {
            if (programTableOverlay) {
                programTableOverlay.classList.remove('show');
            }
        });
    }

    // Función para cambiar de pestaña (día) en la tabla del programa
    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const day = button.dataset.day;

                // Remover la clase 'active' de todos los botones y ocultar todos los contenidos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.style.display = 'none');

                // Añadir la clase 'active' al botón clickeado y mostrar el contenido correspondiente
                button.classList.add('active');
                const targetContent = document.getElementById(`${day}TableContent`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });
    }

    // Set initial active tab for the program table
    if (tabButtons && tabButtons.length > 0) {
        tabButtons[0].click(); // Simulate click on the first tab button
    }
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
    // Get DOM elements here, after appContainer is shown and structure is built
    getDOMElements(); 

    loginScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Generar la UI principal (acordeones)
    generarProgramaHTML();
    // Generar las tablas completas para el overlay
    generateProgramTables(); 
    // Configurar todos los listeners (importante que DOM esté ya construido)
    setupEventListeners();
    // Sincronizar con Firebase
    syncStateFromFirebase();
    
    // Establecer el tema inicial al cargar la app (el primer botón activo del navContainer)
    const initialDayButton = navContainer.querySelector('.nav-button.active');
    if (initialDayButton) {
        setDayTheme(initialDayButton.dataset.day);
    } else {
        // Fallback si no hay botón activo, aunque debería haberlo por defecto en HTML
        setDayTheme('Viernes'); 
    }

    updateAllUI(); // Actualizar el estado inicial de todos los acordeones y el resumen
}

// Observador del estado de autenticación
onAuthStateChanged(auth, user => {
    if (user) {
        startApp();
    } else {
        // Ensure DOM elements are available for the login screen
        getDOMElements(); 
        showLoginScreen();
    }
});

// Listener para el formulario de login (ensure this listener is set up early)
document.addEventListener('DOMContentLoaded', () => {
    getDOMElements(); // Get DOM elements as soon as the DOM is ready for the login form

    if (loginForm) { // Check if loginForm exists before adding listener
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
    }
});
