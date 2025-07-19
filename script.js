// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
sidente del programa entrará y saldrá por la derecha cuando use el micrófono de pie. Solo en los inicios de sesión, cuando presenta desde el atril, saldrá por la izquierda."
        ]
      }
    ]
  },
  


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
    const ocOra = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios', 'presentado', 'recogida'];
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
    const ocultaParaOracion = ['maquillaje', 'repaso_maquillaje', 'orientacion', 'recordatorios', 'presentado', 'recogida'];
    const ocultaParaBetel = ['orientacion', 'recordatorios'];
    
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
            repasoMaquillajeInput.checked = false;
            repasoMaquillajeInput.disabled = true;
            repasoMaquillajeContainer.classList.add('disabled-item');
        } else {
            repasoMaquillajeInput.disabled = false;
            repasoMaquillajeContainer.classList.remove('disabled-item');
        }
    }

    const itemsAplicables = itemsChecklist.filter(it => 
        !(esOra && ocultaParaOracion.includes(it.id)) && 
        !(esBetel && ocultaParaBetel.includes(it.id)) && 
        !(it.id === 'repaso_maquillaje' && (maquillajeValue === 'No' || maquillajeValue === 'N/A'))
    );
    
    let completedTasks = 0;
    const checkedItems = new Set();
    accordion.querySelectorAll('input[data-item-id]:checked').forEach(input => {
        const itemId = input.dataset.itemId;
        if (itemId === 'repaso_maquillaje' && (maquillajeValue === 'No' || maquillajeValue === 'N/A')) {
            // No cuenta
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
        <div class="summary-item"><div class="count">${conMaquillaje + yaMaquillados}</div><div class="label">Maquillaje</div></div>`;
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
