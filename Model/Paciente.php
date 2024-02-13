<?php
  require_once('../conexion.php');
    /**
     * Atributos de medico
     */
    class Paciente{

    private $id;
    private $sip;
    private $dni;
    private $nombre;
    private $apellido1;
    private $apellido2;
    private $telefono;


    /**
     * Constructor
     * Inicializa los pacientes.
     */

     public function __construct($arr= null, $id=null, $sip = null, $dni=null, $nombre=null, $apellido1=null, $apellido2=null, $telefono = null){
      if(!is_null($arr)){
        $this->id = $id = $arr['id'];
        $this->sip = $arr['sip'];
        $this->dni = $arr['dni'];
        $this->nombre = $arr['nombre'];
        $this->apellido1 = $arr['apellido1'];
        $this->apellido2 = $arr['apellido2'];
        $this->telefono = $arr['telefono'];
      }else{
        $this->id = $id;
        $this->sip = $sip;
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellido1 = $apellido1;
        $this->apellido2 = $apellido2;
        $this->telefono = $telefono;
      }
     }

     /**
      * Metodo getPacientes
      * Devuelve todos los campos.
      */

      public static function getPacientes($num_rows, $pagina=null, $special_field=null,$filter=null, $filterValues=null){
        $field = is_null($special_field)?"*":$special_field;
        $sql = "select ".$field." from pacientes where true";
        if(!is_null($filter)){
            $sql.=" and ".$filter." = ".$filterValues;
        }
        try{
            $pdo = PDOConnection::getInstance();
            if(is_null($pagina)){
                $pagina="";
            }else{
                $pagina.=", ";
            }
            $sql.=" limit ".$pagina." $num_rows";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }catch(PDOException $e){
            echo $e->getMessage();
            $arr = array();
        }
        return $arr;
    }

    public function insert(){
      try{
          $pdo = PDOConnection::getInstance();
          $stmt = $pdo->prepare("insert into pacientes(sip, dni, nombre, apellido1, apellido2, telefono)
                  values (:sip, :dni, :nombre, :apellido1, :apellido2, :telefono)");
          $stmt->bindParam(':sip', $this->sip);
          $stmt->bindParam(':dni', $this->dni);
          $stmt->bindParam(':nombre', $this->nombre);
          $stmt->bindParam(':apellido1', $this->apellido1);
          $stmt->bindParam(':apellido2', $this->apellido2);
          $stmt->bindParam(':telefono', $this->telefono);
          $res = $stmt->execute();
      } catch(PDOException $e){
          return false;
      }
      return $res;
  }

  public function update(){
    $sql = "update pacientes set sip=:sip, 
    nombre=:nombre,
    apellido1=:apellido1,
    apellido2=:apellido2,
    telefono=:telefono
    where id = :id";
    $arrParams = [
        ':sip' => $this->sip,
        ':nombre' => $this->nombre,
        ':apellido1' => $this->apellido1,
        ':apellido2' => $this->apellido2,
        ':telefono' => $this->telefono,
        ':id' => $this->id
    ];
    try{
        $pdo = PDOConnection::getInstance();
        $stmt = $pdo->prepare($sql);
        $stmt->execute($arrParams);
    }catch(PDOException $e){
        return false;
    }
  }

  public function delete(){
    $sql = "delete from pacientes where id=:id";
    try {
        $pdo = PDOConnection::getInstance();
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $this->id);
        $resultado = $stmt->execute();
        return $resultado;
    }catch(PDOException $e){
        return false;
    }
}


}

?>