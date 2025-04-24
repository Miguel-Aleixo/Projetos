const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const lista = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li')
    return li
}

input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if(!input.value) return;
        criaTarefa(input.value)
        limpar()
    }
})

function limpar() {
    input.value = '';
    input.focus();
}

function criaBotao(li) {
    li.innerText += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar está tarefa');
    li.appendChild(botaoApagar)
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto
    lista.appendChild(li)
    criaBotao(li)
    salvarTarefas()
}

btn.addEventListener('click', () => {
    if(!input.value) return;
    criaTarefa(input.value)
    limpar()
})

document.addEventListener('click', (e) => {
     el = e.target
        if(el.classList.contains('apagar')) {
            el.parentElement.remove();
            salvarTarefas();
        }
})

function salvarTarefas() {
    const listaLi = lista.querySelectorAll('li')
    const listaTarefas = [];

    for (let tarefas of listaLi) {
        let tarefaTexto = tarefas.innerText.replace('Apagar', '').trim()
        listaTarefas.push(tarefaTexto)
    }
    const tarefaJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefaJSON);
    
}

function PuxaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(tarefas)

    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa)
    }
}

PuxaTarefasSalvas()

