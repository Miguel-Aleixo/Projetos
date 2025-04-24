let x = 0;
let y = 1;
let z = 0;

x = Number(prompt("Digite um número para fazer uma tabuada: "));


if(x == 0) {
    console.log("Digite um numero!")
} else {
    while(y <= 10) {
        let z = x * y;
    
        console.log(`${x}x${y} = ${z}`);
        y++
    
    }
}