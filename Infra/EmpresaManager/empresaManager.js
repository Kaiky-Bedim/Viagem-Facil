import { PopUp } from "../../Pop-Ups/popUp.js";

//Classe para recuperar os dados das Empresas
export class EmpresasManager{

    async buscarDadosEmpresas(action, pathController, nome){
        var popUp = new PopUp();
        var urlCompleta = "";
        if(nome){
            urlCompleta = pathController + "?action=" + action + "&nome=" + nome;
        }else{
            urlCompleta = pathController+"?action="+action;
        }
        
        return fetch(urlCompleta)
            .then(response =>response.text())
            .then(data => {
                if(data.includes("Sem conexão com o servidor") || data.includes("Access denied") || data.includes("Unknown database")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível se conectar ao servidor");
                    return "Erro de servidor";
                }else if(data.includes("Trying to access array offset on value of type null")){
                    popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Não foi possível recuperar as informações das Empresas");
                    return "Erro de servidor";
                }
                return data
            }).catch(erro => {
                popUp.imprimirPopUp("../Pop-Ups/popUp.html", "../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado");
                console.log(erro);
            });
    }
}