// Reduce

const numeros = [5, 10, 36, 75, 63, 1, 20]

const total = numeros.reduce((acumulador, valor) => {
    if (valor % 2 !== 0) {
        acumulador += valor
    }
    return acumulador
}, 0);

console.log(total);




const pessoas = [
    {nome: 'Miguel', idade: 16 },
    {nome: 'Paulo', idade: 50 },
    {nome: 'Ana', idade: 27 },
]

const pessoaVelha = pessoas.reduce((acumulador, valor) => {
    if(acumulador.idade > valor.idade) return acumulador;
    return valor;
})

console.log(pessoaVelha);
