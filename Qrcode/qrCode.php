<?php

class Qrcode{
    private $cpf;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;
    private $conexao;
    private $qrcode;

    //Falta gets e sets

    public function ImagemQrcode($cpf, $numSerie, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;

        $espaco = " ";
        $subs = "";
        $numSerieFinal = str_replace($espaco, $subs, $numSerie);
        $this->numSerie = $numSerieFinal;

        $sql = "select NumeroFabrica, Bloqueado from cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
        while ($dado = mysqli_fetch_assoc($res)){
            $this->numFabrica = $dado["NumeroFabrica"];
            $this->bloqueado = $dado["Bloqueado"];
        }
        
        #Tudo certo agora
        $qrcode = sha1("$this->cpf"."$this->numSerie"."$this->numFabrica");
        
        if($this->bloqueado == 1){
            $qrcode = sha1("Bloqueado");
            return $qrcode;
        }else{
            return $qrcode;
        }
    }

    #Colocar sets e gets

    
    
}
?>