<?php
/**
 * Servicio WEB para obtener info de la BD
 */
require 'conexion.php';
require '../Model/Paciente.php';

//Parametros FETCH
$data = json_decode(file_get_contents('php://input'), true);

$action = isset($data['action'])? $data['action']:'get';

$paginated = isset($data['paginated'])? $data['paginated']: true;

$page = isset($data['page'])? $data['page']:1;

$offset = isset($data['offset'])? $data['offset']:10;

$arrFilter = isset($data['filter'])? $data['filter']:array();

$arrData = isset($data['data'])?$data['data']:array();

//Parseo a BOOL

if($paginated === 'true' || $paginated === true)
    $paginated = true;
else
    $paginated = false;

try{
    switch ($action){
        case "get":
            $json = json_encode(array(
                "success" => true,
                "msg" => "Listado alumnos",
                "data" => $data::getArray($con, $arrFilters, $paginated, $starts, $numFields)
            ));
            break;

        case "insert":
            $dni=isset($arrData["DNI"]) ? $arrData["DNI"]:null;
            $nombre=isset($arrData["NOMBRE"]) ? $arrData["NOMBRE"]:null;
            $apellidos1=isset($arrData["APELLIDO_1"]) ? $arrData["APELLIDO_1"]:null;

            $paciente = new Paciente($dni, $nombre, $apellidos1);
            $paciente->insert();

            $msg = "Paciente Insertado con exito";
            break;

        default:
            $json = json_encode(array(
                "success"=> false,
                "msg"=>"Fallo en el formato"
            ));
            break;
    }
}catch(Exception $e){
    $json = json_encode(array(
        "success"=>"false",
        "msg"=>$e->getMessage()
    ));
}

echo $json;
exit();




?>