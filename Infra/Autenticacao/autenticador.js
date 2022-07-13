//Classe Autenticador, ela basicamente dece estar presente em todas as telas e chamar um
//método simples que só vai enviar uma requisição para o controllerAutenticacao, que verificará
//se o usuário está logado, se não estiver, ele será direcionado para a tela de Login
export class Autenticador{
    //Método que realizará a requisição, o caminho do js que quiser usar essa classe até o controller
    //autenticacao.php deve ser passado por parâmetro, o msm vale para o path para a tela de Login
    garantirAutenticacao(pathController, pathLogin) {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", pathController, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){
                    if(!this.responseText){
                        window.sessionStorage.setItem("autenticado", "false");
                        alert("Usuário não autenticado !")
                        window.location.href = pathLogin;
                        return;
                    }
                    window.sessionStorage.setItem("autenticado", "true");
                }else{
                    alert("Estamos com problemas com a sua autenticação");
                    window.sessionStorage.setItem("autenticado", "false");
                    window.location.href = pathLogin;
                }
            }
        }
    }
}