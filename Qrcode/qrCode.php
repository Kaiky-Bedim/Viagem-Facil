<?php

class Qrcode{
    private $cpf;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;
    private $conexao;
    private $qrcode;

    public function ImagemQrcode($cpf, $numSerie, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;
        $this->numSerie = $numSerie;

        $sql = "select NumeroFabrica, Bloqueado from cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
        while ($dado = mysqli_fetch_assoc($res)){
            $this->numFabrica = $dado["NumeroFabrica"];
            $this->bloqueado = $dado["Bloqueado"];
        }
        #Os valores vem vazios!!!
        #Os valores estão com espaços
        $qrcode = sha1("$this->cpf"."$this->numSerie"."$this->numFabrica");
        #$qrcode = $this->cpf.$this->numSerie.$this->numFabrica;
        if($this->bloqueado == 1){
            return false;
        }else{
            return $qrcode;
        }
    }

    
    
}
?>