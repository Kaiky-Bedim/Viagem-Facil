<?php

//Classe para recuperar os dados da Movimentação de um Cartão Específico
class Movimentacoes implements JsonSerializable{
    private $valor;
    private $dataMovimentacao;
    private $tipoMovimentacao;
    private $numeroSerie;
    private $empresaCartao;
    private $cpfProprietario;
    private $idPercurso;

    //Esta função recupera os dados do Cartão Solicitado e atribui as propriedades do Objeto
    public function SetAtributosMovimentacoesCartao($con, $numeroSerie, $empresaCartao){
        $sql = "select * from Movimentacoes where numeroSerieCartao = '".$numeroSerie."' && empresaCartao = '".$empresaCartao."' ORDER BY DataMovimentacao DESC;";
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

    //Esta função recupera todo o histórico de todos os cartões do Usuário ordenados por ordem de data
    public function SetAtributosTodasAsMovimentacoes($con){
        //Atribuindo o cpf do Usuário logado a propriedade CPF da classe
        $this->cpfProprietario = $_SESSION['cpf'];

        $sql = "select * from Movimentacoes where cpfproprietario = '".$this->cpfProprietario."' ORDER BY DataMovimentacao DESC;";
        $res = mysqli_query($con->getConexao(), $sql);
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $index = 0;

        //Setando os valores do Objeto nos arrays
        foreach($rows as $row){
            $this->valor[$index] = $row['Valor'];
            $this->dataMovimentacao[$index] = $row['DataMovimentacao'];
            $this->tipoMovimentacao[$index] = $row['TipoMovimentacao'];
            $this->numeroSerie[$index] = $row['NumeroSerieCartao'];
            $this->empresaCartao[$index] = $row['EmpresaCartao'];
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
        if(is_array($this->numeroSerie)){
            return json_encode($this->numeroSerie);
        }
        return $this->numeroSerie;
    }

    public function GetEmpresaCartao(){
        if(is_array($this->empresaCartao)){
            return json_encode(($this->empresaCartao));
        }
        return $this->empresaCartao;
    }

    //Este método vem da Interface que essa classe implementa, ele permite que convertamos objetos Movimentacoes em JSON
    public function jsonSerialize() {
        return [
            'valor' => $this->GetValores(),
            'dataMovimentacao' => $this->GetDataMovimentacoes(),
            'tipoMovimentacao' => $this->GetTipoMovimentacoes(),
            'numeroSerieCartao' => $this->GetNumeroSerie(),
            'empresaCartao' => $this->GetEmpresaCartao(),
            'idPercurso' => $this->GetIdPercursos(),
        ];
    }
}

?>