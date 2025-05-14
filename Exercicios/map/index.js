// Map

const numeros = [1, 5, 78, 10, 25, 54, 90];

const numerosDobro = numeros.map(valor => valor * 2)

console.log(numerosDobro);

const pessoas = [
    { nome: 'Miguel', idade: 16 },
    { nome: 'Paulo', idade: 50 },
    { nome: 'Ana', idade: 27 },
];

const pessoasNome = pessoas.map(obj => obj.nome)
const pessoasIdade = pessoas.map(obj => ({idade : obj.idade}) )
const pessoasId = pessoas.map((obj, indice) => {
    const newObj = { ...obj }
    newObj.id = indice + 1;
    return newObj;
})

console.log(pessoasNome, pessoasIdade, pessoasId);

console.log(pessoas);



