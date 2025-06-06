function Produto(nome, preco) {
    this.nome = nome;
    this.preco = preco;
}

Produto.prototype.aumento = function (percentual)  {
    this.preco = this.preco + (this.preco * percentual / 100);
}

Produto.prototype.desconto = function (percentual) {
    this.preco = this.preco - (this.preco * percentual / 100);
}

function Camiseta(nome, preco, cor) {
    Produto.call(this, nome, preco);
    this.cor = cor;
}
Camiseta.prototype = Object.create(Produto.prototype);
Camiseta.prototype.constructor = Camiseta;

function Caneca(nome, preco, material) {
    Produto.call(this, nome, preco);
    this.cor = material;
}
Caneca.prototype = Object.create(Produto.prototype);
Caneca.prototype.constructor = Caneca;

const generico = new Produto('Generico', 3.9);

const camiseta = new Camiseta('Regata', 20, 'Preta');

const caneca = new Caneca('Xicara', 10.5, 'Porcelana');

console.log(generico);
console.log(camiseta);
console.log(caneca);
