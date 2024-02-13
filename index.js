const SW = "Controler/paciente_sw.php";

/**
 * Muestra el formulario en la página
 */
function displayForm(){
    var form = document.getElementById("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
}

/**
 * Introduce la información del medico en el formulario
 * @param medico medico que se desea actualizar
 */
function setDataIntoForm(paciente){
    var input_id_paciente = document.getElementById("id_paciente");
    var input_sip = document.getElementById("sip");
    var input_nombre = document.getElementById("nombre");
    var input_apellido1 = document.getElementById("apellido1");
    var input_apellido2 = document.getElementById("apellido2");
    var input_telefono = document.getElementById("telefono");

    input_id_paciente.value = paciente.id;
    input_sip.value = paciente.sip;
    input_nombre.value = paciente.nombre;
    input_apellido1.value = paciente.apellido1;
    input_apellido2.value = paciente.apellido2;
    input_telefono.value = paciente.telefono;
}

/**
 * Devuelve el numero de registros que se deben mostrar en la tabla
 * @returns numero de registros a mostrar
 */
function getNumofRows(){
    var num_registros = document.getElementById("num_registros").value;
    return num_registros;
}

/**
 * Elimina todas las filas de la tabla que se le pase
 * @param table tabla que se desea limpiar 
 */
function cleanTable(table){
    while(table.rows.length > 0){
            table.deleteRow(0);
    }
}

/**
 * Recoge la informacion de un medico y la inserta en el formulario
 * @param id id del medico
 */
function getDataofPacientes(id){
    const data = {
        action:"get",
        filter_field:"id",
        filter_value:id
    }
    fetch(SW, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((response) => {
        setDataIntoForm(response.data[0]);
    }).catch(error=>alert(error))
}

/**
 * Muestra el medico
 * @param id 
 */
function setFormForPaciente(id){
    displayForm();
    getDataofPacientes(id);
}

/**
 * Muestra el formulario para la actualización de un registro
 */
function displayForm(){
    var form = document.getElementById("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
}

function sendForm(){
    //Recoger valores de los inputs del formulario
    var id_paciente = document.getElementById("id_paciente").value;
    var sip = document.getElementById("sip").value;
    var nombre = document.getElementById("nombre").value;
    var apellido1 = document.getElementById("apellido1").value;
    var apellido2 = document.getElementById("apellido2").value;
    var telefono = document.getElementById("telefono").value;

    var data = {
        action: "update",
        fields_to_update: {
            "id_paciente": id_paciente,
            "sip": sip,
            "nombre": nombre,
            "apellido1": apellido1,
            "apellido2": apellido2,
            "telefono": telefono,
        } 
    }

    fetch(SW, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then((response) => {
        console.log(response);
        if(response.data=="OK"){
            getPacientes();
        }
    }).catch(error=>alert(error))
}

/**
 * Solicita todos los registros al sw y los muestra en una tabla
 */
function getPacientes(pagina=1){
    var row_number = getNumofRows();
    if(row_number==0){
        //Valor por defecto
        row_number = 10;
    }
    const data = {
        action: "get",
        num_rows: row_number,
        n_pagina: pagina
    }
    fetch(SW, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        var tbody = document.getElementsByTagName("tbody")[0];
        cleanTable(tbody);
        for (var i = 0; i < data.data.length; i++){
            var tr = document.createElement("tr");

            //Creación de los td para los campos de la tabla
            var td_id = document.createElement("td");
            var td_sip = document.createElement("td");
            var td_dni = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_apellido1 = document.createElement("td");
            var td_apellido2 = document.createElement("td");
            var td_telefono = document.createElement("td");
            var td_sexo = document.createElement("td");
            var td_eliminar = document.createElement("td");
            var td_actualizar = document.createElement("td");

            //Agrega información a la tabla
            td_id.innerHTML = data.data[i].id;
            td_sip.innerHTML = data.data[i].sip;
            td_dni.innerHTML = data.data[i].dni;
            td_nombre.innerHTML = data.data[i].nombre;
            td_apellido1.innerHTML = data.data[i].apellido1;
            td_apellido2.innerHTML = data.data[i].apellido2;
            td_telefono.innerHTML = data.data[i].telefono;
            td_sexo.innerHTML = data.data[i].sexo;

            //Boton Actualizar y sus atributos
            var link_actualizar = document.createElement("button");
            link_actualizar.setAttribute('onclick', "setFormForPaciente("+data.data[i].id+")");
            link_actualizar.setAttribute("class","actualizar");
            link_actualizar.setAttribute("id",data.data[i].id);
            link_actualizar.innerHTML="Actualizar"

            //Boton Eliminar y sus atributos
            var link_eliminar = document.createElement("button");
            link_eliminar.setAttribute('onclick', 'eliminarPaciente('+data.data[i].id+')')
            link_eliminar.setAttribute("class","eliminar");
            link_eliminar.innerHTML="Eliminar"

            td_actualizar.appendChild(link_actualizar);
            td_eliminar.appendChild(link_eliminar);

            //Agregar tds al tr 
            tr.appendChild(td_id);
            tr.appendChild(td_sip);
            tr.appendChild(td_dni);
            tr.appendChild(td_nombre);
            tr.appendChild(td_apellido1);
            tr.appendChild(td_apellido2);
            tr.appendChild(td_telefono);
            tr.appendChild(td_sexo);
            tr.appendChild(td_actualizar)
            tr.appendChild(td_eliminar);
            tbody.appendChild(tr);
        }
    }).catch(error=>alert(error))
}

/**
 * Solicita al SW eliminar un medico de la base de datos
 * @param id id del medico que se desea eliminar 
 */
function eliminarPaciente(id){
    var eliminar = confirm("¿Desea eliminar el médico?");
    if(eliminar){
        const data = {
            action: 'delete',
            field: id
        }
        fetch(SW, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(
            response => response.json()
        ).then((response)=>{
            console.log(response.data);
            alert("Se ha eliminado el paciente");
            getTotalCount();
            var rows_n = getNumofRows();
            var pagina = document.getElementById("paginador_num_registros").value;
            getPacientes(rows_n * pagina);
        }).catch((error)=>{
            alert(error);
        }) 
    }
    else{
        alert("No se ha eliminado el paciente");
    }
}

/**
 * Cambia de pagina y muestra los registros de esa pagina
 * @param paginador paginador que invoca la funcion 
 */
function cambiarPagina(paginador) {
    var paginaActual = document.getElementById("paginador_num_registros").value;
    const nPaginas = document.getElementById("nPaginas").value;
    const num_registros = document.getElementById("num_registros").value;
    if(paginador==1){
        paginaActual = 1;
        getPacientes();
    } else if(paginador==2){
        if(Number(paginaActual)>1){
            paginaActual=Number(paginaActual)-1;
            if(paginaActual==1){
                getPacientes();
            }
        }
        getPacientes((paginaActual-1)*num_registros);
    } else if(paginador==3){
        paginaActual=Number(paginaActual)+1;
        if(Number(nPaginas)<paginaActual){
            paginaActual--;
        }
        getPacientes((paginaActual-1)*num_registros);
    } else {
        console.log(nPaginas, document.getElementById("nPaginas").value);
        paginaActual = nPaginas;
        ultimoRegistro = nPaginas * num_registros;
        console.log("Ult. "+ultimoRegistro+" "+"Pagina act. "+" "+nPaginas+" "+"numRegistros. "+num_registros);
        getPacientes(Number(nPaginas*num_registros));
    }
    document.getElementById("paginador_num_registros").value=paginaActual;
}

/**
 * Inserta en el documento HTML el total de registros de la tabla y el numero de paginas
 */
function getTotalCount() {
    const data = {
        action: "get",
        special_field: "count"
    }
    fetch(SW, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response=>response.json())
    .then((response)=>{
        const nTotalRegistros=response.data[0]["count(*)"];
        const nFilas = getNumofRows();
        document.getElementById("total_registros").innerHTML=nTotalRegistros;
        document.getElementById("nPaginas").innerHTML=Math.ceil(nTotalRegistros/nFilas);
    }).catch(error=>alert(error))
}

/**
 * Muestra el formulario para insertar un medico
 */
function displayFormForInsert() {
    var form = document.getElementById("formInsertar");
    if(form.style.display=="flex"){
        form.style.display="none";
    } else{
        form.style.display = "flex";
        form.style.flexDirection = "column"; 
    }
}

/**
 * Envía el formulario al SW para insertar un registro nuevo en la base de datos
 */
function sendFormInsert() {
    const sip = document.getElementById("sip_insert").value;
    const dni = document.getElementById("dni_insert").value;
    const nombre = document.getElementById("nombre_insert").value;
    const apellido1 = document.getElementById("apellido1_insert").value;
    const apellido2 = document.getElementById("apellido2_insert").value;
    const telefono = document.getElementById("telefono_insert").value;
    const data = {
        action: "insert",
        values: {
            sip: sip,
            dni: dni,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            telefono: telefono
        }
    }
    fetch(SW, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response=>response.json())
    .then((response)=>{
        alert("Médico insertado correctamente");
    }).catch((error)=>alert(error));
}