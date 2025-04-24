let data = new Date()

let horas = data.getHours();

document.getElementById('horas').innerText = horas

if(horas <= 11 || horas >= 7) {
    document.body.style.backgroundColor = "blue"
    document.body.style.color = "white"
} else if (horas >= 12 || horas <= 18) {
     document.body.style.backgroundColor = "#FFA500"
      document.body.style.color = "white"
} else {
    document.body.style.backgroundColor = "black"
     document.body.style.color = "white"
}