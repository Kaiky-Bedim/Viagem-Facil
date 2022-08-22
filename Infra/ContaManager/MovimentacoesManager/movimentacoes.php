<?php

//Classe para recuperar os dados da Movimentação de um Cartão Específico
class Movimentacoes{
    private $valor;
    private $dataMovimentacao;
    private $tipoMovimentacao;
    private $numeroSerie;
    private $empresaCartao;
    private $idPercurso;

    //Esta propriedade recupera os dados do Cartão Solicitado e atribui as propriedades do Objeto
    public function SetAtributosMovimentacoes($con, $numeroSerie, $empresaCartao){
        $sql = "select * from Movimentacoes where numeroSerieCartao = '".$numeroSerie."' && empresaCartao = '".$empresaCartao."';";
        $res = mysqli_query($con->getConexao(), $sql);
        $row = mysqli_fetch_assoc($res);
        
        //Setando os valores do Objeto
        $this->valor = $row['Valor'];
        $this->dataMovimentacao = $row['DataMovimentacao'];
        $this->tipoMovimentacao = $row['TipoMovimentacao'];
        $this->numeroSerie = $numeroSerie;
        $this->empresaCartao = $empresaCartao;
        $this->idPercurso = $row['Id_Percurso'];

        var_dump($this);
    }
}

?>