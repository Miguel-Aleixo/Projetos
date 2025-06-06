let CPF = '070.987.720-02';
let CPF_Limpo = CPF.replace(/\D/g, '');
let CPF_Arraw = Array.from(CPF_Limpo).map((valor) => Number(valor));
let Digitos = CPF_Arraw.splice(-2);
let Voltas = 0;

while (Voltas < 2) {
    let Soma = 0;

    CPF_Arraw.reduce((acumulador, valor, indice) => {
        let Tamanho_Arraw = CPF_Arraw.length + 1
        Tamanho_Arraw = Tamanho_Arraw - indice

        acumulador += valor * Tamanho_Arraw

        Soma = acumulador

        return acumulador
    }, 0)

    let Resto = Soma % 11 
    let Digito = (11 - Resto < 2 || 11 - Resto > 9 ? 0 : 11 - Resto)

    CPF_Arraw.push(Digito)

    Soma = 0;
    Voltas++
}

let CPF_Final = CPF_Arraw.join('')

if (CPF_Final === CPF_Limpo) {
    console.log('CPF correto');
} else {
    console.log('CPF incorreto');
}

