// Filter

const a1 = [50, 60, 35, 23, 16, 5, 7, 2, 10];

const a2 = a1.filter(valor => valor >= 10 );

console.log(a2);


const pessoas = [
    {nome: 'Miguel', idade: 16 },
    {nome: 'Paulo', idade: 50 },
    {nome: 'Ana', idade: 27 },
]

const pessoasFilterIdosos = pessoas.filter(obj =>  obj.idade >= 50)
const pessoasFilterNomePequeno = pessoas.filter(obj =>  obj.nome.length < 5)
const pessoasFilterNomeFinalA = pessoas.filter(obj =>  obj.nome.toLowerCase().endsWith('a'))

console.log(pessoasFilterIdosos, pessoasFilterNomePequeno, pessoasFilterNomeFinalA);
