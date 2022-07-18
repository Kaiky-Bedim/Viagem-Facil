import { PopUp } from "../../../Pop-Ups/popUp.js";

//Essa classe é a responsável por fazer as requisições AJAX para o controller
//de cartoesManager, recuperando os dados do BD sobre os cartões do usuário logado

export class CartoesManager{

    //A variável action determina o que será buscado no controller do Usuário, o path controller é o caminho até o
    //controller a partir da classe que estiver chamando este método. Este método é assícrono, por isso, onde ele
    //for chamado deve ser seguido de then()
    async buscarDadosCartoes(action, index, pathController){
        if(index){
            var urlCompleta = pathController+"?action="+action+"&index="+index;    
        }else{
            var urlCompleta = pathController+"?action="+action;
        }
        return fetch(urlCompleta)
            .then(response =>response.text())
            .then(data => {
                return data
            }).catch(erro => {
                var popUp = new PopUp();
                popUp.imprimirPopUp("../../../Pop-Ups/popUp.html", "../../../Pop-Ups/stylePopUp.css", "divPopUp", "Ocorreu um erro inesperado");
                console.log(erro);
            });
    }
}