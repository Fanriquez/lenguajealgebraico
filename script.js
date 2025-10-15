const botonInicio = document.getElementById("botonInicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");
const preguntaElem = document.getElementById("pregunta");
const opcionesElem = document.getElementById("opciones");
const resultadoElem = document.getElementById("resultado");
const puntosElem = document.getElementById("puntos");
const numPreguntaElem = document.getElementById("numPregunta");
const puntajeFinalElem = document.getElementById("puntaje-final");
const btnReiniciar = document.getElementById("btnReiniciar");

let preguntas = [
  { texto: "El doble de un número", correcta: "2x", incorrectas: ["x + 2", "x / 2"] },
  { texto: "Un número aumentado en cinco", correcta: "x + 5", incorrectas: ["x - 5", "5x"] },
  { texto: "La suma de dos números distintos", correcta: "x + y", incorrectas: ["x * y", "x - y"] },
  { texto: "Un número reducido en tres", correcta: "x - 3", incorrectas: ["x + 3", "3x"] },
  { texto: "Un número dividido entre cinco", correcta: "x / 5", incorrectas: ["5 / x", "x * 5"] },
  { texto: "El triple de un número menos dos", correcta: "3x - 2", incorrectas: ["3x + 2", "x - 2"] },
  { texto: "Dos veces un número más otro distinto", correcta: "2x + y", incorrectas: ["x + 2y", "x + y + 2"] },
  { texto: "La mitad de un número", correcta: "x / 2", incorrectas: ["2 / x", "x * 2"] },
  { texto: "Un número más cuatro veces otro", correcta: "x + 4y", incorrectas: ["4x + y", "x - 4y"] },
  { texto: "El promedio de dos números distintos", correcta: "(x + y) / 2", incorrectas: ["x + y / 2", "(x - y) / 2"] }
];

let preguntaActual = 0;
let puntaje = 0;
let usadas = [];

function iniciarJuego() {
  botonInicio.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");

  preguntaActual = 0;
  puntaje = 0;
  usadas = [];

  mostrarPregunta();
}

function mostrarPregunta() {
  resultadoElem.textContent = "";

  if (preguntaActual >= 10) {
    terminarJuego();
    return;
  }

  numPreguntaElem.textContent = preguntaActual + 1;
  puntosElem.textContent = puntaje;

  // Escoger una pregunta aleatoria que no se haya usado
  let pregunta;
  do {
    pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
  } while (usadas.includes(pregunta));
  usadas.push(pregunta);

  preguntaElem.textContent = pregunta.texto;

  // Mezclar alternativas
  let alternativas = [pregunta.correcta, ...pregunta.incorrectas].sort(() => Math.random() - 0.5);

  opcionesElem.innerHTML = "";
  alternativas.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.classList.add("opcion");
    btn.onclick = () => verificar(btn, pregunta.correcta);
    opcionesElem.appendChild(btn);
  });
}

function verificar(btn, correcta) {
  const botones = document.querySelectorAll(".opcion");
  botones.forEach(b => b.disabled = true);

  if (btn.textContent === correcta) {
    btn.classList.add("correcto");
    resultadoElem.textContent = "✅ ¡Muy bien!";
    puntaje++;
  } else {
    btn.classList.add("incorrecto");
    resultadoElem.textContent = `❌ No, era ${correcta}`;
  }

  puntosElem.textContent = puntaje;

  setTimeout(() => {
    preguntaActual++;
    mostrarPregunta();
  }, 1000);
}

function terminarJuego() {
  pantallaJuego.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");
  puntajeFinalElem.textContent = `${puntaje} / 10`;
}

botonInicio.addEventListener("click", iniciarJuego);
btnReiniciar.addEventListener("click", iniciarJuego);
