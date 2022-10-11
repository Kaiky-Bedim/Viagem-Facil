<?php

//Esta classe basicamente vai formatar os retornos de valores que não estiveram em UTF8,
//substituindo caracteres que não são Unicode pelos caracteres Unicode correspondentes corretos
class Formatador{

    //Esta função é a responsável por formatar os dados de Tabela para caracteres especiais
    function FormatarTabelaParaCaracteresEspeciais($data){
        $dataFormatada = $data;

        //Substituindo os caracteres especiais que não foram formatados pelos sues correspondentes Unicode
        $dataFormatada = str_replace("\u00C1", "Á", $dataFormatada);
        $dataFormatada = str_replace("\u00C2", "Â", $dataFormatada);
        $dataFormatada = str_replace("\u00C3", "Ã", $dataFormatada);
        $dataFormatada = str_replace("\u00C7", "Ç", $dataFormatada);
        $dataFormatada = str_replace("\u00C8", "È", $dataFormatada);
        $dataFormatada = str_replace("\u00C9", "É", $dataFormatada);
        $dataFormatada = str_replace("\u00CA", "Ê", $dataFormatada);
        $dataFormatada = str_replace("\u00CC", "Ì", $dataFormatada);
        $dataFormatada = str_replace("\u00CD", "Í", $dataFormatada);
        $dataFormatada = str_replace("\u00CE", "Î", $dataFormatada);
        $dataFormatada = str_replace("\u00D2", "Ò", $dataFormatada);
        $dataFormatada = str_replace("\u00D3", "Ó", $dataFormatada);
        $dataFormatada = str_replace("\u00D4", "Ô", $dataFormatada);
        $dataFormatada = str_replace("\u00D5", "Õ", $dataFormatada);
        $dataFormatada = str_replace("\u00D9", "Ù", $dataFormatada);
        $dataFormatada = str_replace("\u00DA", "Ú", $dataFormatada);
        $dataFormatada = str_replace("\u00DB", "Û", $dataFormatada);
        $dataFormatada = str_replace("\u00E0", "à", $dataFormatada);
        $dataFormatada = str_replace("\u00E1", "á", $dataFormatada);
        $dataFormatada = str_replace("\u00E2", "â", $dataFormatada);
        $dataFormatada = str_replace("\u00E3", "ã", $dataFormatada);
        $dataFormatada = str_replace("\u00E7", "ç", $dataFormatada);
        $dataFormatada = str_replace("\u00E8", "è", $dataFormatada);
        $dataFormatada = str_replace("\u00E9", "é", $dataFormatada);
        $dataFormatada = str_replace("\u00EA", "ê", $dataFormatada);
        $dataFormatada = str_replace("\u00EC", "ì", $dataFormatada);
        $dataFormatada = str_replace("\u00ED", "í", $dataFormatada);
        $dataFormatada = str_replace("\u00EE", "î", $dataFormatada);
        $dataFormatada = str_replace("\u00F2", "ò", $dataFormatada);
        $dataFormatada = str_replace("\u00F3", "ó", $dataFormatada);
        $dataFormatada = str_replace("\u00F4", "ô", $dataFormatada);
        $dataFormatada = str_replace("\u00F5", "õ", $dataFormatada);
        $dataFormatada = str_replace("\u00F9", "ù", $dataFormatada);
        $dataFormatada = str_replace("\u00FA", "ú", $dataFormatada);
        $dataFormatada = str_replace("\u00FB", "û", $dataFormatada);
        $dataFormatada = str_replace("\u00F1", "ñ", $dataFormatada);

        $dataFormatada = str_replace("\u00c1", "Á", $dataFormatada);
        $dataFormatada = str_replace("\u00c2", "Â", $dataFormatada);
        $dataFormatada = str_replace("\u00c3", "Ã", $dataFormatada);
        $dataFormatada = str_replace("\u00c7", "Ç", $dataFormatada);
        $dataFormatada = str_replace("\u00c8", "È", $dataFormatada);
        $dataFormatada = str_replace("\u00c9", "É", $dataFormatada);
        $dataFormatada = str_replace("\u00ca", "Ê", $dataFormatada);
        $dataFormatada = str_replace("\u00cc", "Ì", $dataFormatada);
        $dataFormatada = str_replace("\u00cd", "Í", $dataFormatada);
        $dataFormatada = str_replace("\u00ce", "Î", $dataFormatada);
        $dataFormatada = str_replace("\u00d2", "Ò", $dataFormatada);
        $dataFormatada = str_replace("\u00d3", "Ó", $dataFormatada);
        $dataFormatada = str_replace("\u00d4", "Ô", $dataFormatada);
        $dataFormatada = str_replace("\u00d5", "Õ", $dataFormatada);
        $dataFormatada = str_replace("\u00d9", "Ù", $dataFormatada);
        $dataFormatada = str_replace("\u00da", "Ú", $dataFormatada);
        $dataFormatada = str_replace("\u00db", "Û", $dataFormatada);
        $dataFormatada = str_replace("\u00e0", "à", $dataFormatada);
        $dataFormatada = str_replace("\u00e1", "á", $dataFormatada);
        $dataFormatada = str_replace("\u00e2", "â", $dataFormatada);
        $dataFormatada = str_replace("\u00e3", "ã", $dataFormatada);
        $dataFormatada = str_replace("\u00e7", "ç", $dataFormatada);
        $dataFormatada = str_replace("\u00e8", "è", $dataFormatada);
        $dataFormatada = str_replace("\u00e9", "é", $dataFormatada);
        $dataFormatada = str_replace("\u00ea", "ê", $dataFormatada);
        $dataFormatada = str_replace("\u00ec", "ì", $dataFormatada);
        $dataFormatada = str_replace("\u00ed", "í", $dataFormatada);
        $dataFormatada = str_replace("\u00ee", "î", $dataFormatada);
        $dataFormatada = str_replace("\u00f2", "ò", $dataFormatada);
        $dataFormatada = str_replace("\u00f3", "ó", $dataFormatada);
        $dataFormatada = str_replace("\u00f4", "ô", $dataFormatada);
        $dataFormatada = str_replace("\u00f5", "õ", $dataFormatada);
        $dataFormatada = str_replace("\u00f9", "ù", $dataFormatada);
        $dataFormatada = str_replace("\u00fa", "ú", $dataFormatada);
        $dataFormatada = str_replace("\u00fb", "û", $dataFormatada);
        $dataFormatada = str_replace("\u00f1", "ñ", $dataFormatada);

        $dataFormatada = str_replace("\"[", "[", $dataFormatada);
        $dataFormatada = str_replace("]\"", "]", $dataFormatada);
        $dataFormatada = str_replace("\\", "", $dataFormatada);

        return $dataFormatada;
    }

    //Esta função é a responsável por formatar os caracteres especiais para dados de Tabela
    function FormatarCaracteresEspeciaisParaTabela($data){
        $dataFormatada = $data;

        //Substituindo o Unicode pelos seus caracteres especiais correspondentes que não foram formatados
        $dataFormatada = str_replace("Á", "\u00C1", $dataFormatada);
        $dataFormatada = str_replace("Â", "\u00C2", $dataFormatada);
        $dataFormatada = str_replace("Ã", "\u00C3", $dataFormatada);
        $dataFormatada = str_replace("Ç", "\u00C7", $dataFormatada);
        $dataFormatada = str_replace("È", "\u00C8", $dataFormatada);
        $dataFormatada = str_replace("É", "\u00C9", $dataFormatada);
        $dataFormatada = str_replace("Ê", "\u00CA", $dataFormatada);
        $dataFormatada = str_replace("Ì", "\u00CC", $dataFormatada);
        $dataFormatada = str_replace("Í", "\u00CD", $dataFormatada);
        $dataFormatada = str_replace("Î", "\u00CE", $dataFormatada);
        $dataFormatada = str_replace("Ò", "\u00D2", $dataFormatada);
        $dataFormatada = str_replace("Ó", "\u00D3", $dataFormatada);
        $dataFormatada = str_replace("Ô", "\u00D4", $dataFormatada);
        $dataFormatada = str_replace("Õ", "\u00D5", $dataFormatada);
        $dataFormatada = str_replace("Ù", "\u00D9", $dataFormatada);
        $dataFormatada = str_replace("Ú", "\u00DA", $dataFormatada);
        $dataFormatada = str_replace("Û", "\u00DB", $dataFormatada);
        $dataFormatada = str_replace("à", "\u00E0", $dataFormatada);
        $dataFormatada = str_replace("á", "\u00E1", $dataFormatada);
        $dataFormatada = str_replace("â", "\u00E2", $dataFormatada);
        $dataFormatada = str_replace("ã", "\u00E3", $dataFormatada);
        $dataFormatada = str_replace("ç", "\u00E7", $dataFormatada);
        $dataFormatada = str_replace("è", "\u00E8", $dataFormatada);
        $dataFormatada = str_replace("é", "\u00E9", $dataFormatada);
        $dataFormatada = str_replace("ê", "\u00EA", $dataFormatada);
        $dataFormatada = str_replace("ì", "\u00EC", $dataFormatada);
        $dataFormatada = str_replace("í", "\u00ED", $dataFormatada);
        $dataFormatada = str_replace("î", "\u00EE", $dataFormatada);
        $dataFormatada = str_replace("ò", "\u00F2", $dataFormatada);
        $dataFormatada = str_replace("ó", "\u00F3", $dataFormatada);
        $dataFormatada = str_replace("ô", "\u00F4", $dataFormatada);
        $dataFormatada = str_replace("õ", "\u00F5", $dataFormatada);
        $dataFormatada = str_replace("ù", "\u00F9", $dataFormatada);
        $dataFormatada = str_replace("ú", "\u00FA", $dataFormatada);
        $dataFormatada = str_replace("û", "\u00FB", $dataFormatada);
        $dataFormatada = str_replace("ñ", "\u00F1", $dataFormatada);

        $dataFormatada = str_replace("Á", "\u00c1", $dataFormatada);
        $dataFormatada = str_replace("Â", "\u00c2", $dataFormatada);
        $dataFormatada = str_replace("Ã", "\u00c3", $dataFormatada);
        $dataFormatada = str_replace("Ç", "\u00c7", $dataFormatada);
        $dataFormatada = str_replace("È", "\u00c8", $dataFormatada);
        $dataFormatada = str_replace("É", "\u00c9", $dataFormatada);
        $dataFormatada = str_replace("Ê", "\u00ca", $dataFormatada);
        $dataFormatada = str_replace("Ì", "\u00cc", $dataFormatada);
        $dataFormatada = str_replace("Í", "\u00cd", $dataFormatada);
        $dataFormatada = str_replace("Î", "\u00ce", $dataFormatada);
        $dataFormatada = str_replace("Ò", "\u00d2", $dataFormatada);
        $dataFormatada = str_replace("Ó", "\u00d3", $dataFormatada);
        $dataFormatada = str_replace("Ô", "\u00d4", $dataFormatada);
        $dataFormatada = str_replace("Õ", "\u00d5", $dataFormatada);
        $dataFormatada = str_replace("Ù", "\u00d9", $dataFormatada);
        $dataFormatada = str_replace("Ú", "\u00da", $dataFormatada);
        $dataFormatada = str_replace("Û", "\u00db", $dataFormatada);
        $dataFormatada = str_replace("à", "\u00e0", $dataFormatada);
        $dataFormatada = str_replace("á", "\u00e1", $dataFormatada);
        $dataFormatada = str_replace("â", "\u00e2", $dataFormatada);
        $dataFormatada = str_replace("ã", "\u00e3", $dataFormatada);
        $dataFormatada = str_replace("ç", "\u00e7", $dataFormatada);
        $dataFormatada = str_replace("è", "\u00e8", $dataFormatada);
        $dataFormatada = str_replace("é", "\u00e9", $dataFormatada);
        $dataFormatada = str_replace("ê", "\u00ea", $dataFormatada);
        $dataFormatada = str_replace("ì", "\u00ec", $dataFormatada);
        $dataFormatada = str_replace("í", "\u00ed", $dataFormatada);
        $dataFormatada = str_replace("î", "\u00ee", $dataFormatada);
        $dataFormatada = str_replace("ò", "\u00f2", $dataFormatada);
        $dataFormatada = str_replace("ó", "\u00f3", $dataFormatada);
        $dataFormatada = str_replace("ô", "\u00f4", $dataFormatada);
        $dataFormatada = str_replace("õ", "\u00f5", $dataFormatada);
        $dataFormatada = str_replace("ù", "\u00f9", $dataFormatada);
        $dataFormatada = str_replace("ú", "\u00fa", $dataFormatada);
        $dataFormatada = str_replace("û", "\u00fb", $dataFormatada);
        $dataFormatada = str_replace("ñ", "\u00f1", $dataFormatada);

        $dataFormatada = str_replace("\"[", "[", $dataFormatada);
        $dataFormatada = str_replace("]\"", "]", $dataFormatada);
        $dataFormatada = str_replace("\\", "", $dataFormatada);

        return $dataFormatada;
    }
}

?>