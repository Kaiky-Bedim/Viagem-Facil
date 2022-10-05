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
        httpRequest.open("POST", "controllerCompararSenha.php");
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