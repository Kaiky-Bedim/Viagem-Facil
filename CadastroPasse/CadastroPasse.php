<?php

class Passe{
    public $numSerie;
    public $numFabrica;
    public $tipoCartao;
    public $bloqueado;
    public $cpfPropretario;
    public $saldo;
    public $conexao;

    public function CadastroPasse($numSerie, $numFabrica, $tipoCartao, $bloqueado, $cpfPropretario, $saldo){
        $this->numSerie = $numSerie;
        $this->numFabrica = $numFabrica;
        $this->tipoCartao = $tipoCartao;
        $this->bloqueado = $bloqueado;
        $this->cpfPropretario = $cpfPropretario;   
        $this->saldo = $saldo;
    }

    public function CadastrarPasse($con){
        $this->conexao = $con;
        //insert into Cartao (NumeroSerie, NumeroFabrica, TipoCartao, Bloqueado, CPFProprietario, Saldo) values ('NumeroS', 'NumeroFab', 'Normal', false, '123', 120);
        $sql = "insert into Cartao (NumeroSerie, NumeroFabrica, TipoCartao, Bloqueado, CPFProprietario, Saldo) values ('".$this->numSerie."',
         '".$this->numFabrica."', '".$this->tipoCartao."', '".$this->bloqueado."', '".$this->cpfPropretario."', '".$this->saldo."');";

        $resCadastroPasse = mysqli_query($this->conexao->getConexao(), $sql);
        $this->conexao->FecharConexao();

        if($resCadastroPasse != 1){
            return false;
        }
        return true;
    }

}


?>