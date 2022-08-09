<?php
class Leitor{
    private $cpf;
    private $conexao;
    private $numSerie;
    

    #GETS
    public function getCpf(){
        return $this->cpf;
    }

    public function getConexao(){
        return $this->conexao;
    }

    public function getNumSerie(){
        return $this->numSerie;
    }

    #SETS
    public function setCpf($cpf) {
        $this->cpf = $cpf;
    }

    public function setConexao($con) {
        $this->conexao = $con;
    }

    public function setNumSerie($numSerie) {
        $this->numSerie = $numSerie;
    }

    #METODOS
    public function DescontarPasse(){
        $saldoAntigo;
        $tipoCartao;

        $sql = "select Saldo, TipoCartao from Cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        while ($dado = mysqli_fetch_assoc($res)){
            $saldoAntigo = $dado["Saldo"];
            $tipoCartao = $dado["TipoCartao"];
        }

        if($saldoAntigo < 4.50){
            $resp = false;
            return $resp;

        }else{
            if($tipoCartao == "Idoso"){
                $saldoNovo = $saldoAntigo;
    
            }else if($tipoCartao == "Estudantil"){
                $saldoNovo = $saldoAntigo - 2.25;
    
            }else if($tipoCartao == "Comum"){
                $saldoNovo = $saldoAntigo - 4.50;
    
            }
    
            $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."';";
            $res = mysqli_query($this->conexao->getConexao(), $sql);

            $resp = true;
            #Retornar um vetor ???
            return $resp;
        }
    }

    public function GerarPercurso(){
        $numLinha = rand(100, 999);
        $trecho = "Jacareí";
        $veiculo = "Parati Quadrado";

        $sql = "insert into Percursos (NumeroLinha, Trecho, Veiculo) values ('".$numLinha."', '".$trecho."', '".$veiculo."');";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
        
        $sql = "select MAX(Id) as id from Percursos";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        $dado = mysqli_fetch_assoc($res);
        $id = $dado['id'];
        
        return $id;
    }

    public function GerarMovimentacao(){
        $numLinha = rand(100, 999);
        $trecho = "Jacareí";
        $veiculo = "Parati Quadrado";

        $sql = "insert into Percursos (NumeroLinha, Trecho, Veiculo) values ('".$numLinha."', '".$trecho."', '".$veiculo."');";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
        
        $sql = "select MAX(Id) as id from Percursos";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        $dado = mysqli_fetch_assoc($res);
        $id = $dado['id'];
        
        return $id;

    }


}
?>