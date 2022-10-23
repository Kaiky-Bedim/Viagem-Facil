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

    //Este método garante que o cartão realmente existe no sistema
    public function GaranteCartaoExiste(){
        //Montando o SQL para garantir se existe este cartão no sistema
        $sql = "select * from Cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        //Recuperando se foi encontrado algum cartão com essas características
        $existe = $res->num_rows;

        //If para retornar true caso encontrado e false caso não encontrado
        if($existe > 0){
            return true;
        }else{
            return false;
        }
    }

    //Este método garante que o cartão não está bloqueado para uso
    public function GaranteCartaoNaoBloqueado(){
        //Montando o SQL para recuperar a situação de Bloqueio do Cartão
        $sql = "select Bloqueado from Cartao where CPFProprietario = '".$this->cpf."' and NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresaCartao."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        //Recuperando efetivamente o status do Cartão
        $dado = mysqli_fetch_assoc($res);
        $bloqueado = $dado["Bloqueado"];

        return $bloqueado;
    }

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
    }

    #PERCURSO
    public function PegarPercurso($id_Percurso){
        $sql = "SELECT * FROM percursos where NumeroLinha = ".$id_Percurso.";";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        $dado = mysqli_fetch_assoc($res);
        $id = $dado['NumeroLinha'];
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