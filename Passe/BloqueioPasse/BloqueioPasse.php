<?php
class Bloquear{
    private $cpf;
    private $con;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;

    public function BloquearPasse($cpf,$numSerie, $numFabrica, $bloqueado, $con){
        $this->con = $con;
        $this->numSerie = $numSerie;
        $this->numFabrica = $numFabrica;
        $this->cpf = $cpf;
        $this->bloqueado = $bloqueado;

        if($this->bloqueado == 0){
            $sql = "update cartao set Bloqueado = 0 where NumeroSerie = '".$this->numSerie."' and NumeroFabrica = '".$this->numFabrica."';";
            $res = mysqli_query($this->con->getConexao(), $sql);
        }else if($this->bloqueado == 1){
            $sql = "update cartao set Bloqueado = 1 where NumeroSerie = '".$this->numSerie."' and NumeroFabrica = '".$this->numFabrica."';";
            $res = mysqli_query($this->con->getConexao(), $sql);
        }

    }

}

?>