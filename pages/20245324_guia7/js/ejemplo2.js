const formulario = document.forms["frmRegistro"]
const button = document.forms["frmRegistro"].elements["btnRegistro"]

const modal = new bootstrap.Modal(document.getElementById("idModal"), {})

const bodyModal = document.getElementById("idBodyModal")

const validarFormulario = function () {
    const nombre = document.getElementById("idNombre").value.trim()
    const apellidos = document.getElementById("idApellidos").value.trim()
    const fechaNac = document.getElementById("idFechaNac").value
    const correo = document.getElementById("idCorreo").value.trim()
    const password = document.getElementById("idPassword").value
    const passwordRepetir = document.getElementById("idPasswordRepetir").value
    const pais = document.getElementById("idCmPais").value
    
    if (nombre === "") {
        alert("El campo Nombres es obligatorio")
        return false
    }
    
    if (apellidos === "") {
        alert("El campo Apellidos es obligatorio")
        return false
    }
    
    if (fechaNac === "") {
        alert("El campo Fecha de Nacimiento es obligatorio")
        return false
    }
    
    const fechaActual = new Date()
    const fechaNacimiento = new Date(fechaNac)
    
    if (fechaNacimiento > fechaActual) {
        alert("La fecha de nacimiento no puede ser mayor a la fecha actual")
        return false
    }
    
    if (correo === "") {
        alert("El campo Correo Electrónico es obligatorio")
        return false
    }
    
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!regexCorreo.test(correo)) {
        alert("El correo electrónico no tiene un formato válido")
        return false
    }
    
    if (password === "") {
        alert("El campo Contraseña es obligatorio")
        return false
    }
    
    if (passwordRepetir === "") {
        alert("El campo Repetir Contraseña es obligatorio")
        return false
    }
    
    if (password !== passwordRepetir) {
        alert("Las contraseñas no coinciden")
        return false
    }
    
    const intereses = document.querySelectorAll(".intereses:checked")
    if (intereses.length === 0) {
        alert("Debe seleccionar al menos un interés")
        return false
    }
    
    const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked')
    if (!carreraSeleccionada) {
        alert("Debe seleccionar una carrera")
        return false
    }
    
    if (pais === "") {
        alert("Debe seleccionar un país de origen")
        return false
    }
    
    return true
};

const mostrarDatosEnModal = function () {
    bodyModal.innerHTML = ""
    
    const nombre = document.getElementById("idNombre").value.trim()
    const apellidos = document.getElementById("idApellidos").value.trim()
    const fechaNac = document.getElementById("idFechaNac").value
    const correo = document.getElementById("idCorreo").value.trim()
    const pais = document.getElementById("idCmPais").value
    
    const intereses = document.querySelectorAll(".intereses:checked")
    let interesesTexto = ""
    for (let i = 0; i < intereses.length; i++) {
        if (i > 0) {
            interesesTexto += ", "
        }
        interesesTexto += intereses[i].value
    }
    
    const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked')
    const carrera = carreraSeleccionada ? carreraSeleccionada.value : ""
    
    const tabla = document.createElement("table")
    tabla.setAttribute("class", "table table-striped table-bordered")
    
    const thead = document.createElement("thead")
    const trHead = document.createElement("tr")
    
    const thCampo = document.createElement("th")
    thCampo.textContent = "Campo"
    
    const thValor = document.createElement("th")
    thValor.textContent = "Valor"
    
    trHead.appendChild(thCampo)
    trHead.appendChild(thValor)
    thead.appendChild(trHead)
    tabla.appendChild(thead)
    
    const tbody = document.createElement("tbody")
    
    const datos = [
        { campo: "Nombres", valor: nombre },
        { campo: "Apellidos", valor: apellidos },
        { campo: "Fecha de Nacimiento", valor: fechaNac },
        { campo: "Correo Electrónico", valor: correo },
        { campo: "Intereses", valor: interesesTexto },
        { campo: "Carrera", valor: carrera },
        { campo: "País de Origen", valor: pais }
    ]
    
    for (let i = 0; i < datos.length; i++) {
        const tr = document.createElement("tr")
        
        const tdCampo = document.createElement("td")
        tdCampo.textContent = datos[i].campo
        
        const tdValor = document.createElement("td")
        tdValor.textContent = datos[i].valor
        
        tr.appendChild(tdCampo)
        tr.appendChild(tdValor)
        tbody.appendChild(tr)
    }
    
    tabla.appendChild(tbody)
    bodyModal.appendChild(tabla)
    
    modal.show()
}

button.onclick = () => {
    if (validarFormulario()) {
        mostrarDatosEnModal()
    }
}