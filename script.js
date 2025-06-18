// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE (TUS DATOS) ---
// ADVERTENCIA DE SEGURIDAD: Has expuesto tus claves de configuración de Firebase en el código del lado del cliente.
// Esto es normal para la 'apiKey', pero tu base de datos debe estar protegida con "Firebase Rules"
// para evitar que cualquiera con estas claves pueda leer o escribir en tu base de datos.
// La contraseña que has puesto en JavaScript NO ofrece seguridad real.
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
        {
            sesion: "Viernes Mañana",
            participantes: [
                { rol: "Presidente", nombre: "David Castro", hora: "9:30" },
                { rol: "Oración", nombre: "Francisco José Sánchez" },
                { rol: "Discursante", nombre: "Julián Lasheras ¿Qué es la adoración pura?", hora: "9:40", numero: 1 },
                { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 1).", hora: "10:10", numero: 2 },
                { rol: "Discursante", nombre: "Domingo Tarrasón", hora: "10:50", numero: 3 },
                { rol: "Discursante", nombre: "Pedro Medina", hora: "11:11", numero: 4 },
                { rol: "Discursante", nombre: "Daniel Velasco", hora: "11:28", numero: 5 },
                { rol: "Discursante", nombre: "Álex Botella", hora: "11:45", numero: 6 },
            ]
        },
        {
            sesion: "Viernes Tarde",
            participantes: [
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
                { rol: "Oración Final", nombre: "Pedro Mora" },
            ]
        },
        {
            sesion: "Sábado Mañana",
            participantes: [
                { rol: "Presidente", nombre: "Abel Reguant" },
                { rol: "Oración", nombre: "Ricardo Cordovilla" },
                { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL ¿Qué buscan?", hora: "9:40", numero: 19 },
                { rol: "Discursante", nombre: "Las buenas noticias según Jesús (Episodio 2).", hora: "9:50", numero: 20 },
                { rol: "Discursante", nombre: "Gabriel Quintana", hora: "10:30", numero: 21 },
                { rol: "Discursante", nombre: "Manuel Casino", hora: "10:40", numero: 22 },
                { rol: "Discursante", nombre: "Esteban Martín", hora: "10:49", numero: 23 },
                { rol: "Discursante", nombre: "Kevin Adiel Cobo (Betel)", hora: "10:59", numero: 24 },
                { rol: "Discursante", nombre: "Rubén Verdés", hora: "11:09", numero: 25 },
                { rol: "Discursante", nombre: "David Mercader", hora: "11:17", numero: 26 },
                { rol: "Discursante", nombre: "Daniel Sellares", hora: "11:25", numero: 27 },
                { rol: "Discursante", nombre: "Natán Becerril", hora: "11:34", numero: 28 },
            ]
        },
        {
            sesion: "Sábado Tarde",
            participantes: [
                { rol: "Presidente", nombre: "Climent Ambrós" },
                { rol: "Discursante", nombre: "Jonatán Vicente", hora: "13:50", numero: 29 },
                { rol: "Discursante", nombre: "Santiago Sáez", hora: "14:00", numero: 30 },
                { rol: "Discursante", nombre: "Ricardo Anguita", hora: "14:09", numero: 31 },
                { rol: "Discursante", nombre: "Josué Rabaneda", hora: "14:20", numero: 32 },
                { rol: "Discursante", nombre: "Edgar Teruel (Betel)", hora: "14:45", numero: 33 },
                { rol: "Discursante", nombre: "Álvaro Paniagua", hora: "14:56", numero: 34 },
                { rol: "Discursante", nombre: "Adolfo Forniels", hora: "15:06", numero: 35 },
                { rol: "Discursante", nombre: "Alfonso Guerrero", hora: "15:30", numero: 36 },
                { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "16:00", numero: 37 },
                { rol: "Oración Final", nombre: "Jairo José Galán" },
            ]
        },
        {
            sesion: "Domingo Mañana",
            participantes: [
                { rol: "Presidente", nombre: "Juan Alcaraz" },
                { rol: "Oración", nombre: "José Diego" },
                { rol: "Discursante", nombre: "Isaac Díaz", hora: "9:40", numero: 38 },
                { rol: "Discursante", nombre: "Benjamín Ferrer", hora: "9:55", numero: 39 },
                { rol: "Discursante", nombre: "Francisco Javier Vila", hora: "10:07", numero: 40 },
                { rol: "Discursante", nombre: "Joseph Salazar", hora: "10:21", numero: 41 },
                { rol: "Discursante", nombre: "Fernando Teruel", hora: "10:35", numero: 42 },
                { rol: "Discursante", nombre: "Por Asignar", hora: "10:49", numero: 43 },
                { rol: "Discursante", nombre: "José Manuel Lara", hora: "11:15", numero: 44 },
                { rol: "Discursante", nombre: "Nino Llopis", hora: "11:45", numero: 45 },
            ]
        },
        {
            sesion: "Domingo Tarde",
            participantes: [
                { rol: "Presidente", nombre: "Julian Lasheras" },
                { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL", hora: "13:50", numero: 46 },
                { rol: "Discursante", nombre: "Julian Lasheras", hora: "14:45", numero: 47 },
                { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "14:54", numero: 48 },
                { rol: "Oración Final", nombre: "Andres Mayor (Betel)" },
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
        accordionItem.dataset.rol = participante.rol;
        // --- MODIFICACIÓN: Guardar nombre para acceder a él fácilmente ---
        accordionItem.dataset.nombre = participante.nombre;

        const header = document.createElement('button');
        header.className = 'accordion-header';

        // --- MODIFICACIÓN: Lógica para casos especiales ---
        const esProduccion = participante.nombre.includes('PRODUCCIÓN AUDIOVISUAL');
        const esBetel = participante.nombre.includes('(Betel)');
        const esOracion = participante.rol.includes('Oración');

        const itemsParaOcultarOracion = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
        const itemsParaOcultarBetel = ['orientacion', 'recordatorios'];
        
        let indicatorsHTML = '';
        let showChevron = true;

        if (esProduccion) {
            // Sin indicadores ni botón de expandir para la producción audiovisual
            showChevron = false;
        } else {
            // Generar indicadores filtrando los casos especiales
            indicatorsHTML = itemsChecklist
                .filter(item => {
                    if (!item.indicator) return false;
                    if (esOracion && itemsParaOcultarOracion.includes(item.id)) return false;
                    if (esBetel && itemsParaOcultarBetel.includes(item.id)) return false;
                    return true;
                })
                .map(item => `<span class="indicator" data-indicator-for="${item.id}"></span>`)
                .join('');
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
                ${showChevron ? '<i class="fas fa-chevron-down accordion-icon"></i>' : ''}
            </div>`;

        const content = document.createElement('div');
        content.className = 'accordion-content';

        // --- MODIFICACIÓN: No crear checklist si es una producción audiovisual ---
        if (!esProduccion) {
            const checklistContainer = document.createElement('div');
            checklistContainer.className = 'checklist-container';

            itemsChecklist.forEach(item => {
                // Aplicar filtros para no crear los items que no aplican
                if (esOracion && itemsParaOcultarOracion.includes(item.id)) return;
                if (esBetel && itemsParaOcultarBetel.includes(item.id)) return;

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

                        radioInput.addEventListener('mousedown', function() { this.dataset.wasChecked = this.checked; });
                        radioInput.addEventListener('click', function() {
                            if (this.dataset.wasChecked === 'true') {
                                this.checked = false;
                                this.dataset.wasChecked = 'false';
                                this.dispatchEvent(new Event('change', { bubbles: true }));
                            } else {
                                this.dataset.wasChecked = 'true';
                            }
                        });

                        radioGroup.appendChild(radioInput);
                        radioGroup.appendChild(radioLabel);
                    });
                    itemDiv.appendChild(radioGroup);
                }
                checklistContainer.appendChild(itemDiv);
            });
            content.appendChild(checklistContainer);
        }

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

        // --- MODIFICACIÓN: Lógica para casos especiales ---
        const nombre = accordionItem.dataset.nombre || '';
        const esProduccion = nombre.includes('PRODUCCIÓN AUDIOVISUAL');

        if (esProduccion) {
            accordionItem.style.setProperty('--progress-percent', '0%');
            accordionItem.classList.remove('is-complete');
            return; // No hacer nada más para la producción audiovisual
        }
        
        const rol = accordionItem.dataset.rol;
        const esBetel = nombre.includes('(Betel)');
        const esOracion = rol && rol.includes('Oración');
        const itemsParaOcultarOracion = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios'];
        const itemsParaOcultarBetel = ['orientacion', 'recordatorios'];

        const makeupRadio = accordionItem.querySelector('input[data-item-id="maquillaje"]:checked');
        const repasoContainer = accordionItem.querySelector('[data-container-for="repaso_maquillaje"]');
        const esMaquillajeNoAplicable = makeupRadio && makeupRadio.value === 'N/A';

        if (repasoContainer) {
            const repasoInput = repasoContainer.querySelector('input');
            if(repasoInput) {
                repasoContainer.classList.toggle('disabled', esMaquillajeNoAplicable);
                repasoInput.disabled = esMaquillajeNoAplicable;
                if (esMaquillajeNoAplicable && repasoInput.checked) {
                    repasoInput.checked = false;
                    repasoInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }

        // --- MODIFICACIÓN: Calcular total de items considerando los casos especiales ---
        const totalItemsConsiderados = itemsChecklist.filter(item => {
            if (esOracion && itemsParaOcultarOracion.includes(item.id)) return false;
            if (esBetel && itemsParaOcultarBetel.includes(item.id)) return false;
            if (esMaquillajeNoAplicable && item.id === 'repaso_maquillaje') return false;
            return true;
        }).length;

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
            indicator.className = 'indicator';
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
            await setDoc(docRef, { [itemId]: value }, { merge: true });
        } catch (error) {
            console.error("❌ Error guardando en Firebase:", error);
            alert("Error de conexión. No se pudo guardar el cambio.");
        }
    }

    function syncStateFromFirebase() {
        const docRefs = {};
        programa.forEach(sesion => {
            sesion.participantes.forEach(p => {
                const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${p.nombre.replace(/\s+/g, '-')}-${p.rol.replace(/\s+/g, '-')}`;
                docRefs[idUnico] = doc(db, "tareas", idUnico);
                
                setDoc(docRefs[idUnico], { id: idUnico }, { merge: true });

                onSnapshot(docRefs[idUnico], (docFB) => {
                    if (!docFB.exists()) return;

                    const taskData = docFB.data();
                    const accordionItem = document.querySelector(`.participant-accordion[data-id="${idUnico}"]`);
                    if (accordionItem) {
                        // No intentar sincronizar items para la producción audiovisual ya que no tiene
                        if (accordionItem.dataset.nombre.includes('PRODUCCIÓN AUDIOVISUAL')) {
                            actualizarEstadoUI(accordionItem);
                            updateSummary();
                            return;
                        }

                        Object.keys(taskData).forEach(itemId => {
                            if (itemId === 'id') return;

                            const value = taskData[itemId];
                            const checkbox = accordionItem.querySelector(`input[data-item-id="${itemId}"][type="checkbox"]`);
                            if (checkbox) {
                                if (checkbox.checked !== value) checkbox.checked = value;
                            } else {
                                const radios = accordionItem.querySelectorAll(`input[data-item-id="${itemId}"]`);
                                radios.forEach(radio => {
                                    const shouldBeChecked = radio.value === value;
                                    if (radio.checked !== shouldBeChecked) {
                                        radio.checked = shouldBeChecked;
                                    }
                                    radio.dataset.wasChecked = shouldBeChecked.toString();
                                });
                            }
                        });
                        actualizarEstadoUI(accordionItem);
                        updateSummary();
                    }
                }, error => {
                    console.error(`Error en la sincronización para ${idUnico}:`, error);
                });
            });
        });
    }

    // --- MANEJADORES DE EVENTOS ---
    function setupEventListeners() {
        programContainer.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (header) {
                const accordionItem = header.closest('.participant-accordion');
                // No expandir si es una producción audiovisual
                if (accordionItem && accordionItem.dataset.nombre.includes('PRODUCCIÓN AUDIOVISUAL')) {
                    return;
                }
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
                
                if (input.type === 'checkbox') {
                    saveStateToFirebase(uniqueId, itemId, input.checked);
                } 
                else if (input.type === 'radio') {
                    const checkedRadio = accordionItem.querySelector(`input[name="${input.name}"]:checked`);
                    const value = checkedRadio ? checkedRadio.value : null;
                    saveStateToFirebase(uniqueId, itemId, value);
                }
            }
        });

        navContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.nav-button');
            if (button && !button.classList.contains('active')) {
                navContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
                const dayForId = button.dataset.day;
                const dayForClass = dayForId.toLowerCase().replace('á', 'a');
                document.body.className = `day-${dayForClass}`;
                document.body.style.backgroundColor = '';
                document.querySelectorAll('.day-content').forEach(c => c.classList.add('hidden'));
                document.getElementById(`content-${dayForId}`).classList.remove('hidden');
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
        document.body.className = 'day-viernes';
        document.body.style.backgroundColor = ''; 

        generarProgramaHTML();
        setupEventListeners();
        syncStateFromFirebase(); 
    }

    function init() {
        if (localStorage.getItem(SESSION_KEY) === 'true') {
            startApp();
        } else {
            loginScreen.classList.remove('hidden');
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (passwordInput.value === contraseñaCorrecta) {
                localStorage.setItem(SESSION_KEY, 'true');
                startApp();
            } else {
                loginError.classList.remove('hidden');
                loginError.textContent = "Contraseña incorrecta. Inténtalo de nuevo.";
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    init();
});
