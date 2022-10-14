<?php

class Cadastro {
    private $nome;
    private $email;
    private $cpf;
    private $rg;
    private $dataNascimento;
    private $senha;
    private $confirmSenha;
    private $estado;
    private $cidade;
    private $rua;
    private $numero;
    private $cep;
    private $complemento;
    private $telefone1;
    private $telefone2;
    private $conexao;

    function __construct($nome, $email, $cpf,
                      $rg, $dataNascimento, $senha, $confirmSenha,
                      $estado, $cidade, $rua, $numero,
                      $cep, $complemento, $telefone1, $telefone2){

        $this->nome = $nome;
        $this->email = $email;
        $this->cpf = $cpf;
        $this->rg = $rg;
        $this->dataNascimento = $dataNascimento;
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

    //Função responsável por Setar a Conexão
    public function SetConexao($con){
        $this->conexao = $con;
    }

    //Função responsável por Validar o CPF fornecido
    public function ValidarCPF() {
 
        // Extrai somente os números
        $this->cpf = preg_replace( '/[^0-9]/is', '', $this->cpf );
         
        // Verifica se foi informado todos os digitos corretamente
        if (strlen($this->cpf) != 11) {
            return false;
        }
    
        // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
        if (preg_match('/(\d)\1{10}/', $this->cpf)) {
            return false;
        }
    
        // Faz o calculo para validar o CPF
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $this->cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($this->cpf[$c] != $d) {
                return false;
            }
        }
        return true;
    
    }

    //Esta função verifica se não há ninguém já registrado no sistema com o CPF informado
    public function VerificaSeJaExisteEsseCPFNoSistema(){
        //Query para verificar se um Usuário com este CPF existe no BD
        $sql = "select * from Senhas where CPF = sha(".$this->cpf.")";
        $res = mysqli_query($this->conexao->getConexao(), $sql);

        //Verificando se foi encontrado registros com esse CPF no BD
        if($res->num_rows > 0){
            return true;
        }else{
            return false;
        }
    }

    public function Cadastrar($con){
        $this->conexao = $con;

        $sql = "insert into DadosCadastrais values('".$this->cpf."', '".$this->rg."', '".$this->nome."', '".$this->dataNascimento."', '".$this->telefone1."', '".$this->telefone2."', '".$this->email."', 
        '".$this->estado."', '".$this->cidade."', '".$this->rua."', '".$this->complemento."', ".$this->numero.", '".$this->cep."', null);";
        $resCadastro = mysqli_query($this->conexao->getConexao(), $sql);

        $sql = "insert into Senhas values (sha('".$this->cpf."'), sha('".$this->senha."'));";
        $resSenha = mysqli_query($this->conexao->getConexao(), $sql);

        if($resCadastro != 1 || $resSenha != 1){
            return false;
        }
        return true;
    }
}

?>