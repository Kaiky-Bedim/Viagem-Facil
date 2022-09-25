import { Layout } from "../Layout/layout.js";
import { Autenticador } from "../Infra/Autenticacao/autenticador.js";
import { PopUp } from "../Pop-Ups/popUp.js";
import { UsuarioManager } from "../Infra/ContaManager/UsuarioManager/usuarioManager.js";

var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");

//Criando os objetos para uso posterior
var layout = new Layout();
var popUp = new PopUp();
var usuarioManager = new UsuarioManager();

//Esses métodos carregar NavBar e Foot recebem o caminho do head ou foot a partir do html desse script
//e o caminho para o CSS do Layout a partir daqui
layout.carregarNavBar("../Layout/head.html", "../Layout/styleLayout.css");
layout.carregarFoot("../Layout/foot.html", "../Layout/styleLayout.css");

//Recuperando os inputs do Form
const nome = document.getElementById("txtNome");
const email = document.getElementById("txtEmail");
const rg = document.getElementById("txtRG");
const dataNascimento = document.getElementById("txtDataNascimento");
const estado = document.getElementById("txtEstado");
const cidade = document.getElementById("txtCidade");
const rua = document.getElementById("txtRua");
const numero = document.getElementById("txtNumero");
const cep = document.getElementById("txtCEP");
const telefone1 = document.getElementById("txtTelefone1");
const telefone2 = document.getElementById("txtTelefone2");
const complemento = document.getElementById("txtComplemeto");
const buttonEnviar = document.getElementById("btnEnviar");
var primeiraTentativa = true;

//Esta variável JSON possuirá todos os Dados do Usuário logado
var dados;

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

buttonEnviar.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaNome();
    ValidaEmail();
    ValidaRG();
    ValidaDataNascimento();
    ValidaEstado();
    ValidaCidade();
    ValidaRua();
    ValidaNumero();
    ValidaCEP();
    ValidaTelefone1();
}

nome.oninput = function(){
    ValidaNome();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(nome.value != dados['nome']){
        // console.log("Está diferente");
        buttonEnviar.removeAttribute("disabled");
    }else{
        // console.log("Está igual");
        buttonEnviar.setAttribute("disabled", "true");
    }
}

email.oninput = function(){
    ValidaEmail();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(email.value != dados['email']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

rg.oninput = function(){
    ValidaRG();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(rg.value != dados['rg']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

dataNascimento.oninput = function(){
    ValidaDataNascimento();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(dataNascimento.value != dados['dataNascimento']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

estado.oninput = function(){
    ValidaEstado();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(estado.value != dados['estado']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

cidade.oninput = function(){
    ValidaCidade();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(cidade.value != dados['cidade']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

rua.oninput = function(){
    ValidaRua();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(rua.value != dados['rua']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

numero.oninput = function(){
    ValidaNumero();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(numero.value != dados['numero']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

cep.oninput = function(){
    ValidaCEP();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(cep.value != dados['cep']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

telefone1.oninput = function(){
    ValidaTelefone1();
    //Verificando se o valor do campo foi alterado do que está no BD
    if(telefone1.value != dados['telefone1']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

telefone2.oninput = function(){
    //Verificando se o valor do campo foi alterado do que está no BD
    if(telefone2.value != dados['telefone2']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

complemento.oninput = function(){
    //Verificando se o valor do campo foi alterado do que está no BD
    if(complemento.value != dados['complemento']){
        buttonEnviar.removeAttribute("disabled");
    }else{
        buttonEnviar.setAttribute("disabled", "true");
    }
}

//Função executada quando a página é carregada
window.onload = function(){
    RenderizarPagina();
}

//Função usada para preencher os campos da tela
async function RenderizarPagina(){
    var json = await usuarioManager.buscarDadosUsuario("usuarioJson", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php");
    
    //Convertendo a String do JSON para um objeto JSON
    dados = JSON.parse(json);
    nome.value = dados['nome'];
    email.value = dados['email'];
    rg.value = dados['rg'];
    dataNascimento.value = dados['dataNascimento'];
    estado.value = dados['estado'];
    cidade.value = dados['cidade'];
    rua.value = dados['rua'];
    numero.value = dados['numero'];
    cep.value = dados['cep'];
    telefone1.value = dados['telefone1'];
    telefone2.value = dados['telefone2'];
    complemento.value = dados['complemento'];
}

//Recuperando o formulário dos Dados Pessoais
const formDadosPessoais = document.getElementById("formDadosPessoais");
formDadosPessoais.addEventListener("submit", function(event){
    event.preventDefault();

    //Criando o objeto do formulário que será mandado para o Servidor
    let data = new FormData(formDadosPessoais);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerConfiguracoes.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = async function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.response.includes("Access denied")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                }else if(this.response.includes("Não foi possível alterar os dados !")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                }else if(this.response.includes("Fatal error")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível realizar a operação");    
                }else{
                    //Este else significa que tudo ocorreu bem na requisição e os Dados foram alterados
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);

                    //Recuperando os novos dados do Usuário
                    var json = await usuarioManager.buscarDadosUsuario("usuarioJson", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php");
                    console.log(json);
                    dados = JSON.parse(json);

                    //Desativando o Button
                    buttonEnviar.setAttribute("disabled", "true");
                }
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
});
