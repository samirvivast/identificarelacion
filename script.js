const questions = [
    {
        question: "¿Qué tan coherente es entre lo que dice y lo que hace?",
        options: [
            { text: "Muy coherente", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "Inconsistente", type: "fwb" }
        ]
    },
    {
        question: "¿Habla de planes a futuro contigo?",
        options: [
            { text: "Sí, bastante", type: "seria" },
            { text: "No mucho", type: "amistad" },
            { text: "Nunca", type: "fwb" }
        ]
    },
    {
        question: "¿Ella es estable emocionalmente?",
        options: [
            { text: "Sí, bastante", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "No", type: "fwb" }
        ]
    },
    {
        question: "¿Ella tiene tatuajes?",
        options: [
            { text: "No tiene", type: "seria" },
            { text: "Algunos", type: "amistad" },
            { text: "Sí, tiene bastantes", type: "fwb" }
        ]
    },
     {
        question: "¿Te deja en visto los mensajes?",
        options: [
            { text: "Nunca", type: "seria" },
            { text: "A veces", type: "amistad" },
            { text: "Si, Constantemente", type: "fwb" }
        ]
    },
     {
        question: "¿Ella respeta a su Padre?",
        options: [
            { text: "Si lo respeta", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "No lo respeta", type: "fwb" }
        ]
    },
    {
        question: "¿Ella sube fotos atrevidas a las redes sociales?",
        options: [
            { text: "No", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "Si", type: "fwb" }
        ]
    },
     
     {
        question: "¿Se han besado en la boca?",
        options: [
            { text: "Si mucho", type: "seria" },
            { text: "No nunca", type: "amistad" },
            { text: "Si, Algunas veces", type: "fwb" }
        ]
    },
    {
        question: "¿Ella esquiva los Besos y juega contigo?",
        options: [
            { text: "No esquiva", type: "seria" },
            { text: "No hay intenciones de Beso ni jugar", type: "amistad" },
            { text: "Si muchas veces", type: "fwb" }
        ]
    },
    {
        question: "¿Ella Estudia?",
        options: [
            { text: "Si", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "No", type: "fwb" }
        ]
    },
     {
        question: "¿Ella Trabaja?",
        options: [
            { text: "Si", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "No", type: "fwb" }
        ]
    },
    {
        question: "¿Qué tipo de conexión sientes con ella?",
        options: [
            { text: "Emocional profunda", type: "seria" },
            { text: "Relajada y natural", type: "amistad" },
            { text: "Principalmente física", type: "fwb" }
        ]
    },
    {
        question: "¿Qué tan constante es en la comunicación?",
        options: [
            { text: "Muy constante", type: "seria" },
            { text: "Normal", type: "amistad" },
            { text: "Intermitente", type: "fwb" }
        ]
    }
];

let currentQuestion = 0;
let scores = { seria: 0, amistad: 0, fwb: 0 };

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-text").textContent = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option.text;

        div.onclick = () => selectOption(option.type);
        optionsDiv.appendChild(div);
    });

    // actualizar barra de progreso
    updateProgressBar();
}

function selectOption(type) {
    scores[type]++;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const total = questions.length;
    const progress = (currentQuestion / total) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";

    // ACTUALIZAR TEXTO: "Pregunta X de Y"
    document.getElementById("progress-info").textContent =
        `Pregunta ${currentQuestion + 1} de ${total}`;
}

function showResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    let title, description, image;

    if (scores.seria >= scores.amistad && scores.seria >= scores.fwb) {
        title = "Relación Seria / Noviazgo";
        description = "Esta mujer es ideal para un compromiso estable.";
        image = "https://www.tecnomedia.co/identificarelacion/images/pareja.jpg";
    } 
    else if (scores.amistad >= scores.seria && scores.amistad >= scores.fwb) {
        title = "Amistad";
        description = "Es una persona ideal para una amistad sana y sin tensión romántica.";
        image = "https://www.tecnomedia.co/identificarelacion/images/amigos.jpg";
    }
    else {
        title = "Amigos con Derechos";
        description = "La mayor conexión es física o casual sin compromiso emocional.";
        image = "https://www.tecnomedia.co/identificarelacion/images/conderechos.jpg";
    }

    document.getElementById("result-title").textContent = title;
    document.getElementById("result-description").textContent = description;
    document.getElementById("result-image").src = image;

    // barra al 100%
    document.getElementById("progress-bar").style.width = "100%";
}

// Inicializar
loadQuestion();
