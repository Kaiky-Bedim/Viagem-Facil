<?php

//Classe responsável por Bloquear ou Ddesbloquear os cartões do sistema
class Bloquear{
    private $cpf;
    private $con;
    private $numSerie;
    private $numFabrica;
    private $bloqueado;

    //Função responsável por alterar a situação de Bloqueio do Cartão
    public function BloquearPasse($cpf,$numSerie, $numFabrica, $bloqueado, $con){
        $this->con = $con;
        $this->numSerie = $numSerie;
        $this->numFabrica = $numFabrica;
        $this->cpf = $cpf;
        $this->bloqueado = $bloqueado;

        //Verifica a situação do Cartão selecionado, para Bloqueá-lo ou Desbloqueá-lo
        if($this->bloqueado == 0){
            $sql = "update cartao set Bloqueado = 0 where NumeroSerie = '".$this->numSerie."' and NumeroFabrica = '".$this->numFabrica."';";
            $res = mysqli_query($this->con->getConexao(), $sql);

            //Verificando a situação da query e retornando as mensagens de acordo
            if($res == 1){
                return "Cartão desbloqueado com sucesso !";
            }else{
                return "Ocorreu um problema inesperado !";
            }
        }else if($this->bloqueado == 1){
            $sql = "update cartao set Bloqueado = 1 where NumeroSerie = '".$this->numSerie."' and NumeroFabrica = '".$this->numFabrica."';";
            $res = mysqli_query($this->con->getConexao(), $sql);

            //Verificando a situação da query e retornando as mensagens de acordo
            if($res == 1){
                return "Cartão bloqueado com sucesso !";
            }else{
                return "Ocorreu um problema inesperado !";
            }   
        }
    }
}

?>