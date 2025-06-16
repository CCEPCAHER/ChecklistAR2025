// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE (TUS DATOS) ---
const firebaseConfig = {
    apiKey: "AIzaSyBCbnup0noV5iG139vfx-JynvPs2DYxB7w",
    authDomain: "checklist-ar2025.firebaseapp.com",
    projectId: "checklist-ar2025",
    storageBucket: "checklist-ar2025.appspot.com",
    messagingSenderId: "207074993986",
    appId: "1:207074993986:web:bc6b1150fcfd2885040adb"
};

// --- INICIALIZACIÓN DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tareasCollectionRef = collection(db, "tareas");

document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN PRINCIPAL DE LA APP ---
    const contraseñaCorrecta = "programa2025";
    const SESSION_KEY = 'isLoggedIn-checklist2025';
    const programa = [
        // ... (El contenido del programa es el mismo, no lo incluyo aquí para abreviar)
        {
            sesion: "Viernes Mañana",
            participantes: [
                { rol: "Presidente", nombre: "Juan Salazar", hora: "9:30" },
                { rol: "Oración", nombre: "Lucas Vazquez" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "9:40", numero: 1 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:10", numero: 2 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:50", numero: 3 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:11", numero: 4 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:28", numero: 5 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:45", numero: 6 },
            ]
        },
        {
            sesion: "Viernes Tarde",
            participantes: [
                { rol: "Presidente", nombre: "Felipe Moreno" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "13:50", numero: 7 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:06", numero: 8 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:22", numero: 9 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:36", numero: 10 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:00", numero: 11 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:12", numero: 12 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:21", numero: 13 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:30", numero: 14 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:39", numero: 15 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:48", numero: 16 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:58", numero: 17 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "16:10", numero: 18 },
                { rol: "Oración Final", nombre: "Sara Gomez" },
            ]
        },
        {
            sesion: "Sábado Mañana",
            participantes: [
                { rol: "Presidente", nombre: "Pedro Castillo" },
                { rol: "Oración", nombre: "Ana Beltran" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "9:40", numero: 19 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "9:50", numero: 20 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:30", numero: 21 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:40", numero: 22 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:49", numero: 23 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:59", numero: 24 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:09", numero: 25 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:17", numero: 26 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:25", numero: 27 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:34", numero: 28 },
            ]
        },
        {
            sesion: "Sábado Tarde",
            participantes: [
                { rol: "Presidente", nombre: "Marta Rivas" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "13:50", numero: 29 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:00", numero: 30 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:09", numero: 31 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:20", numero: 32 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:45", numero: 33 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:56", numero: 34 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:06", numero: 35 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "15:30", numero: 36 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "16:00", numero: 37 },
                { rol: "Oración Final", nombre: "Javier Fernandez" },
            ]
        },
        {
            sesion: "Domingo Mañana",
            participantes: [
                { rol: "Presidente", nombre: "Carlos Dominguez" },
                { rol: "Oración", nombre: "Isabel Torres" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "9:40", numero: 38 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "9:55", numero: 39 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:07", numero: 40 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:21", numero: 41 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:35", numero: 42 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:49", numero: 43 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:15", numero: 44 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "11:45", numero: 45 },
            ]
        },
        {
            sesion: "Domingo Tarde",
            participantes: [
                { rol: "Presidente", nombre: "Ricardo Morales" },
                { rol: "Discursante", nombre: "Por Asignar", hora: "13:50", numero: 46 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:45", numero: 47 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "14:54", numero: 48 },
                { rol: "Oración Final", nombre: "Laura Gimenez" },
            ]
        },
    ];

    const itemsChecklist = [
        { id: 'recogida', texto: 'Recogida en presidencia', tipo: 'checkbox', icon: 'fa-solid fa-handshake', indicator: true },
        { id: 'orientacion', texto: 'Orientación inicial', tipo: 'checkbox', icon: 'fa-solid fa-compass', indicator: true },
        { id: 'maquillaje', texto: 'Maquillaje', tipo: 'radio', opciones: ['Sí', 'No', 'N/A'], icon: 'fa-solid fa-palette', indicator: true },
        { id: 'detras_plataforma', texto: 'Listo tras bastidores (20 min)', tipo: 'checkbox', icon: 'fa-solid fa-clock', indicator: true },
        { id: 'repaso_maquillaje', texto: 'Repaso final de maquillaje', tipo: 'checkbox', icon: 'fa-solid fa-brush', indicator: false },
        { id: "recordatorios", texto: "Recordatorios finales", tipo: "checkbox", icon: "fa-solid fa-bullhorn", indicator: false },
        { id: 'discursado', texto: 'Participación completada', tipo: 'checkbox', icon: 'fa-solid fa-microphone-slash', indicator: true }
    ];

    // --- ELEMENTOS DEL DOM ---
    const loginScreen = document.getElementById('login-screen');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    const appContainer = document.getElementById('app-container');
    const logoutButton = document.getElementById('logout-button');
    const programContainer = document.getElementById('program-container');
    const navContainer = document.getElementById('day-nav');
    const summaryPanel = document.getElementById('summary-panel');

    // --- FUNCIONES DE RENDERIZADO ---
    function crearAcordeon(participante, idUnico) {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'participant-accordion';
        accordionItem.dataset.id = idUnico;

        const header = document.createElement('button');
        header.className = 'accordion-header';

        const indicatorsHTML = itemsChecklist
            .filter(item => item.indicator)
            .map(item => `<span class="indicator" data-indicator-for="${item.id}"></span>`)
            .join('');

        header.innerHTML = `
            <div class="participant-info">
                <div class="participant-name">${participante.nombre}</div>
                <div class="participant-role">${participante.rol}</div>
            </div>
            <div class="participant-details">
                <div class="status-indicators">${indicatorsHTML}</div>
                ${participante.hora ? `<span class="details-time">${participante.hora}</span>` : ''}
                ${participante.numero ? `<span class="details-number">#${participante.numero}</span>` : ''}
                <i class="fas fa-chevron-down accordion-icon"></i>
            </div>`;

        const content = document.createElement('div');
        content.className = 'accordion-content';
        const checklistContainer = document.createElement('div');
        checklistContainer.className = 'checklist-container';

        itemsChecklist.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item';
            itemDiv.dataset.containerFor = item.id;
            itemDiv.innerHTML = `<i class="icon ${item.icon}"></i><label for="check-${idUnico}-${item.id}">${item.texto}</label>`;

            if (item.tipo === 'checkbox') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.itemId = item.id;
                checkbox.id = `check-${idUnico}-${item.id}`;
                itemDiv.appendChild(checkbox);
            } else if (item.tipo === 'radio') {
                const radioGroup = document.createElement('div');
                radioGroup.className = 'makeup-options';
                item.opciones.forEach(opcion => {
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `radio-${idUnico}-${item.id}`;
                    radioInput.value = opcion;
                    radioInput.dataset.itemId = item.id;
                    radioInput.id = `radio-${idUnico}-${item.id}-${opcion}`;
                    const radioLabel = document.createElement('label');
                    radioLabel.textContent = opcion;
                    radioLabel.setAttribute('for', radioInput.id);

                    // *** INICIO DE LA CORRECCIÓN PARA DESMARCAR RADIO ***
                    let wasChecked = false;
                    radioInput.addEventListener('mousedown', () => {
                        wasChecked = radioInput.checked;
                    });
                    radioInput.addEventListener('click', (e) => {
                        if (wasChecked) {
                            radioInput.checked = false;
                            // Disparar evento change manualmente para que se guarde el estado
                            const changeEvent = new Event('change', { bubbles: true });
                            radioInput.dispatchEvent(changeEvent);
                        }
                    });
                    // *** FIN DE LA CORRECCIÓN ***

                    radioGroup.appendChild(radioInput);
                    radioGroup.appendChild(radioLabel);
                });
                itemDiv.appendChild(radioGroup);
            }
            checklistContainer.appendChild(itemDiv);
        });

        content.appendChild(checklistContainer);
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        return accordionItem;
    }

    function generarProgramaHTML() {
        programContainer.innerHTML = '';
        const dias = ["Viernes", "Sábado", "Domingo"];
        dias.forEach(dia => {
            const dayContainer = document.createElement('div');
            dayContainer.id = `content-${dia}`;
            dayContainer.className = 'day-content hidden';
            const sesionesDelDia = programa.filter(s => s.sesion.startsWith(dia));
            sesionesDelDia.forEach(sesion => {
                const sessionBlock = document.createElement('div');
                sessionBlock.className = 'session-block';
                sessionBlock.innerHTML = `<h2>${sesion.sesion}</h2>`;
                sesion.participantes.forEach((p) => {
                    const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/\s+/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
                    sessionBlock.appendChild(crearAcordeon(p, idUnico));
                });
                dayContainer.appendChild(sessionBlock);
            });
            programContainer.appendChild(dayContainer);
        });
        document.getElementById('content-Viernes').classList.remove('hidden');
    }

    // --- LÓGICA DE ESTADO Y ACTUALIZACIÓN DE UI ---
    function actualizarEstadoUI(accordionItem) {
        if (!accordionItem) return;

        const makeupRadio = accordionItem.querySelector('input[data-item-id="maquillaje"]:checked');
        const repasoContainer = accordionItem.querySelector('[data-container-for="repaso_maquillaje"]');
        const repasoInput = repasoContainer.querySelector('input');
        const esMaquillajeNoAplicable = makeupRadio && makeupRadio.value === 'N/A';

        repasoContainer.classList.toggle('disabled', esMaquillajeNoAplicable);
        repasoInput.disabled = esMaquillajeNoAplicable;
        if (esMaquillajeNoAplicable && repasoInput.checked) {
            repasoInput.checked = false;
            repasoInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        let totalItemsConsiderados = itemsChecklist.filter(item => !(esMaquillajeNoAplicable && item.id === 'repaso_maquillaje')).length;
        let completados = 0;
        const itemsRevisados = {};
        accordionItem.querySelectorAll('input[data-item-id]').forEach(input => {
            if (input.disabled || itemsRevisados[input.dataset.itemId]) return;

            if ((input.type === 'checkbox' && input.checked) || (input.type === 'radio' && accordionItem.querySelector(`input[name="${input.name}"]:checked`))) {
                completados++;
            }
            itemsRevisados[input.dataset.itemId] = true;
        });

        const porcentaje = totalItemsConsiderados > 0 ? (completados / totalItemsConsiderados) * 100 : 0;
        accordionItem.style.setProperty('--progress-percent', `${porcentaje}%`);
        const isComplete = porcentaje >= 100;
        accordionItem.classList.toggle('is-complete', isComplete);

        accordionItem.querySelectorAll('.indicator').forEach(indicator => {
            const itemId = indicator.dataset.indicatorFor;
            const input = accordionItem.querySelector(`input[data-item-id="${itemId}"]`);
            indicator.className = 'indicator'; // Reset
            indicator.classList.add(`indicator-for-${itemId}`);
            
            if (input && input.type === 'checkbox' && input.checked) {
                indicator.classList.add(itemId);
            } else if (input && input.type === 'radio') {
                const checkedRadio = accordionItem.querySelector(`input[name="${input.name}"]:checked`);
                if (checkedRadio) {
                    const cleanValue = checkedRadio.value.toLowerCase().replace('/', '');
                    indicator.classList.add(`maquillaje-${cleanValue}`);
                }
            }
        });
    }

    function updateAllUI() {
        document.querySelectorAll('.participant-accordion').forEach(acc => actualizarEstadoUI(acc));
        updateSummary();
    }

    function updateSummary() {
        const activeDayButton = navContainer.querySelector('.active');
        if (!activeDayButton) return;
        const diaActual = activeDayButton.dataset.day;
        const containerActual = document.getElementById(`content-${diaActual}`);
        if (!containerActual) return;

        const total = containerActual.querySelectorAll('.participant-accordion').length;
        const completados = containerActual.querySelectorAll('.participant-accordion.is-complete').length;
        const maquillajeSi = containerActual.querySelectorAll('input[data-item-id="maquillaje"][value="Sí"]:checked').length;

        summaryPanel.innerHTML = `
            <div class="summary-item"><div class="count">${total}</div><div class="label">Participantes</div></div>
            <div class="summary-item"><div class="count">${completados}</div><div class="label">Completos</div></div>
            <div class="summary-item"><div class="count">${maquillajeSi}</div><div class="label">Maquillaje</div></div>`;
        document.title = `(${completados}/${total}) Checklist ${diaActual}`;
    }

    // --- LÓGICA DE FIREBASE ---
    async function saveStateToFirebase(uniqueId, itemId, value) {
        try {
            const docRef = doc(db, "tareas", uniqueId);
            const docSnap = await getDoc(docRef);
            let currentData = docSnap.exists() ? docSnap.data() : { id: uniqueId };
            currentData[itemId] = value;
            await setDoc(docRef, currentData, { merge: true });
        } catch (error) {
            console.error("❌ Error guardando en Firebase:", error);
            alert("Error de conexión. No se pudo guardar el cambio.");
        }
    }

    function syncStateFromFirebase() {
        onSnapshot(tareasCollectionRef, (snapshot) => {
            snapshot.docs.forEach(docFB => {
                const taskData = docFB.data();
                const accordionItem = document.querySelector(`.participant-accordion[data-id="${taskData.id}"]`);
                if (accordionItem) {
                    Object.keys(taskData).forEach(itemId => {
                        if (itemId === 'id') return;

                        const value = taskData[itemId];
                        const checkbox = accordionItem.querySelector(`input[data-item-id="${itemId}"][type="checkbox"]`);
                        if (checkbox) {
                            checkbox.checked = value;
                        } else {
                            const radio = accordionItem.querySelector(`input[data-item-id="${itemId}"][value="${value}"]`);
                            if (radio) {
                                radio.checked = true;
                            } else if (value === null) { // Desmarcar si el valor en DB es null
                                const radios = accordionItem.querySelectorAll(`input[data-item-id="${itemId}"]`);
                                radios.forEach(r => r.checked = false);
                            }
                        }
                    });
                }
            });
            updateAllUI();
        }, error => {
            console.error("Error en la sincronización en tiempo real:", error);
        });
    }

    // --- MANEJADORES DE EVENTOS ---
    function setupEventListeners() {
        programContainer.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (header) {
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                content.classList.toggle('active');
            }
        });

        programContainer.addEventListener('change', (e) => {
            if (e.target.matches('input[data-item-id]')) {
                const input = e.target;
                const accordionItem = input.closest('.participant-accordion');
                const uniqueId = accordionItem.dataset.id;
                const itemId = input.dataset.itemId;
                let value;

                if (input.type === 'checkbox') {
                    value = input.checked;
                } else if (input.type === 'radio') {
                    // Si está marcado, toma el valor. Si no, es null (desmarcado).
                    value = input.checked ? input.value : null;
                }
                
                if (value !== undefined) {
                    saveStateToFirebase(uniqueId, itemId, value);
                }
                // La actualización de la UI se hará por el listener de Firebase,
                // pero una local es más rápida para la percepción del usuario.
                actualizarEstadoUI(accordionItem);
                updateSummary();
            }
        });

        navContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.nav-button');
            if (button && !button.classList.contains('active')) {
                navContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');

                const day = button.dataset.day.toLowerCase();
                document.body.className = `day-${day}`;
                document.body.style.backgroundColor = ''; // Usar el color del tema

                document.querySelectorAll('.day-content').forEach(c => c.classList.add('hidden'));
                document.getElementById(`content-${button.dataset.day}`).classList.remove('hidden');

                updateSummary();
            }
        });
        
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem(SESSION_KEY);
            location.reload();
        });
    }

    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    function startApp() {
        loginScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        document.body.className = 'day-viernes'; // Tema inicial
        document.body.style.backgroundColor = ''; // Permitir que el CSS del tema tome control

        generarProgramaHTML();
        setupEventListeners();
        syncStateFromFirebase();
    }

    function init() {
        // Verificar si el usuario ya ha iniciado sesión
        if (localStorage.getItem(SESSION_KEY) === 'true') {
            startApp();
        } else {
            loginScreen.classList.remove('hidden');
        }

        // Manejar el envío del formulario de login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (passwordInput.value === contraseñaCorrecta) {
                localStorage.setItem(SESSION_KEY, 'true');
                startApp();
            } else {
                loginError.classList.remove('hidden');
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    init();

});