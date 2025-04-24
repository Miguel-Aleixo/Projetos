let comeco = 0;
let fim = 0;
let passos = 0;

comeco = Number(prompt("Digite o começo: "));
fim = Number(prompt("Digite o fim: "));
passos = Number(prompt("Digite o quanto é para pular: "));

if(passos == 0) {
    passos++
} 
if(comeco == fim) {
    fim++
}

if(comeco < fim) {
    for(comeco, fim, passos; comeco < fim ; comeco = comeco + passos) {
        if(comeco <= fim) {
            console.log(comeco);
        }
    };
} else if(comeco > fim){
    for(comeco, fim, passos; comeco > fim ; comeco = comeco - passos) {
        if(comeco >= fim) {
            console.log(comeco);
        }
    };
}
    
