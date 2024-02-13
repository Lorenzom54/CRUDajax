<?php
/**
 * Servicio WEB para obtener info de la BD
 */
require '../Model/Paciente.php';


$data = json_decode(file_get_contents("php://input"), true);

//NUM PAGINAS POR DEFECTO

$num_rows = 10;
$pagina = 1;

if(!empty($data['num_rows'])){
    $num_rows = $data['num_rows'];
}

if(!empty($data['n_pagina'])){
    $pagina = $data['n_pagina'];
}

$res = Paciente::getPacientes($num_rows, $pagina);

switch($data['action']){
    case 'get':
        if(isset($data['filter_field']) && !empty($data['filter_field'])){
            $res = Paciente::getPacientes($num_rows, null,null,$data['filter_field'], $data['filter_value']);
        } else if(isset($data['special_field'])){
            $res = Paciente::getPacientes(100000, null, "count(*)");
        }
        break;

    case 'insert':
        $sip = $data['values']['sip'];
        $dni = $data['values']['dni'];
        $nombre = $data['values']['nombre'];
        $apellido1 = $data['values']['apellido1'];
        $apellido2 = $data['values']['apellido2'];
        $telefono = $data['values']['telefono'];
        $paciente = new Paciente(null, null, $sip, $dni, $nombre, $apellido1, $apellido2, $telefono);
        $res = $paciente->insert()?"OK":null;

    case 'update':
        $id = $data['fields_to_update']['id_paciente'];
        $sip = $data['fields_to_update']['sip'];
        $nombre = $data['fields_to_update']['nombre'];
        $apellido1 = $data['fields_to_update']['apellido1'];
        $apellido2 = $data['fields_to_update']['apellido2'];
        $telefono = $data['fields_to_update']['telefono'];
        $paciente = new Paciente(null, $id, $sip, null,$nombre, $apellido1, $apellido2, $telefono);
        $paciente->update();
        $res = "OK";
        break;

    case 'delete':
        $field = $data['field'];
        $datosPaciente = Paciente::getPacientes(1, null,null,"id", $field);
        $paciente = new Paciente($datosPaciente[0]);
        $res = $Paciente->delete()?"OK":null;
        break;
}

?>