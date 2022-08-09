<?php

class Pagamento{
    private $saldo;
    private $numSerie;
    private $empresa;
    private $con;

    //Estas são as funções Get's que podem ser usadas para recuperar as informações do Pagamento
    public function getSaldo(){
        return $this->saldo;
    }

    public function getNumSerie(){
        return $this->numSerie;
    }

    public function getEmpresa(){
        return $this->empresa;
    }

    public function getCon(){
        return $this->con;
    }

    //Estas são as funções Set's que devem ser utilizadas antes de alterarmos o Saldo do Passe informado
    public function setSaldo($saldo){
        $saldoFinal = (double) $saldo;
        $this->saldo = $saldoFinal;
    }

    public function setNumSerie($numSerie){
        $espaco = " ";
        $subs = "";
        $numSerieFinal = str_replace($espaco, $subs, $numSerie);
        $this->numSerie = $numSerieFinal;
    }

    public function setEmpresa($empresa){
        $this->empresa = $empresa;
    }

    public function setCon($conexao){
        $this->con = $conexao;
    }

    //Esta função é responsável por Alterar o Saldo do Cartão com base nas informações que foram Setadas antes
    public function AlterarSaldo(){
        $sql = "update Cartao set Saldo = '".$this->saldo."' where NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresa."';";
        $res = mysqli_query($this->con->getConexao(), $sql);
        return $res;
    }
}

?>