<?php

//Esta classe encapsula algumas lógicas utilizadas para se recuperar uma Senha do sistema
class EsqueceuSenha{
    //Função utilizada para gerar o Código de Verificação de seis dígitos para recuperação de Senha
    public function GerarCodigoVerificacao(){
        //Variável que receberá cada componente do código por vez
        $codigoVerificacao = "";

        //Gerando os seis números aleatórios do código
        for($cont = 0; $cont < 6; $cont++){
            $num = rand(0, 9);
            $codigoVerificacao .= $num;
        }

        //Retornando o código de verificação gerado
        return $codigoVerificacao;
    }

    //Função utilizada para montar o corpo do E-mail para a recuperação da senha pelo Código de Verificação
    public function MontaCorpoEmail($codigoVerificacao, $email){
        //Variável com o corpo do E-mail
        $corpoEmail = "
        <head>
            <style type='text/css'>
                body {
                margin:0px;
                font-family:Verdane;
                font-size:16px;
                color: #817A87;
                }
            </style>
        </head>
        <html>
            <body>
                <h1>Código de Verificação</h1>
                <p>Olá $email, </p>
                <p>Nós recebemos um pedido para a alteração da sua senha cadastrado no sistema da Viagem Fácil.</p>
                <p>Seu código de verificação é: $codigoVerificacao</p></br></br>
                    
                <p>Se você não solicitou este códgio, poderá ignorar com segurança este email. Outra pessoa pode ter digitado seu email por engano.<p></br></br>
                    
                <p>Obrigado, </p></br>
                <p>Equipe Viagem Fácil</p>
            </body>
        </html>";

        //Retornando o corpo do Email formatado
        return $corpoEmail;
    }

    //Esta função vai comparar a nova senha a ser Cadastrada com a Velha
    public function ComparaNovaSenhaComSenhaAntiga($cpf, $novaSenha, $conexao){
        //Criando a query para verificar se as senhas são iguais ou não
        $sql = "select * from senhas where cpf = sha('".$cpf."');";
        //Executando a Query e recuperando o resultado
        $res = mysqli_query($conexao->getConexao(), $sql);
        $row = mysqli_fetch_assoc($res);

        //Criptografando a nova senha para poder compará-la com a Senha atual
        $sha1NovaSenha = sha1($novaSenha);

        if($row['Senha'] == $sha1NovaSenha){
            return true;
        }else{
            return false;
        }
    }

    //Esta função é responsável por cadastrar a Nova Senha do Usuário efetivamente
    public function CadastraNovaSenha($cpf, $novaSenha, $conexao){
        //Criando a query para cadastrar a Nova Senha
        $sql = "update senhas set Senha = sha('".$novaSenha."') where CPF = sha('".$cpf."');";
        //Executando a Query e recuperando o resultado
        $res = mysqli_query($conexao->getConexao(), $sql);

        //Verificando se a operação foi bem sucedida ou não
        if($res > 0){
            return true;
        }else{
            return false;
        }
    }
}

?>