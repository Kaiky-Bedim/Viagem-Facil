import { PopUp } from "../../Pop-Ups/popUp.js";
import { MovimentacoesManager } from "../../Infra/ContaManager/MovimentacoesManager/movimentacoesManager.js";

var movimentacoesManager = new MovimentacoesManager();
var popUp = new PopUp();

//Recuperando elementos da página e setando variáveis de controle
const btnAnterior = document.getElementById("btnAnteriorHistorico");
const btnProximo = document.getElementById("btnProximoHistorico");
const inputPagina = document.getElementById("inputPaginaHistorico");
const tblHistorico = document.getElementById("tableHistorico");
var paginaAtual = 1;
var totalPaginas = 1;
var registrosMostrando = 0;
var qtdRegistros = 0;
var movimentacoes;

//Esta função abaixo é responsável por mostrar todo o Histórico de todos os cartões do Usuário
const btnMostrarTodoHistorico = document.getElementById("btnMostrarTodoHistorico");
btnMostrarTodoHistorico.addEventListener("click", async function(){
    if(btnMostrarTodoHistorico.getAttribute("aria-pressed") != "true"){
        //Apagando os dados da tabela de histórico e voltando ela para a página 1
        ResetaListaMostrada();
        ResetaPaginacao();

        //Recuperando um Json com todas as Movimentacoes do usuário
        var json = await movimentacoesManager.buscarDadosCartoes("../Infra/ContaManager/MovimentacoesManager/controllerMovimentacoesManager.php", "movimentacaoJson");
    
        //Verificando se as Moviemtnacoes não vieram como null, caso positivo, não há histórico para o usuário
        if(json.includes(":null") && json.includes("\"" + "null" + "\"")){
            popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não há nenhum registro de uso dos cartões !");
            return;
        }

        //Recuperando os dados que serão utilizados na tabela e montando a tabela
        movimentacoes = DeserializarJsonMovimentacoes(json);

        MontaTabela();

        //Alterando o estado do Button
        btnMostrarTodoHistorico.setAttribute("aria-pressed", "true");
        btnMostrarTodoHistorico.classList.add("btnMostrarTodoHistoricoApertado");
    }else{
        //Alterando o estado do Button
        btnMostrarTodoHistorico.setAttribute("aria-pressed", "false");
        btnMostrarTodoHistorico.classList.remove("btnMostrarTodoHistoricoApertado");

        //Apagando os dados da tabela de histórico e voltando ela para a página 1
        ResetaListaMostrada();
        ResetaPaginacao();

        //Verificando se há algum button Visualizar apertado para que sejam mostradas as informações deste cartão selecionado
        for(var cont = 1; cont <= registrosMostrando; cont++){
            var elemento = document.getElementById("btnVisualizar" + cont);
            if(elemento){
                if(elemento.getAttribute("aria-pressed") == "true"){
                    var numSerie = document.getElementById("divSerieExposta").innerText;
                    var empresa = document.getElementById("imgLogoEmpresa").getAttribute("src");
                    if(empresa.includes("MARINGA")){
                        empresa = "Maringá do Vale";
                    }else if(empresa.includes("VIAÇÃO")){
                        empresa = "Viação Jacareí";
                    }
        
                    //Recuperando um Json com todas as Movimentacoes de um Cartão específico do Usuário
                    var json = await movimentacoesManager.buscarDadosCartoes("../Infra/ContaManager/MovimentacoesManager/controllerMovimentacoesManager.php", "movimentacaoJson", numSerie, empresa);
        
                    //Recuperando os dados que serão utilizados na tabela e montando a tabela
                    movimentacoes = DeserializarJsonMovimentacoes(json);
        
                    MontaTabela();
                }
            }
        }
    }

    
});

function MontaTabela(){
    if(qtdRegistros > 5){
        registrosMostrando = 5;

        //Descobrindo quantas páginas de histórico existirão
        var value = qtdRegistros / 5;
        if(qtdRegistros % 5 != 0){
            totalPaginas = Math.ceil(value);
        }else{
            totalPaginas = value;
        }

        btnProximo.classList.replace("btnDesabilitado", "btn-light");
        btnProximo.removeAttribute("disabled");

        CriarCamposTabelaHistorico(registrosMostrando);
    }else{
        totalPaginas = 1;
        registrosMostrando = qtdRegistros;
        CriarCamposTabelaHistorico(registrosMostrando);
    }
    
    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdRegistros;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem4").innerHTML = aux;
    document.getElementById("spanMensagem5").innerHTML = i;
}

//Esta função deserializa o json que vem de Movimentacões Manager, para que possa ser usado como Array
function DeserializarJsonMovimentacoes(data){
    //Este objeto será retornado com todas as informações de todas as Movimentacoes
    var movimentacoes = {
        valor: [],
        dataMovimentacao: [],
        tipoMovimentacao: [],
        numeroSerieCartao: [],
        empresaCartao: [],
        idPercurso: []
    };
    
    //Tratando das diferenças entre um array de Números de Série e Empresas, de um único valor
    var json = JSON.parse(data);

    var arrayNumerosSerieCartoes = [];
    var arrayEmpresasCartoes = [];

    if(json['numeroSerieCartao'].includes(",")){
        var numeroSerieCartoes = json['numeroSerieCartao'].replace(/"/g, "");
        var empresaCartoes = json['empresaCartao'].replace(/"/g, "");

        numeroSerieCartoes = numeroSerieCartoes.slice(1, numeroSerieCartoes.length - 1);
        empresaCartoes = empresaCartoes.slice(1, empresaCartoes.length - 1);

        arrayNumerosSerieCartoes = numeroSerieCartoes.split(",");
        arrayEmpresasCartoes = empresaCartoes.split(",");
    }else{
        var i = json['valor'].split(",").length;
        for(var cont = 0; cont < i; cont++){
            arrayNumerosSerieCartoes[cont] = json['numeroSerieCartao'];
            arrayEmpresasCartoes[cont] = json['empresaCartao'];
        }
    }

    //Atribuindo os valores de cada um dos campos a seus respectivos espaços no objeto Movimentacoes
    var valores = json['valor'].replace(/"/g, "");
    var dataMovimentacoes = json['dataMovimentacao'].replace(/"/g, "");
    var tipoMovimentacoes = json['tipoMovimentacao'].replace(/"/g, "");
    var idPercursos = json['idPercurso'].replace(/"/g, "");

    valores = valores.slice(1, valores.length - 1);
    dataMovimentacoes = dataMovimentacoes.slice(1, dataMovimentacoes.length - 1);
    tipoMovimentacoes = tipoMovimentacoes.slice(1, tipoMovimentacoes.length - 1);
    idPercursos = idPercursos.slice(1, idPercursos.length - 1);

    var arrayValores = valores.split(",");
    var arrayDatasMovimentacoes = dataMovimentacoes.split(",");
    var arrayTiposMovimentacoes = tipoMovimentacoes.split(",");
    var arrayIdsPercursos = idPercursos.split(",");

    movimentacoes.valor = arrayValores;
    movimentacoes.dataMovimentacao = arrayDatasMovimentacoes;
    movimentacoes.tipoMovimentacao = arrayTiposMovimentacoes;
    movimentacoes.numeroSerieCartao = arrayNumerosSerieCartoes;
    movimentacoes.empresaCartao = arrayEmpresasCartoes;
    movimentacoes.idPercurso = arrayIdsPercursos;

    //Setando a quantidade de registros do usuário
    qtdRegistros = arrayValores.length;

    return movimentacoes;
}

function CriarCamposTabelaHistorico(qtdCampos){
    for(var cont = 1; cont <= qtdCampos; cont++){
        var trNovo = document.createElement("tr");
        trNovo.id = "trHistorico" + cont;

        tblHistorico.appendChild(trNovo);
        
        var td1 = document.createElement("td");
        td1.id = "tdValor"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td1);

        var td2 = document.createElement("td");
        td2.id = "tdDataMovimentacao"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td2);

        var td3 = document.createElement("td");
        td3.id = "tdTipoMovimentacao"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td3);

        var td4 = document.createElement("td");
        td4.id = "tdNumeroSerie"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td4);

        var td5 = document.createElement("td");
        td5.id = "tdEmpresaHistorico"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td5);

        var td6 = document.createElement("td");
        td6.id = "tdIdPercurso"+cont;
        document.getElementById("trHistorico" + cont).appendChild(td6);
    }

    PreencheLinhasTabela(1, qtdCampos);
}

//Esta função varre linha por linha da tabela de Histórico e atribuí os valores necessários
function PreencheLinhasTabela(pagina, linhas){
    var aux = 6;
    aux = aux - pagina * 5;
    for(var cont = 1; cont <= linhas; cont++){
        document.getElementById("tdValor" + cont).innerHTML = "R$ " + parseFloat(movimentacoes.valor[cont - aux]).toFixed(2);
        document.getElementById("tdDataMovimentacao" + cont).innerHTML = FormataData(movimentacoes.dataMovimentacao[cont - aux]);
        document.getElementById("tdTipoMovimentacao" + cont).innerHTML = movimentacoes.tipoMovimentacao[cont - aux];
        document.getElementById("tdNumeroSerie" + cont).innerHTML = movimentacoes.numeroSerieCartao[cont - aux];
        document.getElementById("tdEmpresaHistorico" + cont).innerHTML = movimentacoes.empresaCartao[cont - aux];
        if(movimentacoes.idPercurso[cont - aux] == "null"){
            document.getElementById("tdIdPercurso" + cont).innerHTML = "#";
        }else{
            document.getElementById("tdIdPercurso" + cont).innerHTML = movimentacoes.idPercurso[cont - aux];
        }
    }
}

//Esta função é responsável por formatar a Data mostrada na tabela
function FormataData(data){
    var aux = new Date(data);
    var dataFormatada = aux.getDate() + "/" + (aux.getMonth() + 1) + "/" + aux.getFullYear() + " - " + aux.getHours() + ":" + aux.getMinutes() + ":" + aux.getSeconds();
    return dataFormatada;
}

//Esta função é executada toda vez que o button Próximo é clicado
btnProximo.addEventListener("click", function(){
    btnAnterior.removeAttribute("disabled");
    btnAnterior.classList.replace("btnDesabilitado", "btn-light");
    paginaAtual++;
    var linhas = 5;

    //Neste If eu verifico se esta é a última página que será mostrada ou não
    if(paginaAtual == totalPaginas){
        btnProximo.setAttribute("disabled", "true");
        btnProximo.classList.replace("btn-light", "btnDesabilitado");
        linhas = qtdRegistros - ((paginaAtual - 1) * 5);
        ResetaListaMostrada();
        CriarCamposTabelaHistorico(linhas);
        PreencheLinhasTabela(paginaAtual, linhas);  
    }else{
        PreencheLinhasTabela(paginaAtual, linhas);  
    }
    inputPagina.value = paginaAtual;

    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdRegistros;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem4").innerHTML = aux;
    document.getElementById("spanMensagem5").innerHTML = i;
})

//Esta função é executada toda vez que o button Anterior é clicado
btnAnterior.addEventListener("click", function(){
    btnProximo.removeAttribute("disabled");
    btnProximo.classList.replace("btnDesabilitado", "btn-light");
    paginaAtual--;

    //Neste If eu verifico se esta é a última página que será mostrada ou não
    if(paginaAtual == 1){
        btnAnterior.setAttribute("disabled", "true");
        btnAnterior.classList.replace("btn-light", "btnDesabilitado");
    }

    ResetaListaMostrada();
    CriarCamposTabelaHistorico(5);
    PreencheLinhasTabela(paginaAtual, 5);  

    inputPagina.value = paginaAtual;
    //Alterando a mensagem mostrada embaixo da lista
    var aux = (paginaAtual - 1) * 5 + 1;
    if(paginaAtual == totalPaginas){
        var i = qtdRegistros;
    }else{
        var i = aux + 4;
    }
    document.getElementById("spanMensagem4").innerHTML = aux;
    document.getElementById("spanMensagem5").innerHTML = i;
})

//Apaga todas as linhas da tabela para que novas sejam criadas
function ResetaListaMostrada(){
    tblHistorico.innerHTML = "";
}

//Reinicia todo o sistema de Paginação e a contagem de registros
function ResetaPaginacao(){
    document.getElementById("spanMensagem4").innerHTML = "0";
    document.getElementById("spanMensagem5").innerHTML = "0";
    btnAnterior.setAttribute("disabled", "true");
    btnAnterior.classList.replace("btn-light", "btnDesabilitado");
    btnProximo.setAttribute("disabled", "true");
    btnProximo.classList.replace("btn-light", "btnDesabilitado");
    inputPagina.value = "1";
    paginaAtual = 1;
}

const passeAtualSelecionado = document.getElementById("divCartaoExposto");

//Este Observer fica observando o passe selecionado até ele ser mudado
var observer = new MutationObserver(async function(mutations) {
    for(var cont = 0; cont < mutations.length; cont++){
        
        //Verificando se as mudanças que ocorreram ocasionam ou não na alteração de Lista de Histórico
        if(mutations[cont].attributeName == "hidden" || mutations[cont].attributeName == null){
            if(passeAtualSelecionado.getAttribute("hidden") != "true"){
                ResetaListaMostrada();

                //Alterando o estado do Button de mostrar todo o histórico
                if(btnMostrarTodoHistorico.getAttribute("aria-pressed")){
                    btnMostrarTodoHistorico.setAttribute("aria-pressed", "false");
                    btnMostrarTodoHistorico.classList.remove("btnMostrarTodoHistoricoApertado");
                }
    
                var numSerie = document.getElementById("divSerieExposta").innerText;
                var empresa = document.getElementById("imgLogoEmpresa").getAttribute("src");
                if(empresa.includes("MARINGA")){
                    empresa = "Maringá do Vale";
                }else if(empresa.includes("VIAÇÃO")){
                    empresa = "Viação Jacareí";
                }
    
                //Recuperando um Json com todas as Movimentacoes de um Cartão específico do Usuário
                var json = await movimentacoesManager.buscarDadosCartoes("../Infra/ContaManager/MovimentacoesManager/controllerMovimentacoesManager.php", "movimentacaoJson", numSerie, empresa);
    
                //Recuperando os dados que serão utilizados na tabela e montando a tabela
                movimentacoes = DeserializarJsonMovimentacoes(json);
    
                MontaTabela();
                break;
            }

            if(btnMostrarTodoHistorico.getAttribute("aria-pressed") != "true"){
                //Apagando os dados da tabela de histórico e voltando ela para a página 1
                ResetaListaMostrada();
                ResetaPaginacao();
            }
        }
    }
    });

//Passando os dois elementos que serão obeservados pelo Observer
observer.observe(passeAtualSelecionado, { attributes: true ,subtree: true });
observer.observe(document.getElementById("divSerieExposta"), { childList: true });