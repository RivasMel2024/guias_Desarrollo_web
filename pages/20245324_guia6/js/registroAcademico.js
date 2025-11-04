document.addEventListener('DOMContentLoaded', function() {
    const containerEstudiantes = document.querySelector("#idContainerEstudiantes")

    const btnAddEstudiantes = document.querySelector("#idBtnAgregarEstudiante")
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiante")

    btnAddEstudiantes.addEventListener("click", addEstudiantes)
    btnViewEstudiantes.addEventListener("click", viewEstudiantes)

    let arrayEstudiantes = new Array()

    function addEstudiantes() {
        const inputCarnet = document
                            .querySelector("#inputCarnet")
                            .value.toString()
                            .toUpperCase()

        const inputNombre = document
                            .querySelector("#inputNombre")
                            .value.toString()
                            .toUpperCase()

        const inputApellido = document
                            .querySelector("#inputApellido")
                            .value.toString()
                            .toUpperCase()

        if (inputCarnet != "" && inputNombre != "" && inputApellido != ""){
            arrayEstudiantes.push(
                new Array(inputCarnet, inputNombre, inputApellido)
            )

            alert("Se registro el nuevo estudiante")

            document.querySelector("#inputCarnet").value = ""
            document.querySelector("#inputNombre").value = ""
            document.querySelector("#inputApellido").value = ""
            document.querySelector("#inputCarnet").focus()
        } else {
            alert("Faltan campos que completar")
        }
    }

    function viewEstudiantes() {
        let totalEstudiantes = arrayEstudiantes.length
        if( totalEstudiantes > 0 ){
            let carnet
            let nombre
            let apellido
            let table = "<table class='table table-light table-striped'>"
            table += "<thead>"
            table += "<tr>"
            table += "<th scope='col' style='width:5%;' >#</th>"
            table += "<th scope='col' style='width:15%;' >Carnet</th>"
            table += "<th scope='col'>Nombres</th>"
            table += "<th scope='col'>Apellidos</th>"
            table += "</tr>"
            table += "</thead>"
            table += "<tbody>"

            for ( let i = 0; i < arrayEstudiantes.length; i++){
                carnet = arrayEstudiantes[i][0]
                nombre = arrayEstudiantes[i][1]
                apellido = arrayEstudiantes[i][2]

                table = 
                `
                <tr>
                    <td scope='row' style='font-weight:bold;'> ${i + 1} </td>
                    <td>${carnet} </td>
                    <td>${nombre} </td>
                    <td>${apellido} </td>
                </tr>                
                `
            }

            table += "</tbody>"
            table+= "</table>"
            containerEstudiantes.innerHTML = table
        } else { 
            alert("No se han registrado estudiantes")
        }
    }

})
