<?php

require("../BD/conexao.php");

class Autenticador{
    //Método que verifica se um usuário está autenticado
    public function GaranteAutenticacao(){
        session_start();
        if(isset($_SESSION['cpf'])){
            $con = new Conexao();

            //Query para verificar se um Usuário com este CPF existe no BD
            $sql = "select * from Senhas where CPF = sha(".$_SESSION['cpf'].")";
            $res = mysqli_query($con->getConexao(), $sql);

            //Verificando se o CPF armazenado nas Sessions corresponde a um Usuário existente no BD
            if($res->num_rows > 0){
                return true;
            }else{
                return false;
            }
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