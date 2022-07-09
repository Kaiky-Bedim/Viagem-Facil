<?php

class Cadastro {
    public $nome;
    public $email;
    public $cpf;
    public $rg;
    public $senha;
    public $confirmSenha;
    public $estado;
    public $cidade;
    public $rua;
    public $numero;
    public $cep;
    public $complemento;
    public $telefone1;
    public $telefone2;
    public $conexao;

    function __construct($nome, $email, $cpf,
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
        $this->complemento = $complemento;
        if ($complemento == ""){
            $this->complemento = null;
        }
        $this->telefone1 = $telefone1;
        $this->telefone2 = $telefone2;
        if ($telefone2 == ""){
            $this->telefone2 = null;
        }
    }

    public function Cadastrar($con){
        $this->conexao = $con;

        $sql = "insert into DadosCadastrais values('".$this->cpf."', '".$this->rg."', '".$this->nome."', '".$this->telefone1."', '".$this->telefone2."', '".$this->email."', 
        '".$this->estado."', '".$this->cidade."', '".$this->rua."', '".$this->complemento."', ".$this->numero.", '".$this->cep."');";
        $resCadastro = mysqli_query($this->conexao->getConexao(), $sql);

        $sql = "insert into Senhas values (sha('".$this->cpf."'), sha('".$this->senha."'));";
        $resSenha = mysqli_query($this->conexao->getConexao(), $sql);

        $this->conexao->FecharConexao();
        if($resCadastro != 1 || $resSenha != 1){
            return false;
        }
        return true;
    }
}

?>