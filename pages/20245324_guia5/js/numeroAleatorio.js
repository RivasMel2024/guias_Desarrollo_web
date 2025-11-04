const numeroAleatorio = Math.floor(Math.random() * 25) + 1
console.log(numeroAleatorio);

const numeroIntentos = 3

let intentos = 1 
function generarNumeroAleatorio() {
    let mensaje

    const parrafo = document.querySelector("#idParrafo")

    if(intentos <= numeroIntentos){
        let numero = prompt(`Que numero se ha generado (Intento ${intentos})`)

        if (numero == numeroAleatorio){
            mensaje = `Soprendente! Pudiste adivinar el numero oculto (${numeroAleatorio}).
            Refresca la pagina para volver a jugar`
        } else if (intentos == numeroIntentos) { 
            mensaje = `Su numero de intento ha terminado.
                El numero oculto era ${numeroAleatorio}. Refresque la pagina para volver a jugar`
        } else {
            mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos.`
            if (esMayor(numero) === true){
                mensaje += `El numero a adivinar esta por encima de ${numero}`
            } else {
                mensaje += `El numero a advinar esta por debajo de ${numero}`
            }
        }

        intentos++
    } else {
        mensaje = `Su numero de intentos ha terminado
        El numero oculto era ${numeroAleatorio}. Refresque la pagina para volver a jugar`
    }

    parrafo.innerHTML = mensaje
}

function esMayor(numero) {
    let esMayor 
    if (numero > numeroAleatorio){
        esMayor = false
    } else if (numero < numeroAleatorio) {
        esMayor = true
    }

    return esMayor
}