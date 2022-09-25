<?php

class Conexao{
    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $db = "viagemfacil_db";
    private $con;

    //O método die é executado quando ocorre um erro na conexão, ele manda uma mensagem sobre o erro
    function __construct(){
        $this->con = mysqli_connect($this->host, $this->user, $this->pass, $this->db) or die
        ($this->con->error."\nSem conexão com o servidor, Host=".$this->host." User=".$this->user." Pass=".$this->pass." Db=".$this->db);
    }

    function getConexao(){
        return $this->con;
    }

    function FecharConexao(){
        mysqli_close($this->con);
    }
}

?>