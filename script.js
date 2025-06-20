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

// --- ESTRUCTURA DEL PROGRAMA Y CHECKLIST ---
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
        { rol: "Discursante", nombre: "Bárbaro Yuliexi Tejera Ríos", hora: "15:39", numero: 15 },
        { rol: "Discursante", nombre: "Rafael Corral", hora: "15:48", numero: 16 },
        { rol: "Discursante", nombre: "Míchel Gottardo", hora: "15:58", numero: 17 },
        { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "16:10", numero: 18 },
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
        { rol: "Discursante", nombre: "Adolfo Fornieles", hora: "15:06", numero: 35 },
        { rol: "Discursante", nombre: "Alfonso Guerrero", hora: "15:30", numero: 36 },
        { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "16:00", numero: 37 },
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
        { rol: "Presidente", nombre: "Julián Lasheras" },
        { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL", hora: "13:50", numero: 46 },
        { rol: "Discursante", nombre: "Julián Lasheras", hora: "14:45", numero: 47 },
        { rol: "Discursante", nombre: "Andrés Mayor (Betel)", hora: "14:54", numero: 48 },
        { rol: "Oración Final", nombre: "Andrés Mayor (Betel)" }
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

// --- RESPONSABLES DE TURNO ---
const responsablesPorTurno = [
  { "Día": "Viernes", "Turno": "Mañana", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Javier Bolivar", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Inma C., Vanessa C., Raquel P.", "Maquillaje Plataforma": "Gemma Monje" },
  { "Día": "Viernes", "Turno": "Tarde", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Alejandro Hernandez", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Ana M., Sandra O., Gemma M.", "Maquillaje Plataforma": "Raquel Pallares" },
  { "Día": "Sábado", "Turno": "Mañana", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Mario Martín", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Gemma M., Inma C., Sandra O.", "Maquillaje Plataforma": "Ana Marañón" },
  { "Día": "Sábado", "Turno": "Tarde", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Javier Bolivar", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Vanessa C., Raquel P., Ana M.", "Maquillaje Plataforma": "Sandra Ortega" },
  { "Día": "Domingo", "Turno": "Mañana", "Comunicación AV": "Manel Casino", "Atrezzo/Crono": "Rubén Gomez", "Atril": "Alejandro Hernandez", "Recepción y Enlace": "Juan Carlos Marín", "Maquillaje": "Ana M., Sandra O., Vanessa C.", "Maquillaje Plataforma": "Inma Casino" },
  { "Día": "Domingo", "Turno": "Tarde", "Comunicación AV": "Rafael Monje", "Atrezzo/Crono": "Adriá Rivera", "Atril": "Mario Martín", "Recepción y Enlace": "Luis Fernando Paz", "Maquillaje": "Gemma Monje, Ana M., Raquel P.", "Maquillaje Plataforma": "Vanessa Intriago" }
];

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
const responsablesContainer = document.getElementById('responsables-container');
const responsablesContent = document.getElementById('responsables-content');
const body = document.body;

// Estado de la aplicación
let currentView = 'checklist';
let currentDay = 'Viernes'; 

// --- FUNCIONES DE LA APLICACIÓN ---

function setDayTheme(day) {
    body.classList.remove('day-viernes', 'day-sabado', 'day-domingo');
    if (day) {
        body.classList.add(`day-${day.toLowerCase()}`);
    }
}

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
            } else { 
                const radioGroup = document.createElement('div');
                radioGroup.className = 'makeup-options';
                item.opciones.forEach(opt => {
                    const radioId = `radio-${idUnico}-${item.id}-${opt}`;
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `radio-${idUnico}-${item.id}`;
                    radio.value = opt;
                    radio.dataset.itemId = item.id;
                    radio.id = radioId;
                    const label = document.createElement('label');
                    label.setAttribute('for', radioId);
                    label.textContent = opt;
                    radio.addEventListener('mousedown', (e) => {
                        if (radio.checked) {
                            e.preventDefault();
                            radio.checked = false;
                            radio.dispatchEvent(new Event('change', { bubbles: true }));
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
                const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/[^a-zA-Z0-9-]/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
                sessionBlock.appendChild(crearAcordeon(p, idUnico));
            });
            dayContent.appendChild(sessionBlock);
        });
        programContainer.appendChild(dayContent);
    });
}

function actualizarEstadoUI(accordion) {
    if (!accordion) return;

    const nombre = accordion.dataset.nombre;
    if (nombre.includes('PRODUCCIÓN AUDIOVISUAL')) {
        accordion.classList.add('is-audiovisual');
        return;
    }
    
    const rol = accordion.dataset.rol;
    const esOra = rol.includes('Oración');
    const esBetel = nombre.includes('(Betel)') || nombre.includes('(BTL)');
    const ocOra = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
    const ocBet = ['orientacion', 'recordatorios'];
    const maquillajeNA = accordion.querySelector('input[data-item-id="maquillaje"][value="N/A"]:checked');
    
    const repasoContainer = accordion.querySelector('[data-container-for="repaso_maquillaje"]');
    if (repasoContainer) {
        const inputRepaso = repasoContainer.querySelector('input');
        if (inputRepaso) {
            inputRepaso.disabled = !!maquillajeNA;
            if (maquillajeNA && inputRepaso.checked) {
                inputRepaso.checked = false;
                inputRepaso.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }

    const itemsAplicables = itemsChecklist.filter(it => !(esOra && ocOra.includes(it.id)) && !(esBetel && ocBet.includes(it.id)) && !(maquillajeNA && it.id === 'repaso_maquillaje'));
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
    
    accordion.querySelectorAll('.indicator').forEach(indicator => {
        indicator.className = 'indicator';
        const itemId = indicator.dataset.indicatorFor;
        const input = accordion.querySelector(`input[data-item-id="${itemId}"]`);
        if (input?.type === 'checkbox' && input.checked) {
            indicator.classList.add(itemId);
        } else if (input?.type === 'radio') {
            const checkedRadio = accordion.querySelector(`input[name="${input.name}"]:checked`);
            if (checkedRadio) {
                const valueClass = `maquillaje-${checkedRadio.value.toLowerCase().replace('/', '')}`;
                indicator.classList.add(valueClass);
            }
        }
    });
}

function updateSummary() {
    if (currentView !== 'checklist') {
        summaryPanel.classList.add('hidden');
        document.title = "Checklist del Programa";
        return;
    }
    summaryPanel.classList.remove('hidden');

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

async function saveStateToFirebase(id, item, value) {
    try {
        await setDoc(doc(db, 'tareas', id), { [item]: value }, { merge: true });
    } catch (e) {
        console.error("Error al guardar en Firebase: ", e);
        alert('No se pudo guardar el cambio. Revisa tu conexión a internet.');
    }
}

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
                            accordion.querySelectorAll(`input[data-item-id="${key}"]`).forEach(radio => {
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

function mostrarResponsablesDeTurno() {
    responsablesContent.innerHTML = '';
    const diasOrden = ['Viernes', 'Sábado', 'Domingo'];

    diasOrden.forEach(diaKey => {
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
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>${rol}:</strong> ${sesionData[rol]}`;
                            ul.appendChild(li);
                        }
                    }
                    sesionDiv.appendChild(ul);
                    dayDiv.appendChild(sesionDiv);
                }
            });
            responsablesContent.appendChild(dayDiv);
        }
    });
}

function changeAppView(view, day = null) {
    currentView = view;
    if (day) currentDay = day;

    // Ocultar todos los contenedores principales
    [programContainer, responsablesContainer, summaryPanel].forEach(c => c.classList.add('hidden'));
    
    // Resetear todos los botones de navegación
    navContainer.querySelectorAll('.nav-button').forEach(button => button.classList.remove('active'));
    navContainer.querySelectorAll('.sub-day-button').forEach(button => button.classList.add('hidden'));

    // Activar el botón de la vista principal
    const mainViewButton = navContainer.querySelector(`.nav-button.main-view-button[data-view="${view}"]`);
    if (mainViewButton) mainViewButton.classList.add('active');

    let pageTitle = "Checklist del Programa";
    setDayTheme(null); // Limpiar tema

    if (view === 'checklist') {
        // Mostrar sub-botones para la vista de checklist
        navContainer.querySelectorAll(`.nav-button.sub-day-button[data-view="checklist"]`).forEach(button => {
            button.classList.remove('hidden');
        });
        const currentDayButton = navContainer.querySelector(`.nav-button.sub-day-button[data-view="checklist"][data-day="${currentDay}"]`);
        if(currentDayButton) currentDayButton.classList.add('active');
        
        setDayTheme(currentDay);
        programContainer.classList.remove('hidden');
        document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
        const content = document.getElementById(`content-${currentDay}`);
        if (content) content.classList.remove('hidden');
        updateSummary(); // El título se actualiza dentro de updateSummary

    } else if (view === 'responsables') {
        responsablesContainer.classList.remove('hidden');
        setDayTheme('Viernes'); // Usar un tema por defecto/neutro
        pageTitle = 'Responsables de Turno';
        document.title = pageTitle;
    }
}

function setupEventListeners() {
    programContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;
        const accordion = header.closest('.participant-accordion');
        if (accordion.classList.contains('is-audiovisual')) return;
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        content.classList.toggle('active');
    });

    programContainer.addEventListener('change', (e) => {
        const input = e.target.closest('input[data-item-id]');
        if (!input) return;
        const accordion = input.closest('.participant-accordion');
        const value = input.type === 'checkbox' ? input.checked : (accordion.querySelector(`input[name="${input.name}"]:checked`)?.value || null);
        saveStateToFirebase(accordion.dataset.id, input.dataset.itemId, value);
    });

    navContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.nav-button');
        if (!button) return;
        const newView = button.dataset.view;
        const newDay = button.dataset.day;
        changeAppView(newView, newDay || currentDay);
    });

    logoutButton.addEventListener('click', () => signOut(auth).catch(err => console.error("Error al cerrar sesión: ", err)));
}

// --- LÓGICA DE INICIO Y AUTENTICACIÓN ---

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    appContainer.classList.add('hidden');
    loginError.classList.add('hidden');
    body.className = '';
}

function startApp() {
    loginScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    generarProgramaHTML();
    mostrarResponsablesDeTurno();

    setupEventListeners();
    syncStateFromFirebase();
    
    changeAppView('checklist', 'Viernes');
}

onAuthStateChanged(auth, user => {
    if (user) {
        startApp();
    } else {
        showLoginScreen();
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (err) {
        const errorMessages = {
            'auth/invalid-email': 'El formato del correo es inválido.',
            'auth/user-not-found': 'No se encontró un usuario con ese correo.',
            'auth/wrong-password': 'La contraseña es incorrecta.',
            'auth/too-many-requests': 'Demasiados intentos fallidos. Inténtalo más tarde.'
        };
        loginError.textContent = errorMessages[err.code] || 'Ocurrió un error al iniciar sesión.';
        loginError.classList.remove('hidden');
    }
});
