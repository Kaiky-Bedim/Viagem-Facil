import { Layout } from "../Layout/layout.js";

//Objeto Layout
var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Códigos para validar o formulário

//Recuperando os inputs do Form
var cpf = document.getElementById('cpf');
var senha = document.getElementById('senha');
var button = document.getElementById("submit");
var primeiraTentativa = true;

//Função que valida o CPF
function ValidaCPF(){
    //Apaga as mensagens de erro anteriores
    cpf.setCustomValidity("");
    //Reexecuta validação
    if (!cpf.validity.valid && !primeiraTentativa) {
        //Se inválido, coloca mensagem de erro
        if(cpf.value == ""){
            document.getElementById("labelCpf").innerHTML = "CPF*";
            cpf.setCustomValidity("O campo CPF é obrigatório");
        }else if(cpf.value.length > 0 && cpf.value.length < 11){
            document.getElementById("labelCpf").innerHTML = "CPF*";
            cpf.setCustomValidity("Um CPF válido deve possuir 11 dígitos");
        }
    }
}

function ValidaSenha(){
    //Apaga as mensagens de erro anteriores
    senha.setCustomValidity("");
    //Reexecuta validação
    if (!senha.validity.valid) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("labelSenha").innerHTML = "Senha*";
        senha.setCustomValidity("O campo Senha é obrigatório");
    }
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