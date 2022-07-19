<?php

class Cartoes implements JsonSerializable{
    private $qtdCartoes;

    private $numeroSerie;
    private $numeroFabrica;
    private $tipoCartao;
    private $situacao;
    private $empresa;
    private $bloqueado;
    private $cpfProprietario;
    private $saldo;

    public function __construct()
    {
        $this->cpfProprietario = $_SESSION['cpf'];
    }

    public function SetAtributosCartoes($con){
        $sql = "select * from cartao where cpfproprietario = '".$this->cpfProprietario."';";
        $res = mysqli_query($con->getConexao(), $sql);
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $this->qtdCartoes = count($rows);
        $index = 0;

        foreach($rows as $row){
            $this->numeroSerie[$index] = $row['NumeroSerie'];
            $this->numeroFabrica[$index] = $row['NumeroFabrica'];
            $this->tipoCartao[$index] = $row['TipoCartao'];
            $this->situacao[$index] = $row['Situacao'];
            $this->empresa[$index] = $row['Empresa'];
            $this->bloqueado[$index] = $row['Bloqueado'];
            $this->cpfProprietario = $row['CPFProprietario'];
            $this->saldo[$index] = $row['Saldo'];
            $index++;
        }
    }

    public function GetQtdCartoes(){
        return $this->qtdCartoes;
    }

    //Métodos que retornam os valores dos campos de um único cartão
    public function GetNumeroSerie($index){
        return $this->numeroSerie[$index];
    }

    public function GetNumeroFabrica($index){
        return $this->numeroFabrica[$index];
    }

    public function GetTipoCartao($index){
        return $this->tipoCartao[$index];
    }

    public function GetSituacao($index){
        return $this->situacao[$index];
    }

    public function GetEmpresa($index){
        return $this->empresa[$index];
    }

    public function GetBloqueado($index){
        return $this->bloqueado[$index];
    }

    public function GetCPFProprietario(){
        return $this->cpfProprietario;
    }

    public function GetSaldo($index){
        return $this->saldo[$index];
    }

    //Métodos que retornam os valores dos campos de todos os cartões
    public function GetNumeroSeries(){
        return json_encode($this->numeroSerie);
    }

    public function GetNumeroFabricas(){
        return json_encode($this->numeroFabrica);
    }

    public function GetTipoCartoes(){
        return json_encode($this->tipoCartao);
    }

    public function GetSituacoes(){
        return json_encode($this->situacao);
    }

    public function GetEmpresas(){
        return json_encode($this->empresa);
    }

    public function GetBloqueados(){
        return json_encode($this->bloqueado);
    }

    public function GetSaldos(){
        return json_encode($this->saldo);
    }

    //Este método vem da Interface que essa classe implementa, ele permite que convertamos objetos Usuario em JSON
    public function jsonSerialize() {
        return [
            'numeroSerie' => $this->GetNumeroSeries(),
            'numeroFabrica' => $this->GetNumeroFabricas(),
            'tipoCartao' => $this->GetTipoCartoes(),
            'situacao' => $this->GetSituacoes(),
            'empresa' => $this->GetEmpresas(),
            'bloqueado' => $this->GetBloqueados(),
            'CPFProprietario' => $this->GetCPFProprietario(),
            'saldo' => $this->GetSaldos(),
        ];
    }
}

?>