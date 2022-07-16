//Essa classe é a responsável por fazer as requisições AJAX para o controller
//de usuárioManager, recuperando os dados do BD sobre o usuário logado

export class UsuarioManager{

    //A variável action determina o que será buscado no controller do Usuário, o path controller é o caminho até o
    //controller a partir da classe que estiver chamando este método. Este método é assícrono, por isso, onde ele
    //for chamado deve ser seguido de then()
    async buscarDadosUsuario(action, pathController){
        var urlCompleta = pathController+"?action="+action;
        return fetch(urlCompleta)
            .then(response =>response.text())
            .then(data => {
                return data
            }).catch(erro => {
                alert("Ocorreu um erro inesperado");
                console.log(erro);
            });
    }
}