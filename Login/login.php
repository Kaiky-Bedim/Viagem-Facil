<?php

class Login{
    public string $cpf;
    public string $senha;
    public Conexao $conexao;

    public function FazerLogin(string $cpf, string $senha, Conexao $con){
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