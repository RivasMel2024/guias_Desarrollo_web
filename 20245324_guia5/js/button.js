function aviso(){
    alert('Bienvenido al mundo de JavaScript')
}

function confirmacion(){
    // Puede guardar true o false

    let confirmacion = confirm('¿Desea salir de la sesion?')

    alert(`Valor seleccionado ${confirmacion}`)
}

function capturarDatos(){
    let nombre = prompt('¿Cual es su nombre?')

    let edad = prompt('¿Cual es su edad?', 0)

    alert(`Su nombre es ${nombre} y su edad ${edad}`)
}

function dibujarParrafo() {
    let parrafo = prompt('Escriba la informacion que desea visualiar en el parrafo')

    const p = document.querySelector('#idParrafo')
    p.innerHTML = parrafo
}