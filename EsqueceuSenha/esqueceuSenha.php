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
        <style type='text/css'>
            body {
            margin:0px;
            font-family:Verdane;
            font-size:16px;
            color: #666666;
            }
            </style>
        <html>
            <h1>Código de Verificação</h1>
            <p>Olá $email, </br>
                Nós recebemos um pedido para a alteração da sua senha cadastrado no sistema da Viagem Fácil. </br>
                Seu código de verificação é: $codigoVerificacao </br></br>
                
                Se você não solicitou este códgio, poderá ignorar com segurança este email. Outra pessoa pode ter digitado seu email por engano. </br></br>
                
                Obrigado, </br>
                Equipe Viagem Fácil
            </p>
        </html>";

        //Retornando o corpo do Email formatado
        return $corpoEmail;
    }
}

?>