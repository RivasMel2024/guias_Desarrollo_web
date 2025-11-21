const containerEstudiantes = document.querySelector("#idContainerEstudiantes")
const btnPromedio = document.querySelector("#idBtnPromedio")

btnPromedio.addEventListener("click", generarEstudiantes)

function generarEstudiantes() {
    let arrayEstudiantes = new Array()

    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value
    let contador = 1

    let estudiante, calificacion, convertir = 0

    while (contador <= totalEstudiantes){
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`)

        do { 
            calificacion = prompt(`Ingrese la calificacion del estudiante ${contador}`)

            convertir = parseFloat(calificacion)
        } while (isNaN(convertir) || convertir < 0 || convertir > 10)
        arrayEstudiantes[contador-1] = new Array(estudiante, convertir.toFixed(2))
        contador++
    }

    let calificacionAlta = 0, promedio = 0, posicion =0 

    let listado = "<h3>Listado de estudiantes registrados</h3>"
    listado += "<ol>"

    for(let indice of arrayEstudiantes){
        let nombre = indice[0]
        let nota = indice[1]

        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificacion:</b> ${nota}</li>`

        if(nota > calificacionAlta) { 
            posicion = indice
        }

        promedio += parseFloat(nota)
    }
    listado += "</ol>"
    promedio = parseFloat(promedio/arrayEstudiantes.length).toFixed(2)
    listado += `<p><b>Promedio de calificaciones</b> ${promedio}`
    listado += `<br><b>Estudiante con mejor calificacion:</b> ${posicion[0]}</p>`

    containerEstudiantes.innerHTML = listado
}