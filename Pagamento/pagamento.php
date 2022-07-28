<?php

class Pagamento{
    private $saldo;
    private $numSerie;
    private $cpf;
    private $con;

    #Gets
    public function getSaldo(){
        return $this->saldo;
    }

    public function getNumSerie(){
        return $this->numSerie;
    }

    public function getCpf(){
        return $this->cpf;
    }

    public function getCon(){
        return $this->con;
    }

    #Sets
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

    public function setCpf($cpf){
        $this->cpf = $cpf;
    }

    public function setCon($conexao){
        $this->con = $conexao;
    }

    #Funções
    public function AlterarSaldo(){      
        $saldoAntigo = 0.0;

        $sql = "select Saldo from cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
        $res = mysqli_query($this->con->getConexao(), $sql);
        while ($dado = mysqli_fetch_assoc($res)){
            $saldoAntigo = $dado["Saldo"];
        }

        $saldoNovo = $this->saldo + $saldoAntigo;

        $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
        $res = mysqli_query($this->con->getConexao(), $sql);

    }
    

}





?>