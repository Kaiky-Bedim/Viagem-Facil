<?php
class Leitor{
    private $cpf;
    private $conexao;
    private $qrcode;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;

    public function LerQrcode($cpf,$con,$qrcode){
        $this->conexao = $conexao;
        $this->cpf = $cpf;
        $this->qrcode = $qrcode;

        $sql = "select NumeroSerie,NumeroFabrica, Bloqueado from Cartao where CPFProprietario = '".$cpf."';";
        $res = mysqli_query($this->con->getConexao(), $sql);

        while ($dado = mysqli_fetch_assoc($res)){
            $this->numSerie = $dado["NumeroSerie"];
            $this->numFabrica = $dado["NumeroFabrica"];
            $this->bloqueado = $dado["Bloqueado"];
            if($this->qrcode == sha1("$this->cpf"."$this->numSerie"."$this->numFabrica")){
                $res = true;
                break;
            }
        }

        if($res){
            $sql = "select Saldo, TipoCartao from cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
            $res = mysqli_query($this->con->getConexao(), $sql);
            while ($dado = mysqli_fetch_assoc($res)){
                $saldoAntigo = $dado["Saldo"];
                $tipoCartao = $dado["TipoCartao"];
            }
            
            if($tipoCartao == "Idoso"){
                $saldoNovo = $saldoAntigo;
            }else if($tipoCartao == "Estudantil"){
                $saldoNovo = $saldoAntigo - 2.25;
            }else if($tipoCartao == "Comum"){
                $saldoNovo = $saldoAntigo - 4.50;
            }

            $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
            $res = mysqli_query($this->con->getConexao(), $sql);
        }
    }


}
?>