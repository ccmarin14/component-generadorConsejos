const idConsejo = document.getElementById("idConsejo");
const consejo = document.getElementById("consejo");
const button = document.getElementById("idImagen");
const traslate = document.getElementById("idTraslate");

let resultText;
let oldText;
let languaje = "EN";

button.addEventListener("click",getAdvice);
traslate.addEventListener("click",changeLanguaje);

getAdvice();