<?php

class Autenticador{
    //Método que verifica se um usuário está autenticado
    public function GaranteAutenticacao(){
        session_start();
        if(isset($_SESSION['cpf'])){
            return true;
        }
        return false;
    }

    //Método que desloga o usuário, remove as sessions do lado do servidor
    public function Logout(){
        session_start();
        unset($_SESSION['cpf']);
    }
}

?>