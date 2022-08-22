<?php

class Pagamento{
    private $novoSaldo;
    private $numSerie;
    private $empresa;
    private $valor;
    private $cpf;
    private $con;

    //Estas são as funções Get's que podem ser usadas para recuperar as informações do Pagamento
    public function getNovoSaldo(){
        return $this->saldo;
    }

    public function getNumSerie(){
        return $this->numSerie;
    }

    public function getEmpresa(){
        return $this->empresa;
    }

    //Este getValor recupera apenas quanto foi adicionado ao saldo e não o novo saldo após a Compra
    public function getValor(){
        return $this->valor;
    }

    public function getCon(){
        return $this->con;
    }

    //Estas são as funções Set's que devem ser utilizadas antes de alterarmos o Saldo do Passe informado
    public function setNovoSaldo($saldo){
        $saldoFinal = (double) $saldo;
        $this->novoSaldo = $saldoFinal;
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

    public function setValor($valor){
        $this->valor = $valor;
    }

    public function setCon($conexao){
        $this->con = $conexao;
    }

    //Esta função é responsável por Alterar o Saldo do Cartão com base nas informações que foram Setadas antes
    public function AlterarSaldo(){
        $sql = "update Cartao set Saldo = '".$this->novoSaldo."' where NumeroSerie = '".$this->numSerie."' and Empresa = '".$this->empresa."';";
        $res = mysqli_query($this->con->getConexao(), $sql);
        return $res;
    }

    //Esta função é responsável por Cadastrar a Movimentação gerada no BD
    public function CadastraMovimentacao(){
        //Recuperando a data exata da Movimentação e o CPF do usuário que a gerou
        date_default_timezone_set("America/Sao_Paulo");
        $dateTime = date('Y-m-d H:i:s', time());

        $this->cpf = $_SESSION['cpf'];

        $sql = "insert into Movimentacoes values (0, ".$this->valor.", '".$dateTime."', 'Recarga', '".$this->numSerie."', '".$this->empresa."', '".$this->cpf."',null);";
        $res = mysqli_query($this->con->getConexao(), $sql);
        return $res;
    }
}

?>