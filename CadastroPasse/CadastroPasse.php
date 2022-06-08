<?php

class Passe{
    public $serial;
    public $donoPasse;
    public $tipoCartao;
    public $conexao;

    public function CadastrarPasse($serial, $donoPasse, $tipoCartao, $con){
        $this->conexao = $con;
        $this->serial = $serial;
        $this->donoPasse = $donoPasse;
        $this->tipoCartao = $tipoCartao;
        
        

    }

}


?>