import { Layout } from "../Layout/layout.js";

//Classe Login, realiza as operações de Login e as requisições para o Banco
class Login{
    //Variáveis para realizar Login
    cpf;
    senha;
    //XMLHttp é o objeto responsável por realizar requisições Ajax
    xmlHttp;

    //Método para realizar o Login via requisição Ajax - Não está funcional ainda
    enviarFormulario(){
        this.cpf = document.getElementById("txtcpf").value;
        this.senha = document.getElementById("txtsenha").value;

        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest;
        }else{
            xmlHttp = new ActiveXObject("Microsft.XMLHTTP");
        }

        ajax.open("POST", "http://localhost/Viagem-Facil/Login/controllerLogin.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        const json = {
                        cpf: this.cpf,
                        senha: this.senha
        }
        var variaveis = JSON.stringify(json);
        console.log(variaveis)
        var resp = ajax.send(variaveis);
        console.log(resp);
    }
}
//Área "Main" da tela de Login, aqui criamos os objetos e os procedimentos que deverão ser executados na tela

//Objeto Login
var login = new Login();

function logar(){
    console.log("Deu");
}

//Objeto Layout
var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");