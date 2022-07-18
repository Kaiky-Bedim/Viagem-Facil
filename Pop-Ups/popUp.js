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
                element.className = "restantePagina";
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
                     && event.target.innerHTML != texto && event.target.innerHTML != footer){
                    document.getElementById(idDiv).innerHTML = "";
                }
            }

            document.getElementById("buttonX").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePagina"); 
                });
            })

            document.getElementById("buttonFechar").addEventListener("click", function(){
                document.getElementById(idDiv).innerHTML = "";
                restantePagina.forEach(element => {
                    element.classList.remove("restantePagina"); 
                });
            })
        })
    }
}