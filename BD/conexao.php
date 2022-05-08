<?php

class Conexao{
    private $host = "localhost";
    private $user = "root";
    //No meu BD a senha é 96917581888, no de vocês ou é nada ou é o que vocês escolheram
    //private $pass = "";
    private $pass = "96917581888";
    private $db = "viagemfacil_db";
    private $con;

    function Conexao(){
        $this->con = mysqli_connect($this->host, $this->user, $this->pass, $this->db);
    }

    function getConexao(){
        return $this->con;
    }

    function FecharConexao(){
        mysqli_close($this->con);
    }
}

?>