class Pessoa {
    constructor (nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    falar() {
        console.log(`${this.nome} está falando`);
        
    }
}

function Pessoa2 (nome, sobrenome) {
    this.nome = nome
    this.sobrenome = sobrenome
}

Pessoa2.prototype.falar = function() {
    console.log(`${this.nome} está falando`);
}


const p1 = new Pessoa('Miguel', 'Aleixo')
const p2 = new Pessoa('Miguel', 'Aleixo')
console.log(p1);
console.log(p2);
