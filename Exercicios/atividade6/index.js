// Filter, Map, Reduce

const numeros = [50, 60, 35, 23, 16, 5, 7, 2, 10];

const numerosPares = numeros
.filter(valor => valor % 2 === 0)
.map(valor => valor * 2)
.reduce((acumulador, valor) => acumulador += valor);

console.log(numerosPares);


