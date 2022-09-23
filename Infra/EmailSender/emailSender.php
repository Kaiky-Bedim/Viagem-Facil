<?php

//Classe enviadora de E-mails
class EmailSender{
    //Propriedades para o envio de E-mails
    private $destinatario;
    private $remetente;
    private $assunto;
    private $mensagem;

    //Sets e Gets para encapsular os dados dos E-mails enviados
    public function SetDestinatario($destinatario){
        $this->destinatario = $destinatario;
    }

    public function SetRemetente($remetente){
        $this->remetente = $remetente;
    }

    public function SetAssunto($assunto){
        $this->assunto = $assunto;
    }

    public function SetMensagem($mensagem){
        $this->mensagem = $mensagem;
    }

    public function GetDestinatario(){
        return $this->destinatario;
    }

    public function GetRemetente(){
        return $this->remetente;
    }

    public function GetAssunto(){
        return $this->assunto;
    }

    public function GetMensagem(){
        return $this->mensagem;
    }

    //Este método realmente envia o E-mail com base nos dados fornecidos anteriormente
    public function EnviarEmail(){
        //Preparando os Headers para o envio do E-mail
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: '.$this->remetente;

        //Enviando o E-mail propriamente dito
        $enviaremail = mail($this->destinatario, $this->assunto, $this->mensagem, $headers);

        //Verificando se o envio do E-mail foi bem sucedido ou não
        if($enviaremail){
            return "E-mail enviado com sucesso";
        }else{
            return "Não foi possível enviar o E-mail";
        }
    }
}

?>