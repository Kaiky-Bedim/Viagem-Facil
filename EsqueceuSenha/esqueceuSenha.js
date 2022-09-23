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
var primeiraTentativa1 = true;

//Funções para validar os campos do formulário 1
function ValidaCPF(){
    cpf.setCustomValidity("");

    if(!primeiraTentativa1){
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

    if(!primeiraTentativa1){
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
    primeiraTentativa1 = false;
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
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const btnVoltar = document.getElementById("btnVoltar");
const codigoVerificao = document.getElementById("txtCodigoVerificacao");
const btnEnviar = document.getElementById("btnEnviar");
var primeiraTentativa2 = true;

//Funções para validar os campos do formulário 2
function ValidaCodigoVerificacao(){
    codigoVerificao.setCustomValidity("");

    if(!primeiraTentativa2){
        //Reexecuta validação
        if (!codigoVerificao.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelCodigoVerificacao").innerHTML = "Código Verificação*";
            if(codigoVerificao.value == ""){
                codigoVerificao.setCustomValidity("O campo Código Verificação é obrigatório");
            }else if(codigoVerificao.value.length > 0 && codigoVerificao.value.length < 11){
                codigoVerificao.setCustomValidity("Um Código Verificação válido deve possuir 6 dígitos");
            }
            return;
        }
        document.getElementById("labelCodigoVerificacao").innerHTML = "Código Verificação";
    }
}

btnEnviar.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa2 = false;
    ValidaCodigoVerificacao();
}

codigoVerificao.oninput = function(){
    ValidaCodigoVerificacao();
}

//Função para enviar o Form1 e mandar um Email
function EnviaEmail(){
    //Criando o objeto do formulário que será mandado para o Servidor
    let data = new FormData(form1);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "controllerEsqueceuSenha.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.responseText == "E-mail enviado com sucesso"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
                    //Trocando o formulário exposto na tela
                    form1.setAttribute("hidden", "true");
                    form2.removeAttribute("hidden");
                }else if(this.responseText == "CPF não encontrado no sistema"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);    
                }else if(this.responseText == "E-mail informado não coincide com o E-mail cadastrado para este CPF"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);    
                }else if(this.responseText.includes("Access denied")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                }
                console.log(this.response);
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
}

//Colocando um listener para alterar o comportamento do Form1
form1.addEventListener("submit", function(event){
    event.preventDefault();
    EnviaEmail()
});

//Observando o botão de voltar para a tela anterior e mostrar o Form anterior
btnVoltar.addEventListener("click", function(){
    form2.setAttribute("hidden", "true");
    form1.removeAttribute("hidden");
})

//Recuperando o elemento do Form3
const form3 = document.getElementById("form3");

//Colocando um listener para alterar o comportamento do Form2 - Verifica o Código de Verificação
form2.addEventListener("submit", function(event){
    event.preventDefault();

    //Criando o objeto do formulário que será mandado para o Servidor
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "controllerEsqueceuSenha.php?codigoVerificacao=" + codigoVerificao.value);
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(this.response == true){
                    //Caso o Código Verificação informado seja o mesmo do servidor
                    form2.setAttribute("hidden", "true");
                    form3.removeAttribute("hidden");
                }else if(this.response == false){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Código Verificação informado está incorreto !");                    
                }else if(this.responseText.includes("Access denied")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                }else{
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado");
                }
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
})

const aNovoEmail = document.getElementById("aNovoEmail");
aNovoEmail.addEventListener("click", function(event){
    event.preventDefault()
    EnviaEmail()
})

//Variáveis e funções para validar o terceiro Form
var inputSenha = document.getElementById("txtSenha");
var inputConfirmarSenha = document.getElementById("txtConfirmarSenha");
var btnVoltarNovaSenha = document.getElementById("btnVoltarNovaSenha");
var btnEnviarNovaSenha = document.getElementById("btnEnviarNovaSenha");
var primeiraTentativa3 = true;

function ValidaSenha(){
    inputSenha.setCustomValidity("");

    if(!primeiraTentativa3){
        //Reexecuta validação
        if (!inputSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelSenha").innerHTML = "Nova Senha*";
            if(inputSenha.value == ""){
                inputSenha.setCustomValidity("O campo Nova Senha é obrigatório");
            }
            return;
        }
        document.getElementById("labelSenha").innerHTML = "Nova Senha";
    }
}

function ValidaConfirmarSenha(){
    inputConfirmarSenha.setCustomValidity("");

    if(!primeiraTentativa3){
        //Reexecuta validação
        if (!inputConfirmarSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelConfirmarSenha").innerHTML = "Confirmar Nova Senha*";
            if(inputConfirmarSenha.value == ""){
                inputConfirmarSenha.setCustomValidity("O campo Confirmar Nova Senha é obrigatório");
            }
            return;
        }
        document.getElementById("labelConfirmarSenha").innerHTML = "Confirmar Nova Senha";
    }
}

btnEnviarNovaSenha.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa3 = false;
    ValidaSenha();
    ValidaConfirmarSenha();
}

inputSenha.oninput = function(){
    ValidaSenha();
}

inputConfirmarSenha.oninput = function(){
    ValidaConfirmarSenha();
}

//Listener para que o usuário possa voltar para a tela anterior
btnVoltarNovaSenha.addEventListener("click", function(){
    form3.setAttribute("hidden", "true");
    form2.removeAttribute("hidden");
})

//Função executada no envio do terceiro Form e que realmente altera a senha
form3.addEventListener("submit", function(event){
    event.preventDefault();

    //Verificando se os campos senha não são iguais
    if(inputSenha.value != inputConfirmarSenha.value){
        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Os campos senhas não são iguais");
        return;
    }

    //Criando o objeto do formulário que será mandado para o Servidor
    let httpRequest = new XMLHttpRequest();

    //Montando a URL que será enviada criptografada
    var param = "senha=" + inputSenha.value + "&cpf=" + cpf.value;

    httpRequest.open("POST", "controllerAlterarSenha.php");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    httpRequest.send(param);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                //Verificando as possíveis diferentes respostas da API
                if(this.response == "Senha alterada com sucesso"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);    
                    
                    //Setando um Timer para redirecionar o usuário para a tela de Login, assim ele pode logar com a nova Senha
                    setTimeout(function(){
                        window.location.href = "../Login/login.html";
                    },1500);
                }else if(this.response == "Senha nova não pode ser igual a antiga"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);    
                }else if(this.response == "Você não possui autorização para alterar a Senha"){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);    
                }else if(this.responseText.includes("Access denied")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                }else{
                    console.log(this.response);
                }
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
            }
        }
    }
})