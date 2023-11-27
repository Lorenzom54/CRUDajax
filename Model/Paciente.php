<?php
    /**
     * Atributos de medico
     */

    $ID;
    $DNI;
    $NOMBRE;
    $APELLIDO_1;
    $APELLIDO_2;
    $SEXO;

    //Tabla de la bd
    private static $tableName = "pacientes";

    /**
     * Constructor
     * Inicializa los pacientes.
     */

     function __construct($id=null, $dni=null, $nombre=null, $apellido_1=null, $apellido_2=null, $sexo=null){
        $this->ID = $id;
        $this->DNI = $dni;
        $this->NOMBRE = $nombre;
        $this->APELLIDO_1 = $apellido_1;
        $this->APELLIDO_2 = $apellido_2;
        $this->SEXO = $sexo;
     }

     //Metodos
     /**
      * Metodo Magico GET
      * Devulve el atributo pasado como parametro.
      */

      function __get($property){
        if(property_exists($this, $property)){
            return $this->$property;
        }
      }

      /** 
       * Metodo magico SET
       * Establece el atributo que se le indique
       */
      function __set($property, $value){
        if(property_exists($this, $property)){
          $this->$property = $value;
        }
        return $this;
      }


?>