//Essa classe basicamente serve para formatar Caracteres Especiais recorrentes
export class Formatador{

    //Esta função transforma strings da Tabela Unicode em seus respectivos caracteres especiais
    FormataTableParaCaracterEspecial(data){
        var dataFormatada = data;

        //Substituindo os caracteres especiais que não foram formatados pelos sues correspondentes Unicode
        dataFormatada = dataFormatada.replace(/\\u00C1/, "Á");
        dataFormatada = dataFormatada.replace(/\\u00C2/, "Â");
        dataFormatada = dataFormatada.replace(/\\u00C3/, "Ã");
        dataFormatada = dataFormatada.replace(/\\u00C7/, "Ç");
        dataFormatada = dataFormatada.replace(/\\u00C8/, "È");
        dataFormatada = dataFormatada.replace(/\\u00C9/, "É");
        dataFormatada = dataFormatada.replace(/\\u00CA/, "Ê");
        dataFormatada = dataFormatada.replace(/\\u00CC/, "Ì");
        dataFormatada = dataFormatada.replace(/\\u00CD/, "Í");
        dataFormatada = dataFormatada.replace(/\\u00CE/, "Î");
        dataFormatada = dataFormatada.replace(/\\u00D2/, "Ò");
        dataFormatada = dataFormatada.replace(/\\u00D3/, "Ó");
        dataFormatada = dataFormatada.replace(/\\u00D4/, "Ô");
        dataFormatada = dataFormatada.replace(/\\u00D5/, "Õ");
        dataFormatada = dataFormatada.replace(/\\u00D9/, "Ù");
        dataFormatada = dataFormatada.replace(/\\u00DA/, "Ú");
        dataFormatada = dataFormatada.replace(/\\u00DB/, "Û");
        dataFormatada = dataFormatada.replace(/\\u00E0/, "à");
        dataFormatada = dataFormatada.replace(/\\u00E1/, "á");
        dataFormatada = dataFormatada.replace(/\\u00E2/, "â");
        dataFormatada = dataFormatada.replace(/\\u00E3/, "ã");
        dataFormatada = dataFormatada.replace(/\\u00E7/, "ç");
        dataFormatada = dataFormatada.replace(/\\u00E8/, "è");
        dataFormatada = dataFormatada.replace(/\\u00E9/, "é");
        dataFormatada = dataFormatada.replace(/\\u00EA/, "ê");
        dataFormatada = dataFormatada.replace(/\\u00EC/, "ì");
        dataFormatada = dataFormatada.replace(/\\u00ED/, "í");
        dataFormatada = dataFormatada.replace(/\\u00EE/, "î");
        dataFormatada = dataFormatada.replace(/\\u00F2/, "ò");
        dataFormatada = dataFormatada.replace(/\\u00F3/, "ó");
        dataFormatada = dataFormatada.replace(/\\u00F4/, "ô");
        dataFormatada = dataFormatada.replace(/\\u00F5/, "õ");
        dataFormatada = dataFormatada.replace(/\\u00F9/, "ù");
        dataFormatada = dataFormatada.replace(/\\u00FA/, "ú");
        dataFormatada = dataFormatada.replace(/\\u00FB/, "û");
        dataFormatada = dataFormatada.replace(/\\u00F1/, "ñ");

        dataFormatada = dataFormatada.replace(/\\u00c1/, "Á");
        dataFormatada = dataFormatada.replace(/\\u00c2/, "Â");
        dataFormatada = dataFormatada.replace(/\\u00c3/, "Ã");
        dataFormatada = dataFormatada.replace(/\\u00c7/, "Ç");
        dataFormatada = dataFormatada.replace(/\\u00c8/, "È");
        dataFormatada = dataFormatada.replace(/\\u00c9/, "É");
        dataFormatada = dataFormatada.replace(/\\u00ca/, "Ê");
        dataFormatada = dataFormatada.replace(/\\u00cc/, "Ì");
        dataFormatada = dataFormatada.replace(/\\u00cd/, "Í");
        dataFormatada = dataFormatada.replace(/\\u00ce/, "Î");
        dataFormatada = dataFormatada.replace(/\\u00d2/, "Ò");
        dataFormatada = dataFormatada.replace(/\\u00d3/, "Ó");
        dataFormatada = dataFormatada.replace(/\\u00d4/, "Ô");
        dataFormatada = dataFormatada.replace(/\\u00d5/, "Õ");
        dataFormatada = dataFormatada.replace(/\\u00d9/, "Ù");
        dataFormatada = dataFormatada.replace(/\\u00da/, "Ú");
        dataFormatada = dataFormatada.replace(/\\u00db/, "Û");
        dataFormatada = dataFormatada.replace(/\\u00e0/, "à");
        dataFormatada = dataFormatada.replace(/\\u00e1/, "á");
        dataFormatada = dataFormatada.replace(/\\u00e2/, "â");
        dataFormatada = dataFormatada.replace(/\\u00e3/, "ã");
        dataFormatada = dataFormatada.replace(/\\u00e7/, "ç");
        dataFormatada = dataFormatada.replace(/\\u00e8/, "è");
        dataFormatada = dataFormatada.replace(/\\u00e9/, "é");
        dataFormatada = dataFormatada.replace(/\\u00ea/, "ê");
        dataFormatada = dataFormatada.replace(/\\u00ec/, "ì");
        dataFormatada = dataFormatada.replace(/\\u00ed/, "í");
        dataFormatada = dataFormatada.replace(/\\u00ee/, "î");
        dataFormatada = dataFormatada.replace(/\\u00f2/, "ò");
        dataFormatada = dataFormatada.replace(/\\u00f3/, "ó");
        dataFormatada = dataFormatada.replace(/\\u00f4/, "ô");
        dataFormatada = dataFormatada.replace(/\\u00f5/, "õ");
        dataFormatada = dataFormatada.replace(/\\u00f9/, "ù");
        dataFormatada = dataFormatada.replace(/\\u00fa/, "ú");
        dataFormatada = dataFormatada.replace(/\\u00fb/, "û");
        dataFormatada = dataFormatada.replace(/\\u00f1/, "ñ");

        dataFormatada = dataFormatada.replace(/"\[/, "[");
        dataFormatada = dataFormatada.replace(/]\"/, "]");
        dataFormatada = dataFormatada.replace(/\\/, "");

        return dataFormatada;
    }

        //Esta função transforma strings da Tabela Unicode em seus respectivos caracteres especiais
        FormataCaracterEspecialParaTable(data){
            var dataFormatada = data;
            dataFormatada = dataFormatada.replace(/ç/, "\\u00e7");

            //Substituindo os caracteres especiais que não foram formatados pelos sues correspondentes Unicode
            dataFormatada = dataFormatada.replace(/Á/, "\\u00C1");
            dataFormatada = dataFormatada.replace(/Â/, "\\u00C2");
            dataFormatada = dataFormatada.replace(/Ã/, "\\u00C3");
            dataFormatada = dataFormatada.replace(/Ç/, "\\u00C7");
            dataFormatada = dataFormatada.replace(/È/, "\\u00C9");
            dataFormatada = dataFormatada.replace(/Ê/, "\\u00CA");
            dataFormatada = dataFormatada.replace(/Ì/, "\\u00CC");
            dataFormatada = dataFormatada.replace(/Í/, "\\u00CD");
            dataFormatada = dataFormatada.replace(/Î/, "\\u00CE");
            dataFormatada = dataFormatada.replace(/Ò/, "\\u00D2");
            dataFormatada = dataFormatada.replace(/Ó/, "\\u00D3");
            dataFormatada = dataFormatada.replace(/Ô/, "\\u00D4");
            dataFormatada = dataFormatada.replace(/Õ/, "\\u00D5");
            dataFormatada = dataFormatada.replace(/Ù/, "\\u00D9");
            dataFormatada = dataFormatada.replace(/Ú/, "\\u00DA");
            dataFormatada = dataFormatada.replace(/Û/, "\\u00DB");
            dataFormatada = dataFormatada.replace(/à/, "\\u00E0");
            dataFormatada = dataFormatada.replace(/á/, "\\u00E1");
            dataFormatada = dataFormatada.replace(/â/, "\\u00E2");
            dataFormatada = dataFormatada.replace(/ã/, "\\u00E3");
            dataFormatada = dataFormatada.replace(/ç/, "\\u00E7");
            dataFormatada = dataFormatada.replace(/è/, "\\u00E8");
            dataFormatada = dataFormatada.replace(/é/, "\\u00E9");
            dataFormatada = dataFormatada.replace(/ê/, "\\u00EA");
            dataFormatada = dataFormatada.replace(/ì/, "\\u00EC");
            dataFormatada = dataFormatada.replace(/í/, "\\u00ED");
            dataFormatada = dataFormatada.replace(/î/, "\\u00EE");
            dataFormatada = dataFormatada.replace(/ò/, "\\u00F2");
            dataFormatada = dataFormatada.replace(/ó/, "\\u00F3");
            dataFormatada = dataFormatada.replace(/ô/, "\\u00F4");
            dataFormatada = dataFormatada.replace(/õ/, "\\u00F5");
            dataFormatada = dataFormatada.replace(/ù/, "\\u00F9");
            dataFormatada = dataFormatada.replace(/ú/, "\\u00FA");
            dataFormatada = dataFormatada.replace(/û/, "\\u00FB");
            dataFormatada = dataFormatada.replace(/ñ/, "\\u00F1");
    
            dataFormatada = dataFormatada.replace(/Á/, "\\u00c1");
            dataFormatada = dataFormatada.replace(/Â/, "\\u00c2");
            dataFormatada = dataFormatada.replace(/Ã/, "\\u00c3");
            dataFormatada = dataFormatada.replace(/Ç/, "\\u00c7");
            dataFormatada = dataFormatada.replace(/È/, "\\u00c8");
            dataFormatada = dataFormatada.replace(/É/, "\\u00c9");
            dataFormatada = dataFormatada.replace(/Ê/, "\\u00ca");
            dataFormatada = dataFormatada.replace(/Ì/, "\\u00cc");
            dataFormatada = dataFormatada.replace(/Í/, "\\u00cd");
            dataFormatada = dataFormatada.replace(/Î/, "\\u00ce");
            dataFormatada = dataFormatada.replace(/Ò/, "\\u00d2");
            dataFormatada = dataFormatada.replace(/Ó/, "\\u00d3");
            dataFormatada = dataFormatada.replace(/Ô/, "\\u00d4");
            dataFormatada = dataFormatada.replace(/Õ/, "\\u00d5");
            dataFormatada = dataFormatada.replace(/Ù/, "\\u00d9");
            dataFormatada = dataFormatada.replace(/Ú/, "\\u00da");
            dataFormatada = dataFormatada.replace(/Û/, "\\u00db");
            dataFormatada = dataFormatada.replace(/à/, "\\u00e0");
            dataFormatada = dataFormatada.replace(/á/, "\\u00e1");
            dataFormatada = dataFormatada.replace(/â/, "\\u00e2");
            dataFormatada = dataFormatada.replace(/ã/, "\\u00e3");
            dataFormatada = dataFormatada.replace(/ç/, "\\u00e7");
            dataFormatada = dataFormatada.replace(/è/, "\\u00e8");
            dataFormatada = dataFormatada.replace(/é/, "\\u00e9");
            dataFormatada = dataFormatada.replace(/ê/, "\\u00ea");
            dataFormatada = dataFormatada.replace(/ì/, "\\u00ec");
            dataFormatada = dataFormatada.replace(/í/, "\\u00ed");
            dataFormatada = dataFormatada.replace(/î/, "\\u00ee");
            dataFormatada = dataFormatada.replace(/ò/, "\\u00f2");
            dataFormatada = dataFormatada.replace(/ó/, "\\u00f3");
            dataFormatada = dataFormatada.replace(/ô/, "\\u00f4");
            dataFormatada = dataFormatada.replace(/õ/, "\\u00f5");
            dataFormatada = dataFormatada.replace(/ù/, "\\u00f9");
            dataFormatada = dataFormatada.replace(/ú/, "\\u00fa");
            dataFormatada = dataFormatada.replace(/û/, "\\u00fb");
            dataFormatada = dataFormatada.replace(/ñ/, "\\u00f1");
    
            dataFormatada = dataFormatada.replace(/"\[/, "[");
            dataFormatada = dataFormatada.replace(/]\"/, "]");
    
            return dataFormatada;
        }
}