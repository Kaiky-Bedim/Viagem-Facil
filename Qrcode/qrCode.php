<?php

class Qrcode{
    private $cpf;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;
    private $conexao;
    private $qrcode;

    public function ImagemQrcode($cpf, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;

        $sql = "select NumeroSerie,NumeroFabrica,Bloqueado from cartao where CPFProprietario = '".$this->cpf."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
        while ($dado = $res->fetch_array()){
            $this->numSerie = $dado["NumeroSerie"];
            $this->numFabrica = $dado["NumeroFabrica"];
            $this->bloqueado = $dado["Bloqueado"];
        }

        $qrcode = sha1("$this->cpf"."$this->numSerie"."$this->numFabrica");
        if($this->bloqueado == 1){
            return false;
        }else{
            return $qrcode;
        }
    }

    /*public function Chama($cpf, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;

        $sql = "select NumeroSerie from Cartao where CPFProprietario = '".$cpf."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
    }*/

    
}
?>