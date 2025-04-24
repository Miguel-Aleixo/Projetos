let numero = []

let pos = 0;

let n1 = 0;
let n2 = 0;
let n3 = 0;

console.log("Coloque pelo menos um 10")

n1 = Number(prompt("Digite um numero: "));
n2 = Number(prompt("Digite um numero: "));
n3 = Number(prompt("Digite um numero: "));

numero.push(n1);
numero.push(n2);
numero.push(n3);

for(pos in numero ) {
    console.log(numero[pos])
}

let posicao = numero.indexOf(10)

if(posicao == -1 ) {
    console.log("Você não digitou o número 10");
} else {
    posicao++;
    console.log(`O 10 está na posição ${posicao}`);
}

let escolha = "";

escolha = String(prompt("Você quer que deixe os números na ordem crescente?(y)/(n)"))

if(escolha.toLowerCase() == "y") {
    numero.sort((a, b) => a - b);
    for(pos in numero ) {
        console.log(numero[pos])
    }
}
