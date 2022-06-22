<?php

class Login{
    public $cpf;
    public $senha;
    public $conexao;

    public function FazerLogin($cpf, $senha, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;
        $this->senha = $senha;

        $sql = "select cpf, senha from Senhas where cpf = '".$this->cpf."' and senha = '".$this->senha."';";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        if(mysqli_num_rows($res) != 1){
            return false;
        }else{
            return true;
        }

    }

}

?>