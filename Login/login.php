<?php

class Login{
    private $cpf;
    private $senha;
    private $conexao;

    public function FazerLogin($cpf, $senha, $con){
        $this->conexao = $con;
        $this->cpf = $cpf;
        $this->senha = $senha;

        $sql = "select cpf, senha from Senhas where cpf = sha('".$this->cpf."') and senha = sha('".$this->senha."');";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        $this->conexao->FecharConexao();
        if(mysqli_num_rows($res) != 1){
            return false;
        }else{
            return true;
        }

    }

}

?>