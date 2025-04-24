let Dolar = 5.50;

document.getElementById('dolar').addEventListener("keyup", () => {
    converterReal();
})

document.getElementById('real').addEventListener("keyup", () => {
    converterDolar();
})

document.getElementById('dolar').addEventListener("keydown", () => {
    if(!/[0-9\.\backspace\keyright\keyleft]/.test(event.key)) {
        event.preventDefault();
    }
})

document.getElementById('real').addEventListener("keydown", () => {
    if(!/[0-9\.\backspace\keyright\keyleft]/.test(event.key)) {
        event.preventDefault();
    }
})

function converterReal() {
   let inputDolar = Number(document.getElementById('dolar').value);

   let real = inputDolar * Dolar;

   document.getElementById('real').value = real
}

function converterDolar() {
    let inputReal = Number(document.getElementById('real').value);

    let dolar = inputReal / Dolar;

    document.getElementById('dolar').value = dolar
}