let somaInput = document.querySelector("#soma");
let subtInput = document.querySelector("#subt");
let multInput = document.querySelector("#mult");
let diviInput = document.querySelector("#divi");

let valorInput = document.querySelector("#valor");
let valor1Input = document.querySelector("#valor1");
let resultado1Input = document.querySelector("#resultado");

let A = 0;

valorInput.value = "1";
valor1Input.value = "1";

somaInput.addEventListener("click", () => {
    let B = parseFloat(valorInput.value);
    let C = parseFloat(valor1Input.value);
    
    A = B + C;
    resultado1Input.value = A
})

subtInput.addEventListener("click", () => {
    let B = parseFloat(valorInput.value);
    let C = parseFloat(valor1Input.value);
    
    A = B - C;
    resultado1Input.value = A
})

multInput.addEventListener("click", () => {
    let B = parseFloat(valorInput.value);
    let C = parseFloat(valor1Input.value);
    
    A = B * C;
    resultado1Input.value = A
})

diviInput.addEventListener("click", () => {
    let B = parseFloat(valorInput.value);
    let C = parseFloat(valor1Input.value);
    
    A = B / C;
    resultado1Input.value = A
})

