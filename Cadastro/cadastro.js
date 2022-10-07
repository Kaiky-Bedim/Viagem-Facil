import { Layout } from "../Layout/layout.js";
import { PopUp } from "../Pop-Ups/popUp.js";

var layout = new Layout();
var popUp = new PopUp();

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
const dataNascimento = document.getElementById("txtDataNascimento");
const senha = document.getElementById("txtSenha");
const confirmarSenha = document.getElementById("txtConfirmarSenha");
const estado = document.getElementById("txtEstado");
const cidade = document.getElementById("txtCidade");
const rua = document.getElementById("txtRua");
const numero = document.getElementById("txtNumero");
const cep = document.getElementById("txtCEP");
const telefone1 = document.getElementById("txtTelefone1");
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
            return;
        }
        document.getElementById("labelNome").innerHTML = "Nome";
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
            return;
        }
        document.getElementById("labelRG").innerHTML = "RG";
    }
}

function ValidaDataNascimento(){
    dataNascimento.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!dataNascimento.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelDataNascimento").innerHTML = "Data Nascimento*";
            if(dataNascimento.value == ""){
                dataNascimento.setCustomValidity("O campo Data Nascimento é obrigatório");
            }else{
                dataNascimento.setCustomValidity("Uma data válida deve estar entre 01/01/1900 e 01/01/2022");
            }
            return;
        }
        document.getElementById("labelDataNascimento").innerHTML = "Data Nascimento";
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
            return;
        }
        document.getElementById("labelSenha").innerHTML = "Senha";
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
            return;
        }
        document.getElementById("labelConfirmarSenha").innerHTML = "Confirmar Senha";
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
            return;
        }
        document.getElementById("labelEstado").innerHTML = "Estado";
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
            return;
        }
        document.getElementById("labelCidade").innerHTML = "Cidade";
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
            return;
        }
        document.getElementById("labelRua").innerHTML = "Rua";
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
            return;
        }
        document.getElementById("labelNumero").innerHTML = "Número";
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
            return;
        }
        document.getElementById("labelCEP").innerHTML = "CEP";
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
            return;
        }
        document.getElementById("labelTelefone1").innerHTML = "Telefone 1";
    }
}

button.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaNome();
    ValidaEmail();
    ValidaCPF();
    ValidaRG();
    ValidaDataNascimento();
    ValidaSenha();
    ValidaConfirmarSenha();
    ValidaEstado();
    ValidaCidade();
    ValidaRua();
    ValidaNumero();
    ValidaCEP();
    ValidaTelefone1();
}
ProcurarCep();

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

dataNascimento.oninput = function(){
    ValidaDataNascimento();
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
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Os campos senhas não são iguais");
        senha.value = "";
        confirmarSenha.value = "";
        document.getElementById("labelSenha").innerHTML = "Senha*";
        document.getElementById("labelConfirmarSenha").innerHTML = "Confirmar Senha*";
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
                console.log(this.response);
                VerificaCadastro(this.response);
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
});

function VerificaCadastro(cadastro){
    if(cadastro == true){
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Cadastro realizado com sucesso");
        setTimeout(function(){
            window.location.href = "../Main/main.html";
        },1500);
    }else if(cadastro.includes("Sem conexão com o servidor") || cadastro.includes("Access denied")){
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
    }else{
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "O CPF informado já possui um cadastro no sistema");
    }
}
//Código do Login via AJAX termina aqui

function ProcurarCep(){

    //Evento que ocorre quando o input do CEP é deselecionado, ativo o focusout
    document.getElementById('txtCEP')
    .addEventListener('focusout',async()=>{
        console.log("entrou");
        //Pega o valor que esta dentro do input do CEP
        const cepValidar = document.getElementById('txtCEP').value;
        //Pega o json dos dados de endereço vindo da WebApi viacep
        const url = `https://viacep.com.br/ws/${cepValidar}/json/`;
        //Manda para uma função que verifica se não tem letra no cep, caso for True um fetch com a url
        //para a WebApi, se o cep que foi junto com a url estiver errado entra no if e mostrara que não encotro o cep
        //caso o cep estaja certo ele chama a função preencherFormulario
        if(cepValido(cepValidar)){
            const dados = await fetch(url);
            const endereco = await dados.json();
            console.log(endereco);
            if(endereco.hasOwnProperty('erro')){
                document.getElementById('txtRua').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtNumero').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtCidade').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtEstado').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtComplemeto').value = "CEP NÃO ENCONTRADO";
            }else{
                console.log("entro 2");
                preencherFormulario(endereco);
            }
        }else{
            document.getElementById('endereco').value = "CEP incorreto!";
        }
    
    });

}

const cepValido = (cep) =>  /^[0-9]+$/.test(cep);

const preencherFormulario= (endereco) =>{
    document.getElementById('txtRua').value = endereco.logradouro;
    document.getElementById('txtCidade').value = endereco.localidade;
    document.getElementById('txtEstado').value = endereco.uf;
    document.getElementById('txtComplemeto').value = endereco.complemento;
}

//Função para retornar para a tela de Login
const buttonVoltarLogin = document.getElementById("irParaLogin");
buttonVoltarLogin.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../Login/login.html"
});