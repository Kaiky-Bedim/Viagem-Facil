import { PopUp } from "../../../Pop-Ups/popUp.js";

//Essa classe é a responsável por fazer as requisições AJAX para o controller
//de movimentacoesManager, recuperando os dados do BD sobre as movimentacoes do cartão informado
export class MovimentacoesManager{

    //A variável action determina o que será buscado no controller do Usuário, o path controller é o caminho até o
    //controller a partir da classe que estiver chamando este método. Este método é assícrono, por isso, onde ele
    //for chamado deve ser seguido de then()
    async buscarDadosCartoes(pathController, action, numeroSerie, empresaCartao){
        var popUp = new PopUp();

        //Montando a Url completa para a consulta
        if(numeroSerie == undefined && empresaCartao == undefined){
            var urlCompleta = pathController+"?action="+action;
        }else{
            var urlCompleta = pathController+"?action="+action+"&numeroSerie="+numeroSerie+"&empresa="+empresaCartao;
        }

        return fetch(urlCompleta)
            .then(response =>response.text())
            .then(data => {
                if(data.includes("Sem conexão com o servidor") || data.includes("Access denied")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível se conectar ao servidor");
                    return "Erro de servidor";
                }else if(data.includes("Trying to access array offset on value of type null")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível recuperar suas informações");
                    return "Erro de servidor";
                }
                return data
            }).catch(erro => {
                popUp.imprimirPopUp("../../../Pop-Ups/popUp.html", "../../../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado");
                console.log(erro);
            });
    }
}