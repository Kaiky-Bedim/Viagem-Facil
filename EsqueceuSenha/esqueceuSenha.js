import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";

//Objeto Layout
var layout = new Layout();

//Objeto PopUp
var popUp = new PopUp();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Recuperando os inputs do Form
const cpf = document.getElementById("txtCpf");
const email = document.getElementById("txtEmail");
const btnVerificar = document.getElementById("btnVerificar");
var primeiraTentativa = true;

//Funções para validar os campos do formulário
function ValidaCPF(){
    cpf.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!cpf.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelCPF").innerHTML = "CPF*";
            if(cpf.value == ""){
                cpf.setCustomValidity("O campo CPF é obrigatório");
            }else if(cpf.value.length > 0 && cpf.value.length < 11){
                cpf.setCustomValidity("Um CPF válido deve possuir 11 dígitos");
            }
            return;
        }
        document.getElementById("labelCPF").innerHTML = "CPF";
    }
}

function ValidaEmail(){
    email.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!email.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelEmail").innerHTML = "Email*";
            if(email.value == ""){
                email.setCustomValidity("O campo Email é obrigatório");
            }else if(email.value.length > 0){
                email.setCustomValidity("Utilize um formato de Email válido, como @gmail ou @hotmail");
            }
            return;
        }
        document.getElementById("labelEmail").innerHTML = "Email";
    }
}

btnVerificar.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaEmail();
    ValidaCPF();
}

email.oninput = function(){
    ValidaEmail();
}

cpf.oninput = function(){
    ValidaCPF();
}

//Fazendo o Login via AJAX
//Recuperando o elemento Form
const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
form.addEventListener("submit", function(event){
    event.preventDefault();
    
    //Criando o objeto do formulário que será mandado para o Servidor
    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerEsqueceuSenha.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == "CPF não encontrado no sistema"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);    
                }
                if(this.responseText == "E-mail informado não coincide com o E-mail cadastrado para este CPF"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);    
                }
                console.log(this.response);
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
});