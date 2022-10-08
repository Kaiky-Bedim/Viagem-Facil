<?php

//Esta classe basicamente vai formatar os retornos de valores que não estiveram em UTF8,
//substituindo caracteres que não são Unicode pelos caracteres Unicode correspondentes corretos
class Formatador{

    //Esta função é a responsável por formatar os dados
    function Formatar($data){
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
}

?>