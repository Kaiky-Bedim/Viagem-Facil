import { Autenticador } from "../Infra/Autenticacao/autenticador.js";

var autenticador = new Autenticador();
//Mátodo que garante a autenticação do nosso usuário
autenticador.garantirAutenticacao("../Infra/Autenticacao/controllerAutenticacao.php", "../Login/login.html");