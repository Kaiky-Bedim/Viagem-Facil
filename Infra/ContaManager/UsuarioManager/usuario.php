<?php

class Usuario implements JsonSerializable{
    private $cpf;
    private $rg;
    private $nome;
    private $dataNascimento;
    private $telefone1;
    private $telefone2;
    private $email;
    private $estado;
    private $cidade;
    private $rua;
    private $bairro;
    private $complemento;
    private $numero;
    private $cep;
    private $instituicaoEnsinoCidade;
    private $instituicaoEnsino;

    public function __construct()
    {
        //Verificando se as Sessions já forma iniciadas
        if($_SESSION != null){
            if(isset($_SESSION['cpf'])){
                $this->cpf = $_SESSION['cpf'];
            }
        }
    }

    public function SetAtributosUsuario($con){
        $sql = "select * from dadoscadastrais where cpf = '".$this->cpf."';";
        $res = mysqli_query($con->getConexao(), $sql);
        $row = mysqli_fetch_assoc($res);

        //Verificando se o BD retornou algum resultado
        if($row != null){
            $this->rg = $row['RG'];
            $this->nome = $row['Nome'];
            $this->dataNascimento = $row['DataNascimento'];
            $this->telefone1 = $row['Telefone1'];
            $this->telefone2 = $row['Telefone2'];
            $this->email = $row['Email'];
            $this->estado = $row['Estado'];
            $this->cidade = $row['Cidade'];
            $this->rua = $row['Rua'];
            $this->bairro = $row['Bairro'];
            $this->complemento = $row['Complemento'];
            $this->numero = $row['Numero'];
            $this->cep = $row['CEP'];

            if($row['InstituicaoEnsinoID'] != null){
                //Recuperando os dados
                $sql = "select * from instituicoesensino where Id = '".$row['InstituicaoEnsinoID']."';";
                $res = mysqli_query($con->getConexao(), $sql);
                $row = mysqli_fetch_assoc($res);

                $this->instituicaoEnsinoCidade = $row['Cidade'];
                $this->instituicaoEnsino = $row['Nome'];
            }
        }
    }

    //Set para alterar o CPF do usuário, daqui em diante pode-se Setar os Atributos Novamente e recuperar novos dados
    public function SetCPF($novoCpf){
        $this->cpf = $novoCpf;
    }

    public function GetCPF(){
        return $this->cpf;
    }

    public function GetRG(){
        return $this->rg;
    }

    public function GetNome(){
        return $this->nome;
    }

    public function GetDataNascimento(){
        return $this->dataNascimento;
    }

    public function GetTelefone1(){
        return $this->telefone1;
    }

    public function GetTelefone2(){
        return $this->telefone2;
    }

    public function GetEmail(){
        return $this->email;
    }

    public function GetEstado(){
        return $this->estado;
    }

    public function GetCidade(){
        return $this->cidade;
    }

    public function GetRua(){
        return $this->rua;
    }

    public function GetBairro(){
        return $this->bairro;
    }

    public function GetComplemento(){
        return $this->complemento;
    }

    public function GetNumero(){
        return $this->numero;
    }

    public function GetCEP(){
        return $this->cep;
    }

    public function GetInstituicaoEnsinoCidade(){
        return $this->instituicaoEnsinoCidade;
    }

    public function GetInstituicaoEnsino(){
        return $this->instituicaoEnsino;
    }

    //Este método vem da Interface que essa classe implementa, ele permite que convertamos objetos Usuario em JSON
    public function jsonSerialize() {
        return [
            'cpf' => $this->GetCPF(),
            'rg' => $this->GetRG(),
            'nome' => $this->GetNome(),
            'dataNascimento' => $this->GetDataNascimento(),
            'telefone1' => $this->GetTelefone1(),
            'telefone2' => $this->GetTelefone2(),
            'email' => $this->GetEmail(),
            'estado' => $this->GetEstado(),
            'cidade' => $this->GetCidade(),
            'rua' => $this->GetRua(),
            'bairro' => $this->GetBairro(),
            'complemento' => $this->GetComplemento(),
            'numero' => $this->GetNumero(),
            'cep' => $this->GetCEP(),
            'instituicaoEnsinoCidade' => $this->GetInstituicaoEnsinoCidade(),
            'instituicaoEnsino' => $this->GetInstituicaoEnsino()
        ];
    }
}

?>