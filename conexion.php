<?php

class PDOConnection {
    private static $instance;
    private $pdo;
    private $dsn = "mysql:dbname=hospital;host=localhost;charset=utf8";
    private $user = "root";
    private $pass = "";

    private function __construct() {
        try{
            $this->pdo = new PDO($this->dsn, $this->user, $this->pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    /**
     * Devuelve una instancia de la clase PDOConnection
     * @return PDO
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new PDOConnection();
        }
        return self::$instance->pdo;
    }
}