<?php

class Passe{
    public $numSerie;
    public $numFabrica;
    public $cpfPropretario;
    public $saldo;
    #faltando tipo do passe aqui e no banco
    public $conexao;

    public function SetPasse($numSerie, $numFabrica, $cpfPropretario, $saldo){
        $this->numSerie = $numSerie;
        $this->numFabrica = $numFabrica;
        $this->cpfPropretario = $cpfPropretario;   
        $this->saldo = $saldo;
    }

    public function CadastrarPasse($con){
        $this->conexao = $con;
        $sql = "insert into Cartao (NumeroSerie, NumeroFabrica, CPFProprietario, Saldo) values ('".$this->numSerie."',
         '".$this->numFabrica."', '".$this->cpfPropretario."', '".$this->saldo."');";

        $this->conexao->FecharConexao();

    }

}


?>