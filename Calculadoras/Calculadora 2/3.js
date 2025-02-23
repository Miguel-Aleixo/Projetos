function inserir(num) {
     let numero = document.getElementById('resultado').innerHTML;
     document.getElementById('resultado').innerHTML = numero + num;
}

function clean() {
    document.getElementById('resultado').innerHTML = "";
}

function apagar() {
    let apagar = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = apagar.substring(0, apagar.length - 1);
}

function calcular() {
    let calcular = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = eval(calcular)
}