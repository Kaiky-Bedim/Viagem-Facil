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

//Códigos para validar o formulário

//Recuperando os inputs do Form
const cpf = document.getElementById('cpf');
const senha = document.getElementById('senha');
const button = document.getElementById("submit");
var primeiraTentativa = true;

//Função que valida o CPF
function ValidaCPF(){
    //Apaga as mensagens de erro anteriores
    cpf.setCustomValidity("");
    //Reexecuta validação
    if (!cpf.validity.valid && !primeiraTentativa) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("labelCpf").innerHTML = "CPF*";
        if(cpf.value == ""){
            cpf.setCustomValidity("O campo CPF é obrigatório");
        }else if(cpf.value.length > 0 && cpf.value.length < 11){
            cpf.setCustomValidity("Um CPF válido deve possuir 11 dígitos");
        }
        return;
    }
    document.getElementById("labelCpf").innerHTML = "CPF";
}

function ValidaSenha(){
    //Apaga as mensagens de erro anteriores
    senha.setCustomValidity("");
    //Reexecuta validação
    if (!senha.validity.valid) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("labelSenha").innerHTML = "Senha*";
        if(senha.value == ""){
            senha.setCustomValidity("O campo Senha é obrigatório");
        }else if(senha.value.length > 0 && senha.value.length < 8){
            senha.setCustomValidity("Uma Senha válida deve possuir 8 dígitos no mínimo");
        }
        return;
    }
    document.getElementById("labelSenha").innerHTML = "Senha";
}

cpf.oninput = function(){
    ValidaCPF();
}

senha.oninput = function(){
    ValidaSenha();
}

button.onclick = function(){
    primeiraTentativa = false;
    ValidaCPF();
    ValidaSenha();
};
//Códigos de validação dos formulários terminam aqui

//Fazendo o Login via AJAX
//Recuperando o elemento Form
const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
form.addEventListener("submit", function(event){
    event.preventDefault();

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerLogin.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                VerificaLogin(this.response);
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
                ResetaSenha();
            }
        }
    }
});

function VerificaLogin(login){
    if(login == true){
        //Código executado, caso o Login seja bem sucedido
        window.sessionStorage.setItem('autenticado', "true");
        window.location.href = "../Main/main.html";
    }else if(login.includes("Sem conexão com o servidor") || login.includes("Warning") || login.includes("Access denied")){
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
        ResetaSenha();
    }else{
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "O CPF ou a senha informados estão incorretos");
        ResetaSenha();
    }
}

function ResetaSenha(){
    senha.value = "";
    senha.focus();
    document.getElementById("labelCpf").innerHTML = "CPF";
    document.getElementById("labelSenha").innerHTML = "Senha";
}
//Código do Login via AJAX termina aqui