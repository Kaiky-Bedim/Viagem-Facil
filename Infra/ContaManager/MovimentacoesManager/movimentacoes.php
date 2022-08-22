<?php

//Classe para recuperar os dados da Movimentação de um Cartão Específico
class Movimentacoes implements JsonSerializable{
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
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $index = 0;
        
        //Setando os valores do Objeto nos arrays
        foreach($rows as $row){
            $this->valor[$index] = $row['Valor'];
            $this->dataMovimentacao[$index] = $row['DataMovimentacao'];
            $this->tipoMovimentacao[$index] = $row['TipoMovimentacao'];
            $this->numeroSerie = $numeroSerie;
            $this->empresaCartao = $empresaCartao;
            $this->idPercurso[$index] = $row['Id_Percurso'];
            $index++;
        }
    }

    //Métodos que retornam as Movimentações de um único cartão
    public function GetValores(){
        return json_encode($this->valor);
    }

    public function GetDataMovimentacoes(){
        return json_encode($this->dataMovimentacao);
    }

    public function GetTipoMovimentacoes(){
        return json_encode($this->tipoMovimentacao);
    }

    public function GetIdPercursos(){
        return json_encode($this->idPercurso);
    }

    //Métodos para recuperar informações básicas do cartão cujas Movimentações estão atribuidas aqui
    public function GetNumeroSerie(){
        return $this->numeroSerie;
    }

    public function GetEmpresaCartao(){
        return $this->empresaCartao;
    }

    //Este método vem da Interface que essa classe implementa, ele permite que convertamos objetos Movimentacoes em JSON
    public function jsonSerialize() {
        return [
            'valor' => $this->GetValores(),
            'dataMovimentacao' => $this->GetDataMovimentacoes(),
            'tipoMovimentacao' => $this->GetTipoMovimentacoes(),
            'numeroSerieCartao' => $this->numeroSerie,
            'empresaCartao' => $this->empresaCartao,
            'idPercurso' => $this->GetIdPercursos(),
        ];
    }
}

?>