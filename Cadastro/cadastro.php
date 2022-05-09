<?php

class Cadastro {
    public string $nome;
    public string $email;
    public string $cpf;
    public string $rg;
    public string $senha;
    public string $confirmSenha;
    public string $estado;
    public string $cidade;
    public string $rua;
    public int $numero;
    public string $cep;
    public string $complemento;
    public string $telefone1;
    public string $telefone2;
    public Conexao $conexao;

    public function Cadastro($nome, $email, $cpf,
                      $rg, $senha, $confirmSenha,
                      $estado, $cidade, $rua, $numero,
                      $cep, $complemento, $telefone1, $telefone2){
        $this->nome = $nome;
        $this->email = $email;
        $this->cpf = $cpf;
        $this->rg = $rg;
        $this->senha = $senha;
        $this->confirmSenha = $confirmSenha;
        $this->estado = $estado;
        $this->cidade = $cidade;
        $this->rua = $rua;
        $this->numero = $numero;
        $this->cep = $cep;

        if($complemento != ""){
            $this->complemento = "'".$complemento."'";
        }else{
            $this->complemento = "null";
        }

        $this->telefone1 = $telefone1;
        $this->telefone2 = $telefone2;

        if($telefone2 != ""){
            $this->telefone2 = "'".$telefone2."'";
        }else{
            $this->telefone2 = "null";
        }
    }

    public function Cadastrar(Conexao $con){
        $this->conexao = $con;

        $sql = "insert into DadosCadastrais values('".$this->cpf."', '".$this->rg."', '".$this->nome."', '".$this->telefone1."', ".$this->telefone2.", '".$this->email."', 
        '".$this->estado."', '".$this->cidade."', '".$this->rua."', ".$this->complemento.", ".$this->numero.", '".$this->cep."');";
        $resCadastro = mysqli_query($this->conexao->getConexao(), $sql);

        $sql = "insert into Senhas values('".$this->cpf."', '".$this->senha."');";
        $resSenha = mysqli_query($this->conexao->getConexao(), $sql);

        $this->conexao->FecharConexao();
        if($resCadastro != 1 || $resSenha != 1){
            return false;
        }
        return true;
    }
}

?>