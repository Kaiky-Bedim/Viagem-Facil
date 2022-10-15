<?php

//Esta classe encapsula os Dados Pessoais
class DadosPessoais{
    //Propriedades dos Dados Pessoais para serem alterados ou usados
    private $nome;
    private $email;
    private $rg;
    private $dataNascimento;
    private $telefone1;
    private $telefone2;
    private $estado;
    private $cidade;
    private $rua;
    private $bairro;
    private $numero;
    private $cep;
    private $complemento;

    //Set's e Get's para a classe
    function SetNome($nome){
        $this->nome = $nome;
    }

    function SetEmail($email){
        $this->email = $email;
    }

    function SetRG($rg){
        $this->rg = $rg;
    }

    function SetDataNascimento($dataNascimento){
        $this->dataNascimento = $dataNascimento;
    }

    function SetTelefone1($telefone1){
        $this->telefone1 = $telefone1;
    }

    function SetTelefone2($telefone2){
        $this->telefone2 = $telefone2;
    }

    function SetEstado($estado){
        $this->estado = $estado;
    }

    function SetCidade($cidade){
        $this->cidade = $cidade;
    }

    function SetRua($rua){
        $this->rua = $rua;
    }

    function SetBairro($bairro){
        $this->bairro = $bairro;
    }

    function SetNumero($numero){
        $this->numero = $numero;
    }

    function SetCEP($cep){
        $this->cep = $cep;
    }

    function SetComplemento($complemento){
        $this->complemento = $complemento;
    }

    function GetNome(){
        return $this->nome;
    }

    function GetEmail(){
        return $this->email;
    }

    function GetRG(){
        return $this->rg;
    }

    function GetDataNascimento(){
        return $this->dataNascimento;
    }

    function GetTelefone1(){
        return $this->telefone1;
    }

    function GetTelefone2(){
        return $this->telefone2;
    }

    function GetEstado(){
        return $this->estado;
    }

    function GetCidade(){
        return $this->cidade;
    }

    function GetRua(){
        return $this->rua;
    }

    function GetBairro(){
        return $this->bairro;
    }

    function GetNumero(){
        return $this->numero;
    }

    function GetCEP(){
        return $this->cep;
    }

    function GetComplemento(){
        return $this->complemento;
    }

    //Método para alterar os dados do Usuário
    function AlterarDadosUsuario($conexao){
        //Montando a Query e realizando a operação SQL
        $cpf = $_SESSION['cpf'];
        $sql = "update DadosCadastrais set RG = '".$this->rg."', Nome = '".$this->nome."', DataNascimento = '".$this->dataNascimento."', 
            Telefone1 = '".$this->telefone1."', Telefone2 = '".$this->telefone2."', Email = '".$this->email."', 
            Estado = '".$this->estado."', Cidade = '".$this->cidade."', Rua = '".$this->rua."', Bairro = '".$this->bairro."', 
            Complemento = '".$this->complemento."', Numero = '".$this->numero."', CEP = '".$this->cep."' 
            where CPF = '".$cpf."'";
        $res = mysqli_query($conexao->getConexao(), $sql);

        if($res > 0){
            return true;
        }else{
            return false;
        }
    }
}

?>