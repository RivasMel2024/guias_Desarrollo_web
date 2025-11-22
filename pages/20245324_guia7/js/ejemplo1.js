const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const idsRegistrados = [];

const validarIdUnico = function (id) {
    return !idsRegistrados.includes(id);
};

const vericaTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
    
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerHTML = "Seleccione una opción";
    addElemento.appendChild(defaultOption);
    
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
    
    idsRegistrados.push(nombreElemento.value);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.setAttribute("name", nombreElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;
    
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
    
    idsRegistrados.push(nombreElemento.value);
};

const newInput = function (newElemento) {
    let addElemento = newElemento == "textarea" ? document.createElement("textarea") : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
    
    idsRegistrados.push(nombreElemento.value);
};

const validarFormulario = function () {
    let elementos = newForm.elements;
    let errores = [];
    let camposVacios = 0;
    let radiosValidados = [];
    
    for (let i = 0; i < elementos.length; i++) {
        let elemento = elementos[i];
        let tipo = elemento.type;
        
        if (tipo == "text" || tipo == "number" || tipo == "date" || tipo == "password" || tipo == "email" || tipo == "color") {
            if (elemento.value.trim() == "") {
                let label = elemento.parentElement.querySelector("label");
                let nombreCampo = label ? label.textContent.trim() : elemento.id;
                errores.push(`El campo "${nombreCampo}" está vacío`);
                camposVacios++;
            }
        } else if (tipo == "textarea") {
            if (elemento.value.trim() == "") {
                let label = elemento.parentElement.querySelector("label");
                let nombreCampo = label ? label.textContent.trim() : elemento.id;
                errores.push(`El campo "${nombreCampo}" está vacío`);
                camposVacios++;
            }
        } else if (tipo == "select-one") {
            if (elemento.value == "") {
                let label = elemento.parentElement.querySelector("label");
                let nombreCampo = label ? label.textContent.trim() : elemento.id;
                errores.push(`Debe seleccionar una opción en "${nombreCampo}"`);
                camposVacios++;
            }
        } else if (tipo == "radio") {
            let nombre = elemento.name;
            
            if (!radiosValidados.includes(nombre)) {
                radiosValidados.push(nombre);
                let radios = document.getElementsByName(nombre);
                let seleccionado = false;
                
                for (let j = 0; j < radios.length; j++) {
                    if (radios[j].checked) {
                        seleccionado = true;
                        break;
                    }
                }
                
                if (!seleccionado) {
                    errores.push(`Debe seleccionar una opción en el grupo "${nombre}"`);
                    camposVacios++;
                }
            }
        } else if (tipo == "checkbox") {
            if (!elemento.checked) {
                let label = elemento.parentElement.querySelector("label");
                let nombreCampo = label ? label.textContent.trim() : elemento.id;
                errores.push(`Debe marcar la casilla "${nombreCampo}"`);
                camposVacios++;
            }
        }
    }
    
    if (errores.length > 0) {
        alert(`Se encontraron ${camposVacios} error(es):\n\n${errores.join("\n")}`);
    } else {
        alert("Todos los campos están correctamente llenos ✓");
    }
};

buttonCrear.onclick = () => {
    vericaTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        if (!validarIdUnico(nombreElemento.value)) {
            alert(`Error: El ID "${nombreElemento.value}" ya existe. Por favor, ingrese un ID único para el control.`);
            return;
        }
        
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = () => {
    if (newForm.elements.length > 0) {
        validarFormulario();
    } else {
        alert("No hay elementos en el formulario para validar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
