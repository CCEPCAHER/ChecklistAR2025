document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN PRINCIPAL ---
    const contraseñaCorrecta = "programa2025";
    const appStateKey = 'programaChecklistState_v2';

    const programa = [
        // ... (El contenido del programa es el mismo)
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
    // --- FIN DE LA CONFIGURACIÓN ---

    // ... (Variables del DOM sin cambios)
    const programContainer = document.getElementById('program-container');
    const navContainer = document.getElementById('day-nav');
    const summaryPanel = document.getElementById('summary-panel');


    function crearAcordeon(participante, idUnico) {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'participant-accordion';
        accordionItem.dataset.id = idUnico;

        const header = document.createElement('button');
        header.className = 'accordion-header';
        
        // **NUEVO:** Genera los spans para los indicadores
        let indicatorsHTML = itemsChecklist
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
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'accordion-content';

        itemsChecklist.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item';
            // **NUEVO:** Añade un data attribute para encontrar este item fácilmente
            itemDiv.dataset.containerFor = item.id;
            itemDiv.innerHTML = `<i class="icon ${item.icon}"></i>`;
            
            const label = document.createElement('label');
            label.textContent = item.texto;
            itemDiv.appendChild(label);

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
                    radioGroup.appendChild(radioInput);
                    radioGroup.appendChild(radioLabel);
                });
                itemDiv.appendChild(radioGroup);
            }
            content.appendChild(itemDiv);
        });
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-bar-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        content.appendChild(progressContainer);
        progressContainer.appendChild(progressBar);
        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        return accordionItem;
    }

    // --- FUNCIÓN DE ACTUALIZACIÓN PRINCIPAL (MODIFICADA) ---
    function actualizarEstado(accordionItem) {
        // --- 1. Lógica condicional para Maquillaje ---
        const makeupRadio = accordionItem.querySelector('input[data-item-id="maquillaje"]:checked');
        const repasoContainer = accordionItem.querySelector('[data-container-for="repaso_maquillaje"]');
        const repasoInput = repasoContainer.querySelector('input');
        
        let esMaquillajeNA = makeupRadio && makeupRadio.value === 'N/A';
        if (esMaquillajeNA) {
            repasoContainer.classList.add('disabled');
            repasoInput.checked = false; // Desmarcar si se vuelve N/A
            repasoInput.disabled = true;
        } else {
            repasoContainer.classList.remove('disabled');
            repasoInput.disabled = false;
        }

        // --- 2. Actualizar Indicadores de Estado en el Header ---
        accordionItem.querySelectorAll('.indicator').forEach(indicator => {
            const itemId = indicator.dataset.indicatorFor;
            const input = accordionItem.querySelector(`input[data-item-id="${itemId}"]`);

            // Limpiar clases de color anteriores
            indicator.className = 'indicator';

            if (input.type === 'checkbox' && input.checked) {
                indicator.classList.add(itemId);
            } else if (input.type === 'radio') {
                const checkedRadio = accordionItem.querySelector(`input[name="${input.name}"]:checked`);
                if (checkedRadio) {
                    const valueClass = `maquillaje-${checkedRadio.value.toLowerCase()}`;
                    indicator.classList.add(valueClass);
                }
            }
        });

        // --- 3. Calcular y Actualizar Progreso ---
        let totalItems = itemsChecklist.length;
        if (esMaquillajeNA) {
            totalItems--; // Si es N/A, hay un item menos que completar
        }

        let completados = 0;
        const itemsRevisados = {};
        accordionItem.querySelectorAll('input[data-item-id]').forEach(input => {
            if (input.disabled) return; // No contar items deshabilitados
            const itemId = input.dataset.itemId;
            if (itemsRevisados[itemId]) return;
            if (input.type === 'checkbox' ? input.checked : accordionItem.querySelector(`input[name="${input.name}"]:checked`)) {
                completados++;
            }
            itemsRevisados[itemId] = true;
        });
        
        const porcentaje = totalItems > 0 ? (completados / totalItems) * 100 : 0;
        const progressBar = accordionItem.querySelector('.progress-bar');
        const header = accordionItem.querySelector('.accordion-header');
        
        progressBar.style.width = `${porcentaje}%`;
        header.classList.toggle('completed', porcentaje === 100);
        progressBar.classList.toggle('completed', porcentaje === 100);
    }

    // El resto de funciones (init, saveState, loadState, etc.) permanecen igual.
    // Solo necesitamos asegurarnos de que la llamada a actualizarEstado lo gestione todo.
    // ... (El resto del código de la v4 se mantiene igual)
    function init() {
        const pass = prompt("Por favor, introduce la contraseña:");
        if (pass === contraseñaCorrecta) {
            document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
            generarPrograma();
            setupNavigation();
            loadState(); 
        } else {
            alert("Contraseña incorrecta.");
        }
    }
    function saveState() {
        const state = {};
        document.querySelectorAll('.participant-accordion').forEach(acc => {
            const id = acc.dataset.id;
            state[id] = {};
            acc.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
                if (input.type === 'checkbox') {
                    state[id][input.id] = input.checked;
                } else if (input.type === 'radio' && input.checked) {
                    state[id][input.name] = input.value;
                }
            });
        });
        localStorage.setItem(appStateKey, JSON.stringify(state));
    }
    function loadState() {
        const state = JSON.parse(localStorage.getItem(appStateKey));
        if (!state) {
            updateAll();
            return;
        }
        Object.keys(state).forEach(id => {
            Object.keys(state[id]).forEach(inputId => {
                const value = state[id][inputId];
                const input = document.getElementById(inputId);
                if (input) {
                    if (input.type === 'checkbox') input.checked = value;
                } else { 
                    const radioWithValue = document.querySelector(`input[name="${inputId}"][value="${value}"]`);
                    if (radioWithValue) radioWithValue.checked = true;
                }
            });
        });
        updateAll();
    }
    function updateAll() {
        document.querySelectorAll('.participant-accordion').forEach(acc => actualizarEstado(acc));
        updateSummary();
    }
    function updateSummary() {
        const diaActual = navContainer.querySelector('.active').dataset.day;
        const containerActual = document.getElementById(`content-${diaActual}`);
        if (!containerActual) return;
        const total = containerActual.querySelectorAll('.participant-accordion').length;
        let completados = 0;
        let maquillajeSi = 0;
        containerActual.querySelectorAll('.participant-accordion').forEach(acc => {
            if (acc.querySelector('.accordion-header.completed')) {
                completados++;
            }
            const makeupRadio = acc.querySelector('input[data-item-id="maquillaje"][value="Sí"]:checked');
            if (makeupRadio) {
                maquillajeSi++;
            }
        });
        summaryPanel.innerHTML = `
            <div class="summary-item"><div class="count">${total}</div><div class="label">Participantes del Día</div></div>
            <div class="summary-item"><div class="count">${completados}</div><div class="label">Checklists Completos</div></div>
            <div class="summary-item"><div class="count">${maquillajeSi}</div><div class="label">Requieren Maquillaje</div></div>`;
        document.title = `(${completados}/${total}) Checklist ${diaActual}`;
    }
    function setupNavigation() {
        navContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.nav-button');
            if (button) {
                navContainer.querySelector('.active').classList.remove('active');
                button.classList.add('active');
                document.querySelectorAll('.day-content').forEach(c => c.classList.add('hidden'));
                document.getElementById(`content-${button.dataset.day}`).classList.remove('hidden');
                updateSummary();
            }
        });
    }
    function addEventListeners() {
        programContainer.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', (e) => {
                if(e.target.closest('.status-indicators')) return;
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                content.classList.toggle('active');
                content.style.maxHeight = content.classList.contains('active') ? content.scrollHeight + "px" : null;
            });
        });
        programContainer.addEventListener('change', (e) => {
            if (e.target.matches('input')) {
                const accordionItem = e.target.closest('.participant-accordion');
                actualizarEstado(accordionItem);
                saveState();
                updateSummary();
            }
        });
    }
    function generarPrograma() {
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
                sesion.participantes.forEach((participante, index) => {
                    const idUnico = `${sesion.sesion.replace(/\s+/g, '-')}-${index}`;
                    sessionBlock.appendChild(crearAcordeon(participante, idUnico));
                });
                dayContainer.appendChild(sessionBlock);
            });
            programContainer.appendChild(dayContainer);
        });
        document.getElementById('content-Viernes').classList.remove('hidden');
        addEventListeners();
    }
    
    init();

});
