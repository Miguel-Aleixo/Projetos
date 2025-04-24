const paragrafos = document.querySelector('.paragrafos');

const ps = paragrafos.querySelectorAll('p')

const body = getComputedStyle(document.body);
const backBody = body.backgroundColor;

for(let i of ps) {
    i.style.backgroundColor = backBody;
    i.style.color = '#ffffff'
}