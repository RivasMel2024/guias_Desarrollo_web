const inputCarnet = document.getElementById("inputCarnet");
const inputNombre = document.getElementById("inputNombre");
const inputDUI = document.getElementById("inputDUI");
const inputNIT = document.getElementById("inputNIT");
const inputFechaNacimiento = document.getElementById("inputFechaNacimiento");
const inputCorreo = document.getElementById("inputCorreo");
const inputEdad = document.getElementById("inputEdad");

const btnAgregar = document.getElementById("idBtnAgregarEstudiante");
const btnMostrar = document.getElementById("idBtnMostrarEstudiante");
const btnLimpiar = document.getElementById("idBtnLimpiar");

const containerEstudiantes = document.getElementById("idContainerEstudiantes");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

let arrayEstudiantes = [];

// Expresiones regulares para validación
const regexCarnet = /^[A-Z]{2}\d{3}$/;
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexDUI = /^\d{8}-\d{1}$/;
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regexEdad = /^\d+$/;

// Función para validar un campo específico
const validarCampo = (input, regex, mensajeError) => {
    const valor = input.value.trim();
    
    if (!regex.test(valor)) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
};

// Función para validar fecha adicional (días válidos por mes)
const validarFechaNacimiento = () => {
    const valor = inputFechaNacimiento.value.trim();
    
    if (!regexFecha.test(valor)) {
        inputFechaNacimiento.classList.add("is-invalid");
        inputFechaNacimiento.classList.remove("is-valid");
        return false;
    }
    
    const [dia, mes, anio] = valor.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    
    if (fecha.getFullYear() !== anio || 
        fecha.getMonth() !== mes - 1 || 
        fecha.getDate() !== dia) {
        inputFechaNacimiento.classList.add("is-invalid");
        inputFechaNacimiento.classList.remove("is-valid");
        return false;
    }
    
    inputFechaNacimiento.classList.add("is-valid");
    inputFechaNacimiento.classList.remove("is-invalid");
    return true;
};

// Validación en tiempo real para cada campo
inputCarnet.addEventListener("input", () => {
    inputCarnet.value = inputCarnet.value.toUpperCase();
    validarCampo(inputCarnet, regexCarnet, "Formato: AB001");
});

inputNombre.addEventListener("input", () => {
    validarCampo(inputNombre, regexNombre, "Solo letras y espacios");
});

inputDUI.addEventListener("input", () => {
    validarCampo(inputDUI, regexDUI, "Formato: 12345678-9");
});

inputNIT.addEventListener("input", () => {
    validarCampo(inputNIT, regexNIT, "Formato: 1234-567890-123-4");
});

inputFechaNacimiento.addEventListener("input", validarFechaNacimiento);

inputCorreo.addEventListener("input", () => {
    validarCampo(inputCorreo, regexCorreo, "Correo inválido");
});

inputEdad.addEventListener("input", () => {
    validarCampo(inputEdad, regexEdad, "Solo números");
});

// Función para limpiar el formulario
const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";
    
    // Remover clases de validación
    const inputs = [inputCarnet, inputNombre, inputDUI, inputNIT, inputFechaNacimiento, inputCorreo, inputEdad];
    inputs.forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
    });
    
    inputCarnet.focus();
};

// Función para mostrar notificación
const mostrarNotificacion = (mensajeTexto, tipo = "success") => {
    mensaje.innerHTML = mensajeTexto;
    
    // Cambiar color del toast según el tipo
    notificacion.classList.remove("text-bg-success", "text-bg-danger", "text-bg-warning");
    if (tipo === "error") {
        notificacion.classList.add("text-bg-danger");
    } else if (tipo === "warning") {
        notificacion.classList.add("text-bg-warning");
    } else {
        notificacion.classList.add("text-bg-success");
    }
    
    toast.show();
};

// Función para agregar estudiante
const agregarEstudiante = () => {
    // Validar todos los campos
    const carnetValido = validarCampo(inputCarnet, regexCarnet);
    const nombreValido = validarCampo(inputNombre, regexNombre);
    const duiValido = validarCampo(inputDUI, regexDUI);
    const nitValido = validarCampo(inputNIT, regexNIT);
    const fechaValida = validarFechaNacimiento();
    const correoValido = validarCampo(inputCorreo, regexCorreo);
    const edadValida = validarCampo(inputEdad, regexEdad);
    
    if (carnetValido && nombreValido && duiValido && nitValido && 
        fechaValida && correoValido && edadValida) {
        
        const carnetExiste = arrayEstudiantes.some(est => est.carnet === inputCarnet.value);
        
        if (carnetExiste) {
            mostrarNotificacion("El carnet ya está registrado", "warning");
            return;
        }
        
        const estudiante = {
            carnet: inputCarnet.value,
            nombre: inputNombre.value,
            dui: inputDUI.value,
            nit: inputNIT.value,
            fechaNacimiento: inputFechaNacimiento.value,
            correo: inputCorreo.value,
            edad: inputEdad.value
        };
        
        arrayEstudiantes.push(estudiante);
        mostrarNotificacion("Estudiante registrado exitosamente", "success");
        limpiarFormulario();
        
    } else {
        mostrarNotificacion("Por favor, corrija los errores en el formulario", "error");
    }
};

// Función para mostrar estudiantes
const mostrarEstudiantes = () => {
    if (arrayEstudiantes.length === 0) {
        containerEstudiantes.innerHTML = "<p class='text-muted'>No hay estudiantes registrados</p>";
        return;
    }
    
    let tabla = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Carnet</th>
                        <th>Nombre</th>
                        <th>DUI</th>
                        <th>NIT</th>
                        <th>Fecha Nac.</th>
                        <th>Correo</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    arrayEstudiantes.forEach((estudiante, index) => {
        tabla += `
            <tr>
                <td>${index + 1}</td>
                <td>${estudiante.carnet}</td>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.dui}</td>
                <td>${estudiante.nit}</td>
                <td>${estudiante.fechaNacimiento}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.edad}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarEstudiante(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tabla += `
                </tbody>
            </table>
        </div>
    `;
    
    containerEstudiantes.innerHTML = tabla;
};

// Función para eliminar estudiante
const eliminarEstudiante = (index) => {
    if (confirm("¿Está seguro de eliminar este estudiante?")) {
        arrayEstudiantes.splice(index, 1);
        mostrarEstudiantes();
        mostrarNotificacion("Estudiante eliminado correctamente", "success");
    }
};

// Eventos de los botones
btnAgregar.addEventListener("click", agregarEstudiante);
btnMostrar.addEventListener("click", mostrarEstudiantes);
btnLimpiar.addEventListener("click", limpiarFormulario);

// Inicializar
limpiarFormulario();