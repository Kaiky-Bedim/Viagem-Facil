<?php

class Passe{
    private $cpf;
    private $NumSerie;
    private $NumFabrica;
    private $TipoCartao;
    private $situacao;
    private $empresa;
    private $bloqueado;
    private $saldo;
    private $conexao;

    #GETS
    public function getCpf(){
        return $this->cpf;
    }

    public function getNumSerie(){
        return $this->NumSerie;
    }

    public function getNumFabrica(){
        return $this->NumFabrica;
    }

    public function getTipoCartao(){
        return $this->TipoCartao;
    }

    public function getSituacao(){
        return $this->situacao;
    }

    public function getEmpresa(){
        return $this->empresa;
    }

    public function getBloqueado(){
        return $this->bloqueado;
    }

    public function getSaldo(){
        return $this->saldo;
    }

    public function getConexao(){
        return $this->conexao;
    }

    #SETS
    public function setCpf($cpf){
        $this->cpf = $cpf;
    }

    public function setNumSerie($numSerie){
        $espaco = " ";
        $subs = "";
        $numSerieFinal = str_replace($espaco, $subs, $numSerie);
        $this->numSerie = $numSerieFinal;
    }

    public function setNumFabrica($NumFabrica){
        $this->NumFabrica = $NumFabrica;
    }

    public function setTipoCartao($TipoCartao){
        $this->TipoCartao = $TipoCartao;
    }

    public function setSituacao($situacao){
        $this->situacao = $situacao;
    }

    public function setEmpresa($empresa){
        $this->empresa = $empresa;
    }

    public function setBloqueado($bloqueado){
        $this->bloqueado = $bloqueado;
    }

    public function setSaldo($saldo){
        $saldoFinal = (double) $saldo;
        $this->saldo = $saldoFinal;
    }

    public function setConexao($conexao){
        $this->conexao = $conexao;
    }

    #Funções
    


}




?>