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

// --- NUEVA DATA: HORARIO COMPLETO DEL PROGRAMA (basado en tu JSON) ---
const horarioProgramaCompleto = [
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "08:00:00",
    "Título": "Mostrar el tema del día de la asamblea regional: “Adora a Jehová tu Dios” (Mateo 4:10).",
    "Orador": null,
    "Micrófono pie derecho": "Microfono  de pie derecha",
    "Atril": "Atril"
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "09:30:00",
    "Título": "Canción 74",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "09:40:00",
    "Título": "¿Qué es la adoración pura?",
    "Orador": "Julián Lasheras",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión invita al público a sentarse"
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "10:10:00",
    "Título": "Las buenas noticias según Jesús: Episodio 2. \"Este es mi Hijo\" (parte 1)",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Comienza la cuenta regresiva del video"
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "10:40:00",
    "Título": "Canción 122",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta el video musical. Permanece sentado en plataforma."
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "11:11:00",
    "Título": "Descendiente del rey David",
    "Orador": "Pedro Medina",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "11:28:00",
    "Título": "Ungido para ser \"el Mesías, el Líder\"",
    "Orador": "Daniel Velasco",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta la canción 74 y la oración de apertura"
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "11:45:00",
    "Título": "¿Quién es realmente el gobernante del mundo?",
    "Orador": "Álex Botella",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, oración por: "
  },
  {
    "Día": "VIERNES MAÑANA",
    "Hora": "12:15:00",
    "Título": "Canción 22",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta el discurso núm.1"
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": null,
    "Atril": "DISCURSO DEL PRESIDENTE: DE LA ASAMBLEA: "
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "13:45:00",
    "Título": "Canción 121",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Al salir el orador, pongan la imagen con el título del discurso. Cuando el aplauso disminuya, pongan el video de 30 mins. (Discurso núm. 2). El presidente de sesión no sale a la plataforma."
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "13:50:00",
    "Título": "Apoyémonos en la Palabra de Dios",
    "Orador": "Miguel Solé",
    "Micrófono pie derecho": null,
    "Atril": "PRODUCCIÓN AUDIOVISUAL: "
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "14:06:00",
    "Título": "No pongamos a prueba a Jehová",
    "Orador": "David Aleixandri",
    "Micrófono pie derecho": "Desde el micrófono de pie a la derecha de la plataforma, el presidente de sesión presenta la canción 122",
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "14:22:00",
    "Título": "Adoremos solo a Jehová",
    "Orador": "David Maldonado",
    "Micrófono pie derecho": "El presidente de sesión hace los anuncios y presenta el video ¿Qué tienes que hacer para servir en Betel? (fragmento)",
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "14:36:00",
    "Título": "Defendamos la verdad",
    "Orador": "Juan Martín Prior",
    "Micrófono pie derecho": "El presidente de sesión presenta el discurso núm. 3",
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "14:50:00",
    "Título": "Canción 97",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: “¡Las profecías sobre el Mesías se cumplieron! (Parte 1)”"
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:00:00",
    "Título": "El desierto de Judea",
    "Orador": "Elliot Miguel",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 4."
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:12:00",
    "Título": "El valle del Jordán",
    "Orador": "José Bonet",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: “¡Las profecías sobre el Mesías se cumplieron! (Parte 1)”"
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:21:00",
    "Título": "Jerusalén",
    "Orador": "Santiago Cardona",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 5"
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:30:00",
    "Título": "Samaria",
    "Orador": "Israel Malla",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: “¡Las profecías sobre el Mesías se cumplieron! (Parte 1)”"
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:39:00",
    "Título": "Galilea",
    "Orador": "Bárbaro Yuliexi Tejera Ríos",
    "Micrófono pie derecho": "El presidente de sesión presenta el discurso núm. 6",
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:48:00",
    "Título": "Fenicia",
    "Orador": "Rafael Corral",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "15:58:00",
    "Título": "Siria",
    "Orador": "Míchel Gottardo",
    "Micrófono pie derecho": "El presidente de sesión presenta la canción 22",
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "16:10:00",
    "Título": "¿Qué ve Jesús en cada uno de nosotros?",
    "Orador": "Ándres Mayor (Betel)",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "VIERNES TARDE",
    "Hora": "16:45:00",
    "Título": "Canción 34",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": "Microfono  de pie derecha",
    "Atril": "Atril"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "08:00:00",
    "Título": "Mostrar el tema del día de la asamblea regional: “La devoción que siento por tu casa arderá en mi interior\" (Juan 2:17)",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión invita al público a sentarse"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "09:30:00",
    "Título": "Canción 93",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Comienza la cuenta regresiva del video"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "09:40:00",
    "Título": "\"¿Qué buscan?\"",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta el video musical. Permanece sentado en plataforma."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "09:50:00",
    "Título": "Las buenas noticias según Jesús: Episodio 2. \"Este es mi Hijo\" (parte 2)",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "10:20:00",
    "Título": "Canción 54",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta la canción 121."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "10:30:00",
    "Título": "Juan el Bautista",
    "Orador": "Gabriel Quintana",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta el discurso núm. 7."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "10:40:00",
    "Título": "Andrés",
    "Orador": "Manuel Casino",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Imitemos a Jesús cuando Satanás nos tiente."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "10:49:00",
    "Título": "Pedro",
    "Orador": "Esteban Martín",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 8"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "10:59:00",
    "Título": "Juan",
    "Orador": "Kevin Adiel Cobo (Betel)",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Imitemos a Jesús cuando Satanás nos tiente."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "11:09:00",
    "Título": "Santiago",
    "Orador": "Rubén Verdés",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 9"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "11:17:00",
    "Título": "Felipe",
    "Orador": "David Mercader",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Imitemos a Jesús cuando Satanás nos tiente."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "11:25:00",
    "Título": "Natanael",
    "Orador": "Daniel Sellarés",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 10"
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "11:34:00",
    "Título": "DISCURSO DE BAUTISMO: El significado de su bautismo”",
    "Orador": "Natán Becerril",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Imitemos a Jesús cuando Satanás nos tiente."
  },
  {
    "Día": "SÁBADO MAÑANA",
    "Hora": "12:05:00",
    "Título": "Canción 52",
    "Orador": null,
    "Micrófono pie derecho": "El presidente de sesión presenta la canción 97",
    "Atril": null
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": "el presidente de sesión hace los anuncios y presenta el discurso núm. 11.",
    "Atril": null
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "13:45:00",
    "Título": "Canción 36",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "13:50:00",
    "Título": "... a ser compasivos",
    "Orador": "Jonatán Vicente",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 12"
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "14:00:00",
    "Título": "... a ser humildes",
    "Orador": "Santiago Sáez",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "14:09:00",
    "Título": "... a ser generosos",
    "Orador": "Ricardo Anguita",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 13"
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "14:20:00",
    "Título": "¿Cómo quita el pecado \"el Cordero de Dios\"?",
    "Orador": "Josué Rabaneda",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "14:45:00",
    "Título": "La devoción por la casa de Jehová ardió en su interior",
    "Orador": "Edgar Teruel (Betel)",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 14"
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "14:56:00",
    "Título": "Anunció \"buenas noticias a los mansos\"",
    "Orador": "Álvaro Paniagua",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "15:06:00",
    "Título": "\"Una gran luz\" brilló en Galilea",
    "Orador": "Adolfo Fornieles",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 15"
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "15.20",
    "Título": "Canción 117",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "15.30",
    "Título": "\"¡Quiten todo esto de aquí!\"",
    "Orador": "Alfonso Guerrero",
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 16"
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "16:00:00",
    "Título": "\"Lo levantaré\"",
    "Orador": "Andrés Mayor (Betel)",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "SÁBADO TARDE",
    "Hora": "16:35:00",
    "Título": "Canción 35",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "El orador presenta el discurso núm. 17"
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": null,
    "Atril": "SERIE DE DISCURSOS: Lecciones sobre la tierra en la que vivió Jesús. "
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "08:00:00",
    "Título": "Mostrar el tema del día de la asamblea regional: “Lo adorarán con espíritu y con verdad” (Juan 4:23)",
    "Orador": null,
    "Micrófono pie derecho": "Desde el micrófono de pie a la derecha de la plataforma, el presidente de sesión presenta el discurso núm. 18.",
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "09:30:00",
    "Título": "Canción 140",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "09:40:00",
    "Título": "Nacer \"del agua y del espíritu\"",
    "Orador": "Isaac Díaz",
    "Micrófono pie derecho": "el presidente de sesión presenta la canción 34 y la oración de conclusión",
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "09:55:00",
    "Título": "\"Ningún hombre ha subido al cielo\"",
    "Orador": "Benjamín Ferrer",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, oración por: "
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "10:07:00",
    "Título": "Ir \"a la luz\"",
    "Orador": "Francisco Javier Villa",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "10:21:00",
    "Título": "\"Ese soy yo\"",
    "Orador": "Joseph Salazar",
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "10:35:00",
    "Título": "\"Mi alimento\"",
    "Orador": "Fernando Teruel",
    "Micrófono pie derecho": "Microfono  de pie derecha",
    "Atril": "Atril"
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "10:49:00",
    "Título": "\"Los campos están blanos, listos para la cosecha\"",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "11:05:00",
    "Título": "Canción 37",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión invita al público a sentarse"
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "11:15:00",
    "Título": "DISCURSO PÚBLICO: ¿Sabe en qué se basan sus creencias?",
    "Orador": "José Manuel Lara",
    "Micrófono pie derecho": null,
    "Atril": "Comienza la cuenta regresiva del video"
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "11:45:00",
    "Título": "Resumen de La Atalaya ",
    "Orador": "Nino Llopis",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta el video musical. Permanece sentado en plataforma."
  },
  {
    "Día": "DOMINGO MAÑANA",
    "Hora": "12:15:00",
    "Título": "Canción 61",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "Hora",
    "Título": "Título del discurso - Canción",
    "Orador": "Presidente/Orador",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, el presidente de sesión presenta la canción 93 y la oración de apertura"
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "13:34:00",
    "Título": " ",
    "Orador": "Julián Lasheras",
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, oración por: "
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "13:45:00",
    "Título": "Canción 77",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "Desde el atril, er presidense\n de sesión pres\n canción 77"
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "13:50:00",
    "Título": "Las buenas noticias según Jesús: Episodio 3. \"Ese soy yo\"",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "14:35:00",
    "Título": "Canción 20",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": null
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "14:45:00",
    "Título": "¿Qué hemos aprendido? ",
    "Orador": null,
    "Micrófono pie derecho": null,
    "Atril": "PRODUCCIÓN AUDIOVISUAL: "
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "14:55:00",
    "Título": "¡Permanezcamos en el gran templo espiritual de Jehová!",
    "Orador": "Andrés Mayor (Betel)",
    "Micrófono pie derecho": "El presidente de sesión presenta la canción 54",
    "Atril": null
  },
  {
    "Día": "DOMINGO TARDE",
    "Hora": "15:45:00",
    "Título": "Canción de conclusión",
    "Orador": null,
    "Micrófono pie derecho": "El presidente de sesión hace anuncios y presenta el video Solicite ir a la Escuela para Evangelizadores del Reino (fragmento)",
    "Atril": null
  }
];


// --- NUEVA DATA: RESPONSABLES DE TURNO ---
const dataResponsables = [
  {
    "Día": "Viernes",
    "Turno": "Mañana",
    "Comunicación AV": "Manel Casino",
    "Atrezzo/Crono": "Rubén Gomez",
    "Atril": "Javier Bolivar",
    "Recepción y Enlace": "Juan Carlos Marín",
    "Maquillaje": "Inma C., Vanessa C., Raquel P.",
    "Maquillaje Plataforma": "Gemma Monje"
  },
  {
    "Día": "Viernes",
    "Turno": "Tarde",
    "Comunicación AV": "Rafael Monje",
    "Atrezzo/Crono": "Adriá Rivera",
    "Atril": "Alejandro Hernandez",
    "Recepción y Enlace": "Luis Fernando Paz",
    "Maquillaje": "Ana M., Sandra O., Gemma M.",
    "Maquillaje Plataforma": "Raquel Pallares"
  },
  {
    "Día": "Sábado",
    "Turno": "Mañana",
    "Comunicación AV": "Rafael Monje",
    "Atrezzo/Crono": "Adriá Rivera",
    "Atril": "Mario Martín",
    "Recepción y Enlace": "Luis Fernando Paz",
    "Maquillaje": "Gemma M., Inma C., Sandra O.",
    "Maquillaje Plataforma": "Ana Marañón"
  },
  {
    "Día": "Sábado",
    "Turno": "Tarde",
    "Comunicación AV": "Manel Casino",
    "Atrezzo/Crono": "Rubén Gomez",
    "Atril": "Javier Bolivar",
    "Recepción y Enlace": "Juan Carlos Marín",
    "Maquillaje": "Vanessa C., Raquel P., Ana M.",
    "Maquillaje Plataforma": "Sandra Ortega"
  },
  {
    "Día": "Domingo",
    "Turno": "Mañana",
    "Comunicación AV": "Manel Casino",
    "Atrezzo/Crono": "Rubén Gomez",
    "Atril": "Alejandro Hernandez",
    "Recepción y Enlace": "Juan Carlos Marín",
    "Maquillaje": "Ana M., Sandra O., Vanessa C.",
    "Maquillaje Plataforma": "Inma Casino"
  },
  {
    "Día": "Domingo",
    "Turno": "Tarde",
    "Comunicación AV": "Rafael Monje",
    "Atrezzo/Crono": "Adriá Rivera",
    "Atril": "Mario Martín",
    "Recepción y Enlace": "Luis Fernando Paz",
    "Maquillaje": "Gemma C., Ana M., Raquel P.",
    "Maquillaje Plataforma": "Vanessa Intriago"
  }
];


// --- ELEMENTOS DEL DOM ---
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');
const appContainer = document.getElementById('app-container');
const logoutButton = document.getElementById('logout-button');
const navContainer = document.getElementById('day-nav'); // Ahora contiene todos los botones de navegación
const programContainer = document.getElementById('program-container'); // Contenedor del checklist
const summaryPanel = document.getElementById('summary-panel');
const horariosContainer = document.getElementById('horarios-container'); // Contenedor de la tabla de horarios
const horariosContent = document.getElementById('horarios-content'); // Contenido de la tabla de horarios
const responsablesContainer = document.getElementById('responsables-container'); // Contenedor de la tabla de responsables
const responsablesContent = document.getElementById('responsables-content'); // Contenido de la tabla de responsables
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
    const maquillajeRadio = accordion.querySelector('input[data-item-id="maquillaje"][value="Sí"]:checked');
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
    horariosContent.innerHTML = ''; // Limpiar contenido anterior
    const diasOrden = ['Viernes', 'Sábado', 'Domingo'];

    diasOrden.forEach(diaKey => {
        // Filter by the actual 'Día' field in data, which includes "MAÑANA" or "TARDE"
        const diaData = horarioProgramaCompleto.filter(item => item['Día'] && item['Día'].startsWith(diaKey.toUpperCase()));
        if (diaData.length > 0) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'horario-day-section';
            dayDiv.id = `horario-${diaKey.toLowerCase()}`;
            dayDiv.innerHTML = `<h2>${diaKey}</h2>`;

            const sesionesDia = {};
            // Agrupar por "sesión" (Mañana/Tarde) basándose en el nombre del día
            diaData.forEach(item => {
                let sessionName = '';
                if (item['Día'].includes('MAÑANA')) {
                    sessionName = 'Mañana';
                } else if (item['Día'].includes('TARDE')) {
                    sessionName = 'Tarde';
                } else {
                    sessionName = 'General'; // Para casos que no especifiquen
                }
                
                if (!sesionesDia[sessionName]) {
                    sesionesDia[sessionName] = [];
                }
                sesionesDia[sessionName].push(item);
            });

            for (const sesionName in sesionesDia) {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'horario-session-block';
                sessionDiv.innerHTML = `<h3>${sesionName}</h3>`;

                const table = document.createElement('table');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Título del Discurso / Canción</th>
                            <th>Orador / Presidente</th>
                            <th>Micrófono Pie Derecho</th>
                            <th>Atril</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                const tbody = table.querySelector('tbody');

                sesionesDia[sesionName].forEach(item => {
                    // Only render rows with relevant information (omit header-only rows)
                    // Check if 'Hora' is not the literal string "Hora" or empty/null
                    if (item['Hora'] && item['Hora'] !== 'Hora') {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item['Hora'] ? item['Hora'].substring(0, 5) : ''}</td>
                            <td>${item['Título'] || ''}</td>
                            <td>${item['Orador'] || ''}</td>
                            <td>${item['Micrófono pie derecho'] !== null ? item['Micrófono pie derecho'] : ''}</td>
                            <td>${item['Atril'] !== null ? item['Atril'] : ''}</td>
                        `;
                        tbody.appendChild(row);
                    }
                });
                sessionDiv.appendChild(table);
                dayDiv.appendChild(sessionDiv);
            }
            horariosContent.appendChild(dayDiv);
        }
    });
}

/**
 * Genera y muestra la tabla de responsables de turno.
 */
function mostrarResponsablesDeTurno() {
    responsablesContent.innerHTML = ''; // Limpiar contenido anterior

    const diasOrden = ['Viernes', 'Sábado', 'Domingo'];

    diasOrden.forEach(diaKey => {
        const dayData = dataResponsables.filter(item => item['Día'] === diaKey);
        if (dayData.length > 0) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'responsables-day-section';
            dayDiv.id = `responsables-${diaKey.toLowerCase()}`;
            dayDiv.innerHTML = `<h2>${diaKey}</h2>`;

            const sesiones = ['Mañana', 'Tarde']; // Asumiendo mañana y tarde
            sesiones.forEach(sesionKey => {
                const sesionData = dayData.find(item => item['Turno'] === sesionKey);
                if (sesionData) {
                    const sesionDiv = document.createElement('div');
                    sesionDiv.className = 'responsables-session-block';
                    sesionDiv.innerHTML = `<h3>${sesionKey}</h3>`;

                    const ul = document.createElement('ul');
                    // Excluir 'Día' y 'Turno' de la lista
                    for (const rol in sesionData) {
                        if (rol !== 'Día' && rol !== 'Turno') {
                            const li = document.createElement('li');
                            let personas = sesionData[rol];
                            if (Array.isArray(personas)) {
                                personas = personas.join(', ');
                            }
                            li.innerHTML = `<strong>${rol}:</strong> ${personas}`;
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

    // Ocultar todas las secciones de contenido principales
    programContainer.classList.add('hidden');
    horariosContainer.classList.add('hidden');
    responsablesContainer.classList.add('hidden');
    summaryPanel.classList.add('hidden');

    // Ocultar todos los botones de día y desactivar todos los botones principales
    navContainer.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
        if (button.classList.contains('sub-day-button')) {
            button.classList.add('hidden');
        }
    });

    // Mostrar la vista y activar el botón principal correspondiente
    const mainViewButton = navContainer.querySelector(`.nav-button.main-view-button[data-view="${view}"]`);
    if (mainViewButton) {
        mainViewButton.classList.add('active');
    }

    if (view === 'checklist') {
        programContainer.classList.remove('hidden');
        summaryPanel.classList.remove('hidden');
        
        // Mostrar los botones de día para la vista de checklist
        navContainer.querySelectorAll('.nav-button.sub-day-button[data-view="checklist"]').forEach(button => {
            button.classList.remove('hidden');
        });
        // Activar el botón del día actual para checklist
        const currentChecklistDayButton = navContainer.querySelector(`.nav-button.sub-day-button[data-view="checklist"][data-day="${currentDay}"]`);
        if (currentChecklistDayButton) {
            currentChecklistDayButton.classList.add('active');
        }

        document.querySelectorAll('.day-content').forEach(d => d.classList.add('hidden'));
        document.getElementById(`content-${currentDay}`).classList.remove('hidden');
        setDayTheme(currentDay);
        updateSummary();
        document.title = `(${document.querySelectorAll('.participant-accordion.is-complete').length}/${document.querySelectorAll('.participant-accordion:not(.is-audiovisual)').length}) Checklist ${currentDay}`;
    } else if (view === 'horarios') {
        horariosContainer.classList.remove('hidden');
        
        // Mostrar los botones de día para la vista de horarios
        navContainer.querySelectorAll('.nav-button.sub-day-button[data-view="horarios"]').forEach(button => {
            button.classList.remove('hidden');
        });
        // Activar el botón del día actual para horarios
        const currentHorariosDayButton = navContainer.querySelector(`.nav-button.sub-day-button[data-view="horarios"][data-day="${currentDay}"]`);
        if (currentHorariosDayButton) {
            currentHorariosDayButton.classList.add('active');
        }
        
        mostrarHorarioCompleto();
        // Ocultar todas las secciones de día dentro de horarios y mostrar solo la actual
        document.querySelectorAll('.horario-day-section').forEach(d => d.classList.add('hidden'));
        document.getElementById(`horario-${currentDay.toLowerCase()}`).classList.remove('hidden');
        
        setDayTheme(currentDay);
        document.title = `Horario del Programa - ${currentDay}`;
    } else if (view === 'responsables') {
        responsablesContainer.classList.remove('hidden');
        mostrarResponsablesDeTurno();
        setDayTheme('Viernes'); // Puedes elegir un tema por defecto o neutral
        document.title = `Responsables de Turno`;
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
        const newDay = button.dataset.day;

        // Lógica para botones de vista principales (Checklist, Horarios, Responsables)
        if (button.classList.contains('main-view-button')) {
            changeAppView(newView);
        } 
        // Lógica para botones de día secundarios (Viernes, Sábado, Domingo)
        else if (button.classList.contains('sub-day-button')) {
            // Asegurarse de que el día sea para la vista activa (checklist o horarios)
            if (newView === currentView) {
                changeAppView(newView, newDay);
            }
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
