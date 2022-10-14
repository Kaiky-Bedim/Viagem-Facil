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

//Variáveis de auxílio para as funções dos Selects de Insittuições de Ensino
const txtCidadeInstituicao = document.getElementById("txtCidadeInstituicao");
const txtInstituicao = document.getElementById("txtInstituicao");
const btnEnviarInstituicao = document.getElementById("btnEnviarInstituicao");
const btnRemoverInstituicao = document.getElementById("btnRemoverInstituicao");
const formInstituicoesEnsino = document.getElementById("formInstituicoesEnsino");
var primeiraTentativa0 = true;

function ValidaCidadeInstituicao(){
    txtCidadeInstituicao.setCustomValidity("");

    if(!primeiraTentativa0){
        //Reexecuta validação
        if (!txtCidadeInstituicao.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelCidadeInstituicao").innerHTML = "Cidade da Instituição de Ensino*";
            if(txtCidadeInstituicao.value == ""){
                txtCidadeInstituicao.setCustomValidity("O campo Cidade da Instituição de Ensino é obrigatório");
            }
            return;
        }
        document.getElementById("labelCidadeInstituicao").innerHTML = "Cidade da Instituição de Ensino";
    }
}

function ValidaInstituicao(){
    txtInstituicao.setCustomValidity("");

    if(!primeiraTentativa0){
        //Reexecuta validação
        if (!txtInstituicao.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelInstituicao").innerHTML = "Instituição de Ensino*";
            if(txtInstituicao.value == ""){
                txtInstituicao.setCustomValidity("O campo Instituição de Ensino é obrigatório");
            }
            return;
        }
        document.getElementById("labelInstituicao").innerHTML = "Instituição de Ensino";
    }
}

btnEnviarInstituicao.onclick = function(){
    primeiraTentativa0 = false;
    ValidaCidadeInstituicao();
    ValidaInstituicao();
}

txtCidadeInstituicao.oninput = function(){
    ValidaCidadeInstituicao();
}

txtInstituicao.oninput = function(){
    ValidaInstituicao();
}

var cidades = [];
var arrayInstituicoes = [];

PreencheSelectsInstituicoes();

//Esta função vai preencher os Selects com todas as Instituições de Ensino cadastradas no BD
async function PreencheSelectsInstituicoes(){
    //Este fetch abaixo basicamente recupera as Instituicoes cadastradas
    var json = await fetch("CadastroInstituicoes/controllerInstituicoes.php?action=Cidades").then(response =>response.text());
    var formatados = json.replace(/"/g, "").replace(/\[/g, "").replace(/\]/g, "").split(",");
    var aux = 0
    
    //Verificando se a requisição foi bem sucedida ou não
    if(json.includes("Fatal error") || json.includes("Erro de servidor")){
        return;
    }

    //Este for está removendo as cidades repetidasque foram recuperadas
    for(var cont = 0; cont < formatados.length; cont++){
        if(cidades[aux - 1] != formatados[cont]){
            var option = document.createElement("option");
            option.innerHTML = formatados[cont];
            option.value = aux;
            txtCidadeInstituicao.appendChild(option);
            cidades[aux] = formatados[cont];
            aux++;
        }
    }

    for(var cont = 0; cont < cidades.length; cont++){
        var array = await fetch("CadastroInstituicoes/controllerInstituicoes.php?action=Instituicoes&cidade=" + cidades[cont]).then(response =>response.text());
        arrayInstituicoes[cont] = array.replace(/"/g, "").replace(/\[/g, "").replace(/\]/g, "").split(",");
    }

    //Verificando se o Usuário já possuí uma Instituição de Ensino cadastrada no sistema
    if(dados['instituicaoEnsinoCidade'] != null){
        for(var cont = 0; cont < txtCidadeInstituicao.children.length; cont++){
            if(dados['instituicaoEnsinoCidade'] == cidades[cont]){
                //Preenchendo automaticamente os campos que pertencem ao Usuário
                txtCidadeInstituicao.value = cont;
                PreencheCidades(cont);
                txtInstituicao.value = dados['instituicaoEnsino'];
            }
        }

        //Verificando se as Instituições não são as mesmas do BD, caso sejam o Botão permanece desativado
        if(dados['instituicaoEnsinoCidade'] == txtCidadeInstituicao.value && dados['instituicaoEnsino'] == txtInstituicao.value){
            btnEnviarInstituicao.setAttribute("disabled", "true");
            btnRemoverInstituicao.removeAttribute("disabled");
        }else{
            btnEnviarInstituicao.removeAttribute("disabled");
            btnRemoverInstituicao.setAttribute("disabled", "true");
        }
    }else{
        btnEnviarInstituicao.removeAttribute("disabled");
        btnRemoverInstituicao.setAttribute("disabled", "true");
    }
}

//Evento executado quando o Form é enviado
formInstituicoesEnsino.addEventListener("submit", async function(event){
    event.preventDefault();

    //Imprimindo o PopUp de confirmação para ter certeza de que o usuário vai querer cadastar/alterar sua Instituição de Ensino
    await popUp.imprimirPopUpConfirmacao("../Pop-Ups/popUpConfirmacao.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Deseja mesmo Cadastrar/Alterar sua Instituição de Ensino ?");

    const btnConfirmar = document.getElementById("buttonConfirmar");
    btnConfirmar.addEventListener("confirmacao", function(){    
        let data = new FormData(formInstituicoesEnsino);
        let httpRequest = new XMLHttpRequest();

        httpRequest.open("POST", "CadastroInstituicoes/controllerInstituicoes.php");
        httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
        httpRequest.send(data);
        httpRequest.onreadystatechange = async function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    //Verificando todos o possíveis retornos da Requisição
                    if(this.response.includes("Instituição de Ensino cadastrada com Sucesso")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                        btnEnviarInstituicao.setAttribute("disabled", "true");
                        btnRemoverInstituicao.removeAttribute("disabled");

                        //Atualizando o JSON
                        dados['instituicaoEnsinoCidade'] = txtCidadeInstituicao.value;
                        dados['instituicaoEnsino'] = txtInstituicao.value;
                    }else if(this.response.includes("Access denied")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                    }else if(this.response.includes("Ocorreu um erro inesperado !")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                    }else{
                        console.log(this.response);
                    }
                }
            }
        }
    });
});

//Evento acionado quando o usuário seleciona uma opção do Select
txtCidadeInstituicao.addEventListener("change", function(event){
    txtInstituicao.removeAttribute("disabled");
    txtInstituicao.innerHTML = "";

    //Setando values corretos para os Options !
    for(var cont = 1; cont <= cidades.length; cont++){
        txtCidadeInstituicao.children.item(cont).value = cont - 1;
    }

    PreencheCidades(event.target.value);
});

//Função para preencher as Escolas de determinada Cidade selecionada na outra SelectBox
function PreencheCidades(i){
    var dadosInstituicoes = arrayInstituicoes[i];

    //Criando os options corretos das escolas da cidade escolhida
    for(var cont = 0; cont < dadosInstituicoes.length; cont++){
        var option = document.createElement("option");
        option.innerHTML = dadosInstituicoes[cont];
        option.value = dadosInstituicoes[cont];
        txtInstituicao.appendChild(option);
    }

    //Setando values corretos para os Options !
    for(var cont = 1; cont <= cidades.length; cont++){
        txtCidadeInstituicao.children.item(cont).value = cidades[cont - 1];
    }

    //Verificando se as Instituições não são as mesmas do BD, caso sejam o Botão permanece desativado
    if(dados['instituicaoEnsinoCidade'] == txtCidadeInstituicao.value && dados['instituicaoEnsino'] == txtInstituicao.value){
        btnEnviarInstituicao.setAttribute("disabled", "true");
        btnRemoverInstituicao.removeAttribute("disabled");
    }else{
        btnEnviarInstituicao.removeAttribute("disabled");
        btnRemoverInstituicao.setAttribute("disabled", "true");
    }
}

//Este Listener fica de olho para possíveis alterações nas informações das Instituições
txtInstituicao.addEventListener("change", function(){
    //Verificando se as Instituições não são as mesmas do BD, caso sejam o Botão permanece desativado
    if(dados['instituicaoEnsinoCidade'] == txtCidadeInstituicao.value && dados['instituicaoEnsino'] == txtInstituicao.value){
        btnEnviarInstituicao.setAttribute("disabled", "true");
        btnRemoverInstituicao.removeAttribute("disabled");
    }else{
        btnEnviarInstituicao.removeAttribute("disabled");
        btnRemoverInstituicao.setAttribute("disabled", "true");
    }
});

//Função para remover a Instituição que foi cadastrada para o Usuário
btnRemoverInstituicao.addEventListener("click", async function(){
    //Imprimindo o PopUp de confirmação para ter certeza de que o usuário vai querer remover sua Instituição de Ensino
    await popUp.imprimirPopUpConfirmacao("../Pop-Ups/popUpConfirmacao.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Deseja mesmo Remover sua Instituição de Ensino do seu cadastro ?");

    const btnConfirmar = document.getElementById("buttonConfirmar");
    btnConfirmar.addEventListener("confirmacao", function(){
        //Criando os objetos para fazer a requisição
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "CadastroInstituicoes/controllerInstituicoes.php");
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpRequest.send("Remover=1");
        httpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    //Verificando todos o possíveis retornos da Requisição
                    if(this.response.includes("Instituições removidas do seu cadastro com sucesso !")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                        btnEnviarInstituicao.removeAttribute("disabled");
                        btnRemoverInstituicao.setAttribute("disabled", "true");

                        //Atualizando o JSON
                        dados['instituicaoEnsinoCidade'] = null;
                        dados['instituicaoEnsino'] = null;
                    }else if(this.response.includes("Access denied")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                    }else if(this.response.includes("Ocorreu um erro inesperado !")){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                    }else{
                        console.log(this.response);
                    }
                }
            }
        }
    });
})

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
    
    //Verificando se a requisição foi um sucesso ou não
    if(json.includes("Fatal error") || json.includes("Erro de servidor")){
        return;
    }

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

    httpRequest.open("POST", "AlterarDadosPessoais/controllerConfiguracoes.php");
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

//Recuperando o Button para alterar a Senha do Usuário
const btnAlterarSenha = document.getElementById("btnAlterarSenha");
const divAlterarSenha = document.getElementById("alterarSenha");
const inputSenha = document.getElementById("txtSenha");
const btnEnviarSenha = document.getElementById("btnEnviarSenha");
const formMudarSenha = document.getElementById("formMudarSenha");
var segundaRequisicao = false;
var primeiraTentativa1 = true;
var restantePagina;
var content;

//Função executada ao clicar no Button Alterar Senha
btnAlterarSenha.addEventListener("click", function(){
    //Fazendo a tela de Alteração de Senha aparecer
    divAlterarSenha.removeAttribute("hidden");

    //Este Observer fica observando o input até seu valor ser mudado, ele apenas seta as configurações para verificar se o usuário clicou fora da tela de Alteração de Senha
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(divPopUp.innerHTML == ""){
                SetaDocumentOnClick();
            }
        });
    });

    observer.observe(divPopUp, { childList: true});

    //Setando o restante da página como forma de fechar a tela de Alteração de Senha
    restantePagina = document.querySelectorAll("body>div:not(.formMudarSenha)");
    restantePagina.forEach(element => {
        if(element.id != "alterarSenha"){
            element.classList.add("restantePaginaAlteracaoSenha");
        }
    });

    //Caso o usuário clique fora da telinha de Alteração de Senha, ela fechará
    SetaDocumentOnClick();

    //Caso o usuário clique na tela Voltar, ela fechará também !
    document.getElementById("btnVoltar").addEventListener("click", function(){
        FecharJanela();
    })
})

//Esta função seta o Document.click para auxiliar no fechamento da tela de Alteração de Senha
function SetaDocumentOnClick(){
    //Recuperando a tag da Div que não pode fechar a janela de Alterar Senha quando clicada
    content = document.getElementById("alterarSenha");

    document.documentElement.onclick = function(event){
        if(event.target.id != "btnAlterarSenha" && !content.innerHTML.includes(event.target.parentNode.innerHTML) 
            && event.target.id != "buttonXPopUp" && event.target.id != "buttonFechar"){
            FecharJanela();
        }
    }
}

//Esta função fecha a janela de Alteração de Senha
function FecharJanela(){
    //Escondendo a janela de Alteração de Senha
    document.getElementById("alterarSenha").setAttribute("hidden", "true");

    //Trocando os campos do Form
    divSenhaAtual.removeAttribute("hidden");
    divNovaSenha.setAttribute("hidden", "true");
    divConfirmaNovaSenha.setAttribute("hidden", "true");

    inputSenha.removeAttribute("disabled");
    inputNovaSenha.setAttribute("disabled", "true");
    inputConfirmarNovaSenha.setAttribute("disabled", "true");

    inputSenha.value = "";
    inputNovaSenha.value = "";
    inputConfirmarNovaSenha.value = "";

    restantePagina.forEach(element => {
        element.classList.remove("restantePaginaAlteracaoSenha");
    });

    //Setando a variável de controle como true
    segundaRequisicao = false;
}

//Funções para validar os campos do formulário 1
function ValidaSenha(){
    inputSenha.setCustomValidity("");

    if(!primeiraTentativa1){
        //Reexecuta validação
        if (!inputSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelSenha").innerHTML = "Senha Atual*";
            if(inputSenha.value == ""){
                inputSenha.setCustomValidity("O campo Senha Atual é obrigatório");
            }else if(inputSenha.value.length > 0 && inputSenha.value.length < 8){
                inputSenha.setCustomValidity("Uma Senha válida deve possuir 8 dígitos no mínimo");
            }
            return;
        }
        document.getElementById("labelSenha").innerHTML = "Senha Atual";
    }
}

btnEnviarSenha.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    primeiraTentativa1 = false;
    ValidaSenha();
}

inputSenha.oninput = function(){
    ValidaSenha();
}

//Recuperando as referências de Divs e inputs importantes do Form
const divPopUp = document.getElementById("divPopUp");
const divSenhaAtual = document.getElementById("divSenhaAtual");
const divNovaSenha = document.getElementById("divNovaSenha");
const divConfirmaNovaSenha = document.getElementById("divConfirmaNovaSenha");
const inputNovaSenha = document.getElementById("txtNovaSenha");
const inputConfirmarNovaSenha = document.getElementById("txtConfirmarNovaSenha");
var primeiraTentativa2 = true;

//Funções para validar os campos do formulário 2
function ValidaNovaSenha(){
    inputNovaSenha.setCustomValidity("");

    if(!primeiraTentativa2){
        //Reexecuta validação
        if (!inputNovaSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelNovaSenha").innerHTML = "Nova Senha*";
            if(inputNovaSenha.value == ""){
                inputNovaSenha.setCustomValidity("O campo Nova Senha é obrigatório");
            }else if(inputNovaSenha.value.length > 0 && inputNovaSenha.value.length < 8){
                inputNovaSenha.setCustomValidity("Uma Senha válida deve possuir 8 dígitos no mínimo");
            }
            return;
        }
        document.getElementById("labelNovaSenha").innerHTML = "Nova Senha";
    }
}

function ValidaConfirmaNovaSenha(){
    inputConfirmarNovaSenha.setCustomValidity("");

    if(!primeiraTentativa2){
        //Reexecuta validação
        if (!inputConfirmarNovaSenha.validity.valid) {
            //Se inválido, coloca mensagem de erro
            document.getElementById("labelConfirmarNovaSenha").innerHTML = "Confirmar Nova Senha*";
            if(inputConfirmarNovaSenha.value == ""){
                inputConfirmarNovaSenha.setCustomValidity("O campo Confirmar Nova Senha é obrigatório");
            }else if(inputConfirmarNovaSenha.value.length > 0 && inpuinputConfirmarNovaSenhatNovaSenha.value.length < 8){
                inputConfirmarNovaSenha.setCustomValidity("Uma Senha válida deve possuir 8 dígitos no mínimo");
            }
            return;
        }
        document.getElementById("labelConfirmarNovaSenha").innerHTML = "Confirmar Nova Senha";
    }
}

btnEnviarSenha.onclick = function(){
    //Verifica se é a primeira vez que se preenche o formulário
    if(!segundaRequisicao){
        primeiraTentativa1 = false;
        ValidaSenha();
    }else{
        primeiraTentativa2 = false;
        ValidaNovaSenha();
        ValidaConfirmaNovaSenha();
    }
}

inputNovaSenha.oninput = function(){
    ValidaNovaSenha();
}

inputConfirmarNovaSenha.oninput = function(){
    ValidaConfirmaNovaSenha();
}

//Esta é a função que será executada ao Enviar o primeiro formulário de Alteração de Senha
formMudarSenha.addEventListener("submit", function(event){
    event.preventDefault();

    //Criando o objeto do formulário que será mandado para o Servidor
    let httpRequest = new XMLHttpRequest();

    //Verifica para qual dos dois Endpoints a requisição será mandada
    if(!segundaRequisicao){
        httpRequest.open("POST", "AlterarSenha/controllerCompararSenha.php");
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpRequest.send("senha=" + inputSenha.value);
        httpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    //Verificando as possíveis diferentes respostas da API
                    if(this.response == "Senha correta"){
                        //Trocando os campos do Form
                        divSenhaAtual.setAttribute("hidden", "true");
                        divNovaSenha.removeAttribute("hidden");
                        divConfirmaNovaSenha.removeAttribute("hidden");

                        inputSenha.setAttribute("disabled", "true");
                        inputNovaSenha.removeAttribute("disabled");
                        inputConfirmarNovaSenha.removeAttribute("disabled");

                        segundaRequisicao = true;
                    }else if(this.response.includes("Access denied")){
                        FecharJanela();
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                    }
                    else{
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                    }
                }else{
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
                }
            }
        }
    }else{
        //Verificando se os campos senha não são iguais
        if(inputNovaSenha.value != inputConfirmarNovaSenha.value){
            popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Os campos senhas não são iguais");
            return;
        }

        httpRequest.open("POST", "../EsqueceuSenha/controllerAlterarSenha.php");
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpRequest.send("senha=" + inputNovaSenha.value);
        httpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    //Verificando as possíveis diferentes respostas da API
                    if(this.response == "Senha alterada com sucesso"){
                        FecharJanela();
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);    
                    }else if(this.response == "Senha nova não pode ser igual a antiga"){
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);
                        SetaDocumentOnClick();
                    }else if(this.response == "Você não possui autorização para alterar a Senha"){
                        FecharJanela();
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", this.response);    
                    }else if(this.response.includes("Access denied")){
                        FecharJanela();
                        popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu algum erro interno na requisição com o servidor");
                    }else{
                        console.log(this.response);
                    }
                }else{
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível terminar a requisição");
                }
            }
        }
    }
})