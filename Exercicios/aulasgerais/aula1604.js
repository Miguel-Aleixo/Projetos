/*
const pessoa = {
    nome : 'Miguel',
    sobrenome : 'Aleixo',
    idade : 17
}

for(let i in pessoa) {
    console.log(i, pessoa[i]);  
}
*/


const nome = ['Luiz', 'Otávio', 'Henrique'];

for(let i = 0; i < nome.length; i++) {
    console.log(nome[i])
}

console.log('######');

for(let i in nome) {
    console.log(nome[i])
}

console.log('######');

for(let i of nome) {
    console.log(i);
}