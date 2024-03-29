//Classe JS que será responsável por escrever os Pop-Ups de qualquer mensagem simples para o usuário, para janelas mais
//complexas é melhor utilizar os Modais

export class PopUp{

    //Método responsável por imprimir o PopUp na tela, deve ser criada uma div no html onde o PopUp será mostrado, e o
    //id dessa div deve ser passada por parâmetro para esse método assim como o caminho até o popUp.html e popUp.css a 
    //partir do arquivo que o chama, o texto que será impresso no PopUp também deve ser passado por parâmetro
    imprimirPopUp(pathHtml, pathCss, idDiv, mensagem){
        //Chama o html do PopUp
        fetch(pathHtml).then(response => {
            return response.text();
        }).then(html => {
            document.getElementById(idDiv).className = "divPopUp";

            var restantePagina = document.querySelectorAll("body>div:not(.divPopUp)");
            restantePagina.forEach(element => {
                element.classList.add("restantePaginaPopUp");
            });

            document.getElementById(idDiv).innerHTML = html;
            document.getElementById("cssPopUp").setAttribute("href", pathCss);
            document.getElementById("textoPopUp").innerHTML = mensagem;

            var content = document.getElementById("contentPopUp").innerHTML;
            var header = document.getElementById("headerPopUp").innerHTML;
            var texto = document.getElementById("textoPopUp").innerHTML;
            var footer = document.getElementById("footerPopUp").innerHTML;

            document.documentElement.onclick = function(event){
                if(event.target.innerHTML != content && event.target.innerHTML != header
                     && event.target.innerHTML != texto && event.target.innerHTML != footer
                      && event.target.id != "buttonXPopUp"){
                    document.getElementById(idDiv).innerHTML = "";
                    restantePagina.forEach(element => {
                        element.classList.remove("restantePaginaPopUp"); 
                    });
                }
            }

            document.getElementById("buttonXPopUp").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePaginaPopUp"); 
                });
            })

            document.getElementById("buttonFechar").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePaginaPopUp"); 
                });
            })
        })
    }

    //Método responsável por imprimir o PopUp de Confirmação na tela, o parâmetro transicao basicamente informa 
    //se não haverá naoTemPopUpApos normal logo após o uso desse PopUp de Confirmação
    imprimirPopUpConfirmacao(pathHtml, pathCss, idDiv, mensagem, naoTemPopUpApos){
        //Chama o html do PopUpConfirmacao e espera ele ser carregado para poder dar continuidade ao código
        return fetch(pathHtml).then(response => {
            return response.text();
        }).then(html => {
            document.getElementById(idDiv).className = "divPopUp";

            var restantePagina = document.querySelectorAll("body>div:not(.divPopUp)");
            restantePagina.forEach(element => {
                element.classList.add("restantePaginaPopUp");
            });

            //São atribuídos os valores para as Div's e os eventos dos Buttons
            document.getElementById(idDiv).innerHTML = html;
            document.getElementById("cssPopUp").setAttribute("href", pathCss);
            document.getElementById("textoPopUp").innerHTML = mensagem;

            var content = document.getElementById("contentPopUp").innerHTML;
            var header = document.getElementById("headerPopUp").innerHTML;
            var texto = document.getElementById("textoPopUp").innerHTML;
            var footer = document.getElementById("footerPopUp").innerHTML;

            document.documentElement.onclick = function(event){
                if(!content.includes(event.target.innerHTML) && !header.includes(event.target.innerHTML)
                     && !texto.includes(event.target.innerHTML) && !footer.includes(event.target.innerHTML)){
                    document.getElementById(idDiv).innerHTML = "";
                    restantePagina.forEach(element => {
                        element.classList.remove("restantePaginaPopUp"); 
                    });
                }
            }

            document.getElementById("buttonXPopUp").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePaginaPopUp"); 
                });
            })

            document.getElementById("buttonCancelar").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePaginaPopUp"); 
                });
            })

            const btnConfirmar = document.getElementById("buttonConfirmar");

            //Ao clicar no Botão de Confirmar do PopUp, é lançado um evento personalizado que eu criei
            btnConfirmar.addEventListener("click", function(){
                //Para criar o evento, instanciamos um objeto do tipo Event
                const confirmacao = new Event('confirmacao');

                //Disparando o evento para ser escutado pelo documento
                btnConfirmar.dispatchEvent(confirmacao);

                if(naoTemPopUpApos){
                    document.getElementById(idDiv).innerHTML = "";
                    restantePagina.forEach(element => {
                        element.classList.remove("restantePaginaPopUp"); 
                    });
                }
            });

            return;
        })
    }
}