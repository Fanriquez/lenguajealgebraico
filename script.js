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
  { texto: "El triple de un número", correcta: "3x", incorrectas: ["x + 3", "x / 3"] },
  { texto: "Un número reducido en tres", correcta: "x - 3", incorrectas: ["3x", "x + 3"] },
  { texto: "La mitad de un número", correcta: "x / 2", incorrectas: ["2x", "x + 2"] },
  { texto: "La tercera parte de un número", correcta: "x / 3", incorrectas: ["3x", "x - 3"] },
  { texto: "La quinta parte de un número", correcta: "x / 5", incorrectas: ["5x", "x - 5"] },
  { texto: "La suma de dos números distintos", correcta: "x + y", incorrectas: ["xy", "x - y"] },
  { texto: "La diferencia entre dos números distintos", correcta: "x - y", incorrectas: ["y - x", "x + y"] },
  { texto: "El producto de dos números distintos", correcta: "xy", incorrectas: ["x + y", "x / y"] },
  { texto: "El cociente entre dos números distintos", correcta: "x / y", incorrectas: ["y / x", "x * y"] },
  { texto: "Un número aumentado en el doble del mismo número", correcta: "x + 2x", incorrectas: ["x * 2", "x - 2x"] },
  { texto: "La suma de un número y el cuadruple de un número distinto", correcta: "x + 4y", incorrectas: ["4x + y", "x - 4y"] },
  { texto: "La suma de dos números distintos reducida en uno", correcta: "x + y - 1", incorrectas: ["x + y + 1", "(x + y) / 2"] },
  { texto: "La diferencia entre un número y la mitad de otro distinto", correcta: "x - (y / 2)", incorrectas: ["x + y / 2", "y - x / 2"] },
  { texto: "El triple de un número más otro distinto", correcta: "3x + y", incorrectas: ["x + 3y", "3(x + y)"] },
  { texto: "La mitad de la suma de dos números distintos", correcta: "(x + y) / 2", incorrectas: ["x + y / 2", "x - y / 2"] },
  { texto: "Un número menos la mitad de sí mismo", correcta: "x - x / 2", incorrectas: ["x / 2", "2x"] },
  { texto: "El doble de la suma de dos números distintos", correcta: "2(x + y)", incorrectas: ["2x + y", "x + 2y"] },
  { texto: "El triple de un número reducido en dos", correcta: "3x - 2", incorrectas: ["3x + 2", "x - 2"] },
  { texto: "Un número aumentado en siete", correcta: "x + 7", incorrectas: ["7x", "x - 7"] },
  { texto: "La suma de un número y el triple de otro distinto", correcta: "x + 3y", incorrectas: ["3x + y", "x - 3y"] },
  { texto: "La diferencia entre un número y su doble", correcta: "x - 2x", incorrectas: ["2x - x", "x + 2x"] },
  { texto: "El producto de un número por tres más otro distinto", correcta: "3x + y", incorrectas: ["x + 3y", "3(x + y)"] },
  { texto: "La mitad de un número aumentado en cuatro", correcta: "x / 2 + 4", incorrectas: ["x / 2 - 4", "x + 4 / 2"] },
  { texto: "La suma de tres números distintos", correcta: "x + y + z", incorrectas: ["x + y", "x * y * z"] },
  { texto: "El doble de un número menos su mitad", correcta: "2x - x / 2", incorrectas: ["2x + x / 2", "x - x / 2"] },
  { texto: "La suma de un número con la mitad de otro distinto", correcta: "x + y / 2", incorrectas: ["x + y * 2", "x - y / 2"] },
  { texto: "La diferencia entre el doble de un número y otro distinto", correcta: "2x - y", incorrectas: ["x - 2y", "x + 2y"] },
  }
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
