
var scopeCarregamento;
function carregamento()
{
    scopeCarregamento                           =   this;
    scopeCarregamento.carregarArquivo           =   carregarArquivo;
    scopeCarregamento.setCarregamento           =   setCarregamento;
    scopeCarregamento.carregarOnePageLicao      =   carregarOnePageLicao;
    scopeCarregamento.carregarOnePageModulo     =   carregarOnePageModulo;
    scopeCarregamento.carregarTela              =   carregarTela;
    scopeCarregamento.target;
    scopeCarregamento.targetTipo;
    scopeCarregamento.loader;
    scopeCarregamento.tipo;
    scopeCarregamento.strURLArquivo;
    scopeCarregamento.primeiroCarregamento;

    scopeCarregamento.TIPO_IFRAME                =   "IFRAME";

    var intTotalTelas;
    var intTotalTelasCarregadas;
    var util = new utils();

    function setCarregamento(p_target)
    {
        scopeCarregamento.primeiroCarregamento = true;
        scopeCarregamento.target        =   p_target;
        scopeCarregamento.targetTipo    =   scopeCarregamento.target[0].tagName;
    }
    function carregarArquivo(p_strURL)
    {
        intTotalTelasCarregadas = 0;
        var strURLArquivo = "data/" + p_strURL;
        scopeCarregamento.strURLArquivo = strURLArquivo;
        if( scopeCarregamento.targetTipo == scopeCarregamento.TIPO_IFRAME)
		{
           carregarArquivoFrame();
		}
        else
        {
            carregarArquivoDiv(); 
		}

    }
    function carregarArquivoFrame()
    {
        scopeCarregamento.target.attr('src', scopeCarregamento.strURLArquivo);
        if(scopeCarregamento.primeiroCarregamento) 
        {
            scopeCarregamento.primeiroCarregamento = false;
            scopeCarregamento.target.load(arquivoCarregado);
        }
    }
    function arquivoCarregado()
    {
        $('body').trigger('arquivoCarregado');
    }
    function telaCarregado()
    {
        $('body').trigger('telaCarregado');
    }
    function carregarArquivoDiv()
    {
        scopeCarregamento.target.load(scopeCarregamento.strURLArquivo , arquivoCarregado); 
    } 
    function carregarOnePage()
    {

    }
    function controleAlvo()
    {

    }


    function carregarTela(p_objTela , p_objLicao , p_objModulo)
    {

        intTotalTelasCarregadas = 0;
        var idModulo = p_objModulo.ID;
        var strIDModulo = "blocoModulo"+idModulo;
        var tempArryLicoes = p_objModulo.arrItens;
        var strHTML = montaBloco(p_objModulo);
        scopeCarregamento.target.append(strHTML);
    
        var idLicao = p_objLicao.ID;
        var strIDLicao = "blocoLicao"+idLicao;
        strHTML = montaBloco(p_objLicao);
        $("#"+strIDModulo).append(strHTML);

        intTotalTelasCarregadas = 0;
        var idTela = p_objTela.ID;
        var strTipo = p_objTela.Item;
        var strURLArquivo = "data/"+p_objTela.Arquivo;
        var strTipoUp = util.transformaPrimeiroCaracterMaiusculo(strTipo);
        var strID = 'bloco'+strTipoUp+''+String(idTela);
        var strIDTela = "blocoTela"+String(idTela);
        
        strHTML = montaBloco(p_objTela);
        
        $("#"+strIDLicao).append(strHTML);
        
        intTotalTelas = p_objTela.totalTelas();
        
        $("#"+strID).load(strURLArquivo , controleCarregamentoTelas);
    }

    function carregarOnePageLicao(p_objLicao , p_objModulo)
    {
        intTotalTelasCarregadas = 0;
        //scopeCarregamento.target.load(scopeCarregamento.strURLArquivo , arquivoCarregado);

        var idModulo = p_objModulo.ID;
        var strIDModulo = "blocoModulo"+idModulo;
        var strHTML = montaBloco(p_objModulo);
        scopeCarregamento.target.append(strHTML);

        var idLicao = p_objLicao.ID;
        var strIDLicao = "blocoLicao"+idLicao;
        var tempArrayTelas = p_objLicao.arrItens;
        strHTML = montaBloco(p_objLicao);
        $("#"+strIDModulo).append(strHTML);
        intTotalTelas = p_objLicao.totalTelas();
       // console.log("intTotalTelas: " ,intTotalTelas);
        for(var i = 0; i < tempArrayTelas.length; i++)
        {
            
            var tempObjTela = tempArrayTelas[i];
            var idTela = tempObjTela.ID;
            var strIDTela = "blocoTela"+idTela;
            var strURLArquivo = "data/"+tempObjTela.Arquivo;
            strHTML = montaBloco(tempObjTela);
            $("#"+strIDLicao).append(strHTML);
            $("#"+strIDTela).load(strURLArquivo , controleCarregamentoTelas);
            //scopeCarregamento.target.load(strURLArquivo); 
        }

        
    }

    function montaBloco(p_obj)
    {
        var strHTML = "";
        var strTipo = p_obj.Item;

        var strTipoUp = util.transformaPrimeiroCaracterMaiusculo(strTipo);

        var intID = p_obj.ID;
        var strClassBloco = 'bloco bloco-'+strTipo+' bloco-'+strTipo+'-'+String(intID);
        var strID = 'bloco'+strTipoUp+''+String(intID)
        strHTML += "<div class='"+strClassBloco+"' id='"+strID+"'></div>";

        return strHTML;
    } 



    function controleCarregamentoTelas()
    {
         $(this).hide();
        intTotalTelasCarregadas++;
        if(intTotalTelasCarregadas >= intTotalTelas)
        {
            arquivoCarregado();
        }
    }

    function carregarOnePageModulo(p_objModulo)
    {
        intTotalTelasCarregadas = 0;
        var idModulo = p_objModulo.ID;
        var strIDModulo = "blocoModulo"+idModulo;
        var tempArryLicoes = p_objModulo.arrItens;
        var strHTML = montaBloco(p_objModulo);
        scopeCarregamento.target.append(strHTML);

       for(var i = 0; i <  tempArryLicoes.length; i++)
       {
         
            var tempObjLicao = tempArryLicoes[i];
            var idLicao = tempObjLicao.ID;
            var strIDLicao = "blocoLicao"+idLicao;
            var tempArrayTelas = tempObjLicao.arrItens;
            var strHTML = montaBloco(tempObjLicao);
            $("#"+strIDModulo).append(strHTML);
           

            for(var j = 0; j <  tempArrayTelas.length; j++)
            {
                var tempObjTela = tempArrayTelas[j];
                var idTela = tempObjTela.ID;
                var strIDTela = "blocoTela"+idTela;
                var strURLArquivo = "data/"+tempObjTela.Arquivo;
                strHTML = montaBloco(tempObjTela);
                $("#"+strIDLicao).append(strHTML);
                $("#"+strIDTela).load(strURLArquivo , controleCarregamentoTelas);
                //scopeCarregamento.target.load(strURLArquivo); 
            }
        }

       intTotalTelas = p_objModulo.totalTelas();

    }

}