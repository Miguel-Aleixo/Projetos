const falar = {
    falar() {
        console.log(`${this.nome} está falando`);
    },
}
const comer = { 
    comer() {
        console.log(`${this.nome} está comendo`);
    },
}
const beber = {
    beber() {
        console.log(`${this.nome} está bebendo`);
    },
}

function criaPessoa(nome, sobrenome) {
    const prototype = Object.assign({}, falar, comer, beber)

    return Object.create(prototype, {
        nome: { value: nome },
        sobrenome: { value: sobrenome }
    })
}

const p1 = criaPessoa("Miguel", "Aleixo")
console.log(p1.beber());

