import { Layout } from "../Layout/layout.js";

var layout = new Layout();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Códigos para validar o formulário

//Recuperando os inputs do Form
const nome = document.getElementById("txtNome");
const email = document.getElementById("txtEmail");
const cpf = document.getElementById("txtCPF");
const rg = document.getElementById("txtRG");
const senha = document.getElementById("txtSenha");
const confirmarSenha = document.getElementById("txtConfirmarSenha");
const estado = document.getElementById("txtEstado");
const cidade = document.getElementById("txtCidade");
const rua = document.getElementById("txtRua");
const numero = document.getElementById("txtNumero");
const cep = document.getElementById("txtCEP");
const complemeto = document.getElementById("txtComplemeto");
const telefone1 = document.getElementById("txtTelefone1");
const telefone2 = document.getElementById("txtTelefone2");
const button = document.getElementById("enviar");
var primeiraTentativa = true;

//Funções que validam os campos do formulário

function ValidaNome(){
    nome.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!nome.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelNome").innerHTML = "Nome*";
            if(nome.value == ""){
                nome.setCustomValidity("O campo Nome é obrigatório");
            }
        }
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
        }
    }
}

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
        }
    }
}

function ValidaRG(){
    rg.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!rg.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelRG").innerHTML = "RG*";
            if(rg.value == ""){
                rg.setCustomValidity("O campo RG é obrigatório");
            }else if(rg.value.length > 0 && rg.value.length < 9){
                rg.setCustomValidity("Um RG válido deve possuir 9 dígitos");
            }
        }
    }
}

function ValidaSenha(){
    senha.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!senha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelSenha").innerHTML = "Senha*";
            if(senha.value == ""){
                senha.setCustomValidity("O campo Senha é obrigatório");
            }
        }
    }
}

function ValidaConfirmarSenha(){
    confirmarSenha.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!confirmarSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelConfirmarSenha").innerHTML = "Confirmar Senha*";
            if(confirmarSenha.value == ""){
                confirmarSenha.setCustomValidity("O campo Confirmar Senha é obrigatório");
            }
        }
    }
}

function ValidaEstado(){
    estado.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!estado.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelEstado").innerHTML = "Estado*";
            if(estado.value == ""){
                estado.setCustomValidity("O campo Estado é obrigatório");
            }
        }
    }
}

function ValidaCidade(){
    cidade.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!cidade.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelCidade").innerHTML = "Cidade*";
            if(cidade.value == ""){
                cidade.setCustomValidity("O campo Cidade é obrigatório");
            }
        }
    }
}

function ValidaRua(){
    rua.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!rua.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelRua").innerHTML = "Rua*";
            if(rua.value == ""){
                rua.setCustomValidity("O campo Rua é obrigatório");
            }
        }
    }
}

function ValidaNumero(){
    numero.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!numero.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelNumero").innerHTML = "Número*";
            if(numero.value == ""){
                numero.setCustomValidity("O campo Número é obrigatório");
            }
        }
    }
}

function ValidaCEP(){
    cep.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!cep.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelCEP").innerHTML = "CEP*";
            if(cep.value == ""){
                cep.setCustomValidity("O campo CEP é obrigatório");
            }
        }
    }
}

function ValidaTelefone1(){
    telefone1.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!telefone1.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelTelefone1").innerHTML = "Telefone 1*";
            if(telefone1.value == ""){
                telefone1.setCustomValidity("O campo Telefone 1 é obrigatório");
            }
        }
    }
}

button.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaNome();
    ValidaEmail();
    ValidaCPF();
    ValidaRG();
    ValidaSenha();
    ValidaConfirmarSenha();
    ValidaEstado();
    ValidaCidade();
    ValidaRua();
    ValidaNumero();
    ValidaCEP();
    ValidaTelefone1();
}

function SenhasBatem(){
    if(senha.value != confirmarSenha.value){
        return false;
    }
    return true;
}

nome.oninput = function(){
    ValidaNome();
}

email.oninput = function(){
    ValidaEmail();
}

cpf.oninput = function(){
    ValidaCPF();
}

rg.oninput = function(){
    ValidaRG();
}

senha.oninput = function(){
    ValidaSenha();
}

confirmarSenha.oninput = function(){
    ValidaConfirmarSenha();
}

estado.oninput = function(){
    ValidaEstado();
}

cidade.oninput = function(){
    ValidaCidade();
}

rua.oninput = function(){
    ValidaRua();
}

numero.oninput = function(){
    ValidaNumero();
}

cep.oninput = function(){
    ValidaCEP();
}

telefone1.oninput = function(){
    ValidaTelefone1();
}
//Códigos de validação dos formulários terminam aqui

//Fazendo o Login via AJAX
//Recuperando o elemento Form
const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
form.addEventListener("submit", function(event){
    event.preventDefault();

    if(senha.value != confirmarSenha.value){
        alert("Os campos senhas não são iguais");
        senha.value = "";
        confirmarSenha.value = "";
        return;
    }

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerCadastro.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                VerificaCadastro(this.response);
            }else{
                alert("Não foi possível terminar a requisição");
            }
        }
    }
});

function VerificaCadastro(cadastro){
    if(cadastro == true){
        alert("Cadastro realizado com sucesso");
        window.location.href = "../Index/index.html";
    }else if(cadastro.includes("Sem conexão com o servidor")){
        alert("Ocorreu algum erro interno na requisição com o servidor");
    }else{
        alert("O CPF ou a senha informados estão incorretos");
    }
}
//Código do Login via AJAX termina aqui