<?php

class Movimentacoes{
    private $valor;
    private $dataMovimentacao;
    private $tipoMovimentacao;
    private $numeroSerie;
    private $empresaCartao;
    private $idPercurso;

    public function SetAtributosMovimentacoes($con, $numeroSerie, $empresaCartao){
        $sql = "select * from Movimentacoes where numeroSerieCartao = '".$numeroSerie."' && empresaCartao = '".$empresaCartao."';";
        $res = mysqli_query($con->getConexao(), $sql);
        $row = mysqli_fetch_assoc($res);
        var_dump($row);
        // $this->rg = $row['RG'];
        // $this->nome = $row['Nome'];
        // $this->dataNascimento = $row['DataNascimento'];
        // $this->telefone1 = $row['Telefone1'];
        // $this->telefone2 = $row['Telefone2'];
        // $this->email = $row['Email'];
        // $this->estado = $row['Estado'];
        // $this->cidade = $row['Cidade'];
        // $this->rua = $row['Rua'];
        // $this->complemento = $row['Complemento'];
        // $this->numero = $row['Numero'];
        // $this->cep = $row['CEP'];
    }
}

?>