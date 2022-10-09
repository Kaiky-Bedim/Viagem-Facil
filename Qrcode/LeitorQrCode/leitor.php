<?php
class Leitor{
    private $cpf;
    private $conexao;
    private $numSerie;
    private $empresaCartao;
    

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

    public function getEmpresaCartao(){
        return $this->empresaCartao;
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

    public function setEmpresaCartao($empresaCartao){
        $this->empresaCartao = $empresaCartao;
    }


    #METODOS

    #DESCONTO
    public function DescontarPasse(){
        
        $sql = "select Saldo, TipoCartao from Cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        while ($dado = mysqli_fetch_assoc($res)){           
            $saldoAntigo = $dado["Saldo"];
            $tipoCartao = $dado["TipoCartao"];
        }

        if($tipoCartao == "Idoso"){
            return true;
            
        //Estudantil sem dinheiro
        }else if($tipoCartao == "Estudantil" && $saldoAntigo < 2.25){
            return false;
            
        //Estudantil com dinheiro
        }else if($tipoCartao == "Estudantil" && $saldoAntigo >= 2.25){
            $saldoNovo = $saldoAntigo - 2.25;
            $desconto = 2.25;

            $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
            $res = mysqli_query($this->conexao->getConexao(), $sql);

            return $desconto;

        //Comum sem dinheiro
        }else if($tipoCartao == "Comum" && $saldoAntigo < 4.50){
            return false;

        //Comum com dinheiro
        }else{
            $saldoNovo = $saldoAntigo - 4.50;
            $desconto = 4.50;

            $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
            $res = mysqli_query($this->conexao->getConexao(), $sql);

            return $desconto;
        }

        /*if($saldoAntigo < 4.50){
            $resp = false;
            return $resp;

        }else{
        
            if($tipoCartao == "Estudantil"){
                $saldoNovo = $saldoAntigo - 2.25;
                $desconto = 2.25;
    
            }else if($tipoCartao == "Comum"){
                $saldoNovo = $saldoAntigo - 4.50;
                $desconto = 4.50;
    
            }
    
            $sql = "update Cartao set Saldo = '".$saldoNovo."' where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
            $res = mysqli_query($this->conexao->getConexao(), $sql);

            return $desconto;
        }*/
    }

    #PERCURSO
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


    #MOVIMENTAÇÃO
    public function GerarMovimentacao($id, $desconto){
        date_default_timezone_set("America/Sao_Paulo");
        $dateTime = date('Y-m-d H:i:s', time());

        $sql = "insert into Movimentacoes (Valor, DataMovimentacao, TipoMovimentacao, NumeroSerieCartao, EmpresaCartao, CPFProprietario, Id_Percurso) values 
        ('".$desconto."', '".$dateTime."', 'Utilização em ônibus', '".$this->numSerie."', '".$this->empresaCartao."', '".$this->cpf."','".$id."');";
        $res = mysqli_query($this->conexao->getConexao(), $sql);
    }


}
?>