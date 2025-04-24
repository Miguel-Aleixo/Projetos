let timer = document.querySelector('.timer');

function inciarNumero(segundos) {
    let data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC',
    })
}

let segundos = 0;
let relogio;

function iniciarRelogio() {
    relogio = setInterval(() => {
        segundos++

        timer.innerHTML = inciarNumero(segundos)

    }, 1000);
}

document.addEventListener('click', (e) => {
    const el = e.target;

    if(el.classList.contains('iniciar')) {
        timer.classList.remove('pausar');
        clearInterval(relogio)
        iniciarRelogio();
    }

    if(el.classList.contains('pausar')) {
        timer.classList.add('pausar');
        clearInterval(relogio);
    }

    if(el.classList.contains('zerar')) {
        timer.classList.remove('pausar');
        clearInterval(relogio);
        timer.innerHTML = inciarNumero(0)
        segundos = 0;
    }
})