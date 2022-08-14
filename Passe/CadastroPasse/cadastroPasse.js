import { PopUp } from "../../Pop-Ups/popUp.js";
import { UsuarioManager } from "../../Infra/ContaManager/UsuarioManager/usuarioManager.js"

var usuarioManager = new UsuarioManager();
var popUp = new PopUp();

//Listener para ouvir quando o botão cadastrar novo Passe for clicado, abre a janela para o Cadastro de novo Passe
document.getElementById("btnCadastrarNovoPasse").addEventListener("click", function(){
    document.getElementById("cadastroCartaoModal").removeAttribute("hidden");
    var restantePagina = document.querySelectorAll("body>div:not(.cadastroCartaoModal)");
    restantePagina.forEach(element => {
        element.className = "restantePagina";
    });

    //Recuperando as informações do Nome e do CPF do usuário para mostrar no cartão
    usuarioManager.buscarDadosUsuario("cpf", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php")
        .then(cpf => {
            document.getElementById("spanCpfCartao").innerHTML = FormataCPF(cpf);
        });

    usuarioManager.buscarDadosUsuario("nome", "../Infra/ContaManager/UsuarioManager/controllerUsuarioManager.php")
        .then(nome => {
            document.getElementById("spanNomeCartao").innerHTML = nome;
        });

    //Atribuindo a data atual para o campo Data Expedição
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    document.getElementById("divDataExpedicaoCartao").innerHTML = dia + '/' + mes + '/' + ano;

    //Reatribuindo a Função que verifica se o usuário clicou fora do cartão para o ducumentElement.onclick
    document.documentElement.onclick = function(event){
        VerificaSeUsuarioClicouFora(event);
    }
});

//Listener no botão para fechar a janela de Cadastro Passe quando ele for clicado
document.getElementById("buttonX").addEventListener("click", function(){
    document.getElementById("cadastroCartaoModal").setAttribute("hidden", "true");
    var restantePagina = document.querySelectorAll("body>div:not(.cadastroCartaoModal)");
    restantePagina.forEach(element => {
        element.classList.remove("restantePagina"); 
    });
    LimparForm();
    ResetarCorCartão();
});

//Listener/Function que vai verificar se o usuário clicou fora da janela de Cadastro de Passe, fechando-a
document.documentElement.onclick = function(event){
    VerificaSeUsuarioClicouFora(event);
}

//Eu tive de dividir a Função que avalia se o usuário clicou fora da janela de Cadastro, pois o Pop-Up reatribui o
//listener do document.documentElement.onclick
function VerificaSeUsuarioClicouFora(event){
    if(document.getElementById("cadastroCartaoModal").getAttribute("hidden") == null){
        var formVerificacao = document.getElementById("formCadastroPasse").innerHTML;
        var card = document.getElementById("cardCartao").innerHTML;
        if(!formVerificacao.includes(event.target.innerHTML) && !card.includes(event.target.innerHTML) && event.target.innerHTML != "Cadastrar Novo Passe"){
            document.getElementById("cadastroCartaoModal").setAttribute("hidden", "true");
            var restantePagina = document.querySelectorAll("body>div:not(.cadastroCartaoModal)");
            restantePagina.forEach(element => {
                element.classList.remove("restantePagina"); 
            });
            LimparForm();
            ResetarCorCartão();
        }
    }
}

//Códigos para manter os Toggle Buttons do Cadastro de Passes funcionando
var btnNovoPasse = document.getElementById("btnNovoPasse");
var btnPasseExistente = document.getElementById("btnPasseExistente");
const divSerie = document.getElementById("divSerie");
const divFabrica = document.getElementById("divFabrica");

//Só separei o método para poder utilizá-lo em outro lugar
function AlternaParaCadastrarNovoPasseForm(){
    btnNovoPasse.setAttribute("aria-pressed", "true");
        btnNovoPasse.classList.remove("desactiveBtn");
        btnNovoPasse.classList.add("activeBtn");

        btnPasseExistente.setAttribute("aria-pressed", "false");
        btnPasseExistente.classList.remove("activeBtn");
        btnPasseExistente.classList.add("desactiveBtn");

        DisplayFormNovoPasse();
}

//Listeners para os a alternância de escolha entre os Toggle Buttons
btnPasseExistente.addEventListener("click", function(){
    if(btnPasseExistente.getAttribute("aria-pressed") == "false"){
        btnPasseExistente.setAttribute("aria-pressed", "true");
        btnPasseExistente.classList.remove("desactiveBtn");
        btnPasseExistente.classList.add("activeBtn");

        btnNovoPasse.setAttribute("aria-pressed", "false");
        btnNovoPasse.classList.remove("activeBtn");
        btnNovoPasse.classList.add("desactiveBtn");

        DisplayFormPasseJaExistente();

        //Atribuindo ao input que tipo de Cadastro de Passe é
        document.getElementById("inputTipoCadastro").setAttribute("value", "Passe já existente");
    }
});

btnNovoPasse.addEventListener("click", function(){
    if(btnNovoPasse.getAttribute("aria-pressed") == "false"){
        AlternaParaCadastrarNovoPasseForm();

        //Atribuindo ao input que tipo de Cadastro de Passe é
        document.getElementById("inputTipoCadastro").setAttribute("value", "Novo Passe");
    }
});

//Funções para alternar entre os formulários de Cadastro de Novo Passe e de Cadastro de Passe já existente
function DisplayFormNovoPasse(){
    inputSerie.removeAttribute("required");
    divSerie.setAttribute("hidden", "true");
    inputFabrica.removeAttribute("required");
    divFabrica.setAttribute("hidden", "true");

    //Zerando os valores escritos nos Inputs
    inputSerie.value = "";
    inputFabrica.value = "";

    //Escrevendo valores fixos para as Div's de Número de Série e de Fábrica
    divNumSerie.innerHTML = "XXXXXXX";
    divNumFabrica.innerHTML = "XXXXXXXXX";
}

function DisplayFormPasseJaExistente(){
    inputSerie.setAttribute("required", "true");
    divSerie.removeAttribute("hidden");
    inputFabrica.setAttribute("required", "true");
    divFabrica.removeAttribute("hidden");

    //Removendo o texto para as Div's de Número de Série e de Fábrica
    divNumSerie.innerHTML = " ";
    divNumFabrica.innerHTML = " ";
}

//Funções para validar o Form de Cadastro de Passe
const inputSerie = document.getElementById("inputSerie");
const inputFabrica = document.getElementById("inputFabrica");
const selectEmpresa = document.getElementById("selectEmpresa");
const selectTipoCartao = document.getElementById("selectTipoCartao");
const btnCadastrarNovoPasse = document.getElementById("AdicionarPasse");
const divNumSerie = document.getElementById("divSerieCartao");
const divNumFabrica = document.getElementById("divFabricaCartao");
const imgLogoEmpresa = document.getElementById("imgLogoEmpresaCartao");
var primeiraTentativa = true;

//Códigos para alterar o Número de Série e de Fábrica do Cartão dinamicamente
inputSerie.onkeydown = function(){
    divNumSerie.innerHTML = inputSerie.value;
}

inputSerie.onkeyup = function(){
    divNumSerie.innerHTML = inputSerie.value;
}

inputFabrica.onkeydown = function(){
    divNumFabrica.innerHTML = inputFabrica.value;
}

inputFabrica.onkeyup = function(){
    divNumFabrica.innerHTML = inputFabrica.value;
}

//Função que altera a logo da Empresa conforme o Form
selectEmpresa.onchange = function(){
    var value = selectEmpresa.value;
    if(value == "Maringá do Vale"){
        imgLogoEmpresa.setAttribute("src", "../Infra/img/LogosEmpresas/LOGO_MARINGA_DO_VALE.png");
    }else if(value == "Viação Jacareí"){
        imgLogoEmpresa.setAttribute("src", "../Infra/img/LogosEmpresas/LOGO_VIAÇÃO_JACAREÍ.png")
    }
}

//Função que altera o tipo do Cartão entre Idoso, Estudantil e Comum
selectTipoCartao.onchange = function(){
    var value = selectTipoCartao.value;
    var spanTipoCartao = document.getElementById("spanTipoCartaoCartao");
    var divCartao = document.getElementById("divCartaoInteiro");
    if(value == "Comum"){
        ResetarCorCartão();
    }else if(value == "Estudantil"){
        divCartao.classList.remove("cartaoIdoso");
        divCartao.classList.remove("cartaoComum");
        divCartao.classList.add("cartaoEstudantil");

        spanTipoCartao.innerHTML = "Estudantil";
    }else if(value == "Idoso"){
        divCartao.classList.remove("cartaoEstudantil");
        divCartao.classList.remove("cartaoComum");
        divCartao.classList.add("cartaoIdoso");

        spanTipoCartao.innerHTML = "Idoso";
    }
}

//Função para voltar o Cartão para o tipo Comum
function ResetarCorCartão(){
    var divCartao = document.getElementById("divCartaoInteiro");
    divCartao.classList.remove("cartaoIdoso");
    divCartao.classList.remove("cartaoEstudantil");
    divCartao.classList.add("cartaoComum");

    var spanTipoCartao = document.getElementById("spanTipoCartaoCartao");
    spanTipoCartao.innerHTML = "Comum";

    selectTipoCartao.value = "Comum";
}

function ValidaSerie(){
    //Apaga as mensagens de erro anteriores
    inputSerie.setCustomValidity("");
    //Reexecuta validação
    if (!inputSerie.validity.valid && !primeiraTentativa) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("spanSerie").innerHTML = "Número de Série*";
        if(inputSerie.value == ""){
            inputSerie.setCustomValidity("O campo Número de Série é obrigatório");
        }else if(inputSerie.value.length > 0 && inputSerie.value.length < 7){
            inputSerie.setCustomValidity("Um Número de Série válido deve possuir 7 dígitos");
        }
        return;
    }
    document.getElementById("spanSerie").innerHTML = "Número de Série";
}

function ValidaFabrica(){
    //Apaga as mensagens de erro anteriores
    inputFabrica.setCustomValidity("");
    //Reexecuta validação
    if (!inputFabrica.validity.valid && !primeiraTentativa) {
        //Se inválido, coloca mensagem de erro
        document.getElementById("spanFabrica").innerHTML = "Número de Fábrica*";
        if(inputFabrica.value == ""){
            inputFabrica.setCustomValidity("O campo Número de Fábrica é obrigatório");
        }else if(inputFabrica.value.length > 0 && inputFabrica.value.length < 9){
            inputFabrica.setCustomValidity("Um Número de Fábrica válido deve possuir 9 dígitos");
        }
        return;
    }
    document.getElementById("spanFabrica").innerHTML = "Número de Fábrica";
}

function ValidaEmpresa(){
    selectEmpresa.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!selectEmpresa.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("spanEmpresa").innerHTML = "Empresa*";
            if(selectEmpresa.value == ""){
                selectEmpresa.setCustomValidity("O campo Empresa é obrigatório");
            }
            return;
        }
        document.getElementById("spanEmpresa").innerHTML = "Empresa";
    }
}

function ValidaTipoCartao(){
    selectTipoCartao.setCustomValidity("");

    if(!primeiraTentativa){
        //Reexecuta validação
        if (!selectTipoCartao.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("spanTipoCartao").innerHTML = "Tipo Cartão*";
            if(selectTipoCartao.value == ""){
                selectTipoCartao.setCustomValidity("O campo Tipo Cartão é obrigatório");
            }
            return;
        }
        document.getElementById("spanTipoCartao").innerHTML = "Tipo Cartão";
    }
}

btnCadastrarNovoPasse.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa = false;
    ValidaSerie();
    ValidaFabrica();
    ValidaEmpresa();
    ValidaTipoCartao();
}

inputSerie.oninput = function(){
    ValidaSerie();
}

inputFabrica.oninput = function(){
    ValidaFabrica();
}

selectEmpresa.oninput = function(){
    ValidaEmpresa();
}

selectTipoCartao.oninput = function(){
    ValidaTipoCartao();
}
//Aqui acabam as funções para validação do Form

//Função para limpar o Form de Cadastro
function LimparForm(){
    inputSerie.value = "";
    inputFabrica.value = "";
    selectEmpresa.value = "";
    selectTipoCartao.value = "Normal";
    
    //Atribuindo ao input que tipo de Cadastro de Passe é
    document.getElementById("inputTipoCadastro").setAttribute("value", "Novo Passe");

    AlternaParaCadastrarNovoPasseForm();
}

//Função para formatar CPF
function FormataCPF(cpf){
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9, 11);
}

//Colocando um listener para alterar o comportamento do Form
const form = document.getElementById("formCadastroPasse");
form.addEventListener("submit", function(event){
    event.preventDefault();

    document.getElementById("cadastroCartaoModal").setAttribute("hidden", "true");
    var restantePagina = document.querySelectorAll("body>div:not(.cadastroCartaoModal)");
    restantePagina.forEach(element => {
        element.classList.remove("restantePagina"); 
    });

    //Enviando a requisição AJAX para o controller do PHP
    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "CadastroPasse/controllerCadastroPasse.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200 && !this.responseText.includes("Fatal error")){
                document.getElementById("inputAtualizaLista").value = "Desatualizada";
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
            }else{
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.responseText);
            }
        }
    }
    LimparForm();
    ResetarCorCartão();
});