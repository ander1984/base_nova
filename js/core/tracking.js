var scopeTracking;
function tracking()
{
    scopeTracking = this;

    scopeTracking.isSCORM;
    scopeTracking.isCursoFinalizado;

    scopeTracking.strSuspendData;
    scopeTracking.strLessonLocation;
    scopeTracking.strLessonStatus;

    scopeTracking.objSuspendData;
    scopeTracking.objLessonLocation;

    scopeTracking.intTempoSessao;
    scopeTracking.intAcessoInicio;

    scopeTracking.estrutura;
    scopeTracking.controle;

    scopeTracking.servico;
    scopeTracking.servicoAtual;
    scopeTracking.json;

    scopeTracking.atualizaTrackingEstrutura = atualizaTrackingEstrutura;
    scopeTracking.atualizaLessonLocation = atualizaLessonLocation;

    scopeTracking.setSuspendData = setSuspendData;
    scopeTracking.getSuspendData = getSuspendData;

    scopeTracking.salvarDados = salvarDados;

    scopeTracking.salvarNota = salvarNota;
    scopeTracking.getAllSuspendData = getAllSuspendData;
    scopeTracking.apagarTrackingLocal = apagarTrackingLocal;
    scopeTracking.apagarTrackingCursoExecucao = apagarTrackingCursoExecucao;
    scopeTracking.verificarConclusao = verificarConclusao;
    scopeTracking.encerrarAplicacao = encerrarAplicacao;
    //scopeTracking.iniciaServico = iniciaServico;
    scopeTracking.init = init;


    function init()
    {
        iniciaServico(); 
    }

    function iniciaServico()
    {

        head.load("js/core/servicos/servico.js", 
        function() 
        {
            $('body').on('servicoIniciado',   servicoIniciado );
            this.servico = new servico();

        });
    }

    function servicoIniciado(ev , objData)
    {
        scopeTracking.servicoAtual = objData.servicoAtual;
        scopeTracking.isSCORM = objData.isSCORM;
        isCursoFinalizado = false;
        $(window).on("unload", function() {
            scopeTracking.encerrarAplicacao();
        });
        recuperarDados();
        $('body').trigger('trackingIniciado' );
    
    }
    

    function recuperarDados()
    {
        scopeTracking.strLessonLocation =  scopeTracking.servicoAtual.getLicaoLocalizacao();
        scopeTracking.strLessonLocation =  scopeTracking.strLessonLocation == undefined ||  scopeTracking.strLessonLocation == "undefined" ? "" :  scopeTracking.strLessonLocation.split('**').join('"');
        scopeTracking.strLessonStatus = scopeTracking.servicoAtual.getStatusLicao();
        scopeTracking.strLessonStatus =  scopeTracking.strLessonStatus == undefined ||  scopeTracking.strLessonStatus == "undefined" ? "incomplete" :  scopeTracking.strLessonStatus;
        scopeTracking.strSuspendData = getAllSuspendData();
        scopeTracking.objSuspendData = new Object();
        scopeTracking.objLessonLocation = new Object();
        if(scopeTracking.strSuspendData != "")
        {
            scopeTracking.objSuspendData = JSON.parse(scopeTracking.strSuspendData);
        }
        else
        {
            scopeTracking.objSuspendData = {};
        }

		if ( scopeTracking.strLessonStatus.toLowerCase() == "not attempted" || scopeTracking.strLessonStatus.toLowerCase() == "") {
            scopeTracking.strLessonStatus = "incomplete";
        }

        if(scopeTracking.strLessonLocation != "")
        {
            
            scopeTracking.objLessonLocation = JSON.parse(scopeTracking.strLessonLocation);
        }
        else
        {
           // scopeTracking.objLessonLocation = {};
        }


        //salvarDados();
    }

    function atualizaTrackingEstrutura() {
        var tmpObjTrackingEstrutura = new Object();

        var arrItens =   estrutura.modulos;
        for (var i = 0; i < arrItens.length; i++ ) {
            tmpObjTrackingEstrutura[arrItens[i].ID] = { };
            for (var ii = 0; ii < arrItens[i].arrItens.length; ii++ ) {

                tmpObjTrackingEstrutura[arrItens[i].ID][arrItens[i].arrItens[ii].ID] = { };
                
                var strTempStatusTela = "";
                for (var iii = 0; iii < arrItens[i].arrItens[ii].arrItens.length; iii++ ) {
                     strTempStatusTela += (arrItens[i].arrItens[ii].arrItens[iii].Finalizado()) ? "1" : "0";
                }
                
                tmpObjTrackingEstrutura[arrItens[i].ID][arrItens[i].arrItens[ii].ID] = strTempStatusTela;
            }
        }
       //setSuspendData("TT", tmpObjTrackingEstrutura);
	   scopeTracking.objSuspendData["TT"] = tmpObjTrackingEstrutura;
    }
    
    function getAllSuspendData()
    {
      var tempSTR = (scopeTracking.servicoAtual.getDadosSecundarios());
       var tempStrSuspendData = tempSTR != undefined ? tempSTR.split('**').join('"') : "";
       return tempStrSuspendData;
    }
    
    function setSuspendData(p_name , p_value)
    {

        scopeTracking.objSuspendData[p_name] = p_value;
		salvarDados();
    }
    
    
    function getSuspendData(p_name)
    {
        var strResult = "";
        var objSuspendData = scopeTracking.objSuspendData;
		if (objSuspendData[p_name] != null && objSuspendData[p_name] != "null" && 	objSuspendData[p_name] != "undefined" && objSuspendData[p_name] != undefined)
		{
			strResult = objSuspendData[p_name];
		}
		return strResult;
    }
    
    function atualizaLessonLocation()
    {
        
        scopeTracking.objLessonLocation = {};
        scopeTracking.objLessonLocation["modulo"] = scopeTracking.controle.objLocation.modulo;
        
        scopeTracking.objLessonLocation["licao"] = scopeTracking.controle.objLocation.licao;
		scopeTracking.objLessonLocation["tela"] = scopeTracking.controle.objLocation.tela;
	
        scopeTracking.strLessonLocation = JSON.stringify(scopeTracking.objLessonLocation);
       // console.log("atualizaLessonLocation " ,  scopeTracking.strLessonLocation)

    }

    function salvarDados()
    {
        atualizaLessonLocation();
        atualizaTrackingEstrutura();

        //var date = new Date();
        //scopeTracking.servicoAtual.setTempoSessao(scopeTracking.servicoAtual.converteSegundosParaTempo((date.getTime() - intAcessoInicio)/1000));
       // console.log("strLessonLocation::: " , scopeTracking.strLessonLocation)
		scopeTracking.servicoAtual.setLicaoLocalizacao(scopeTracking.strLessonLocation.split('"').join('**'));
        
       setTimeout(function()
       {
       // console.log("scopeTracking.objSuspendData::: " ,JSON.stringify(scopeTracking.objSuspendData).split('"').join('**'))
            scopeTracking.servicoAtual.setDadosSecundarios(JSON.stringify(scopeTracking.objSuspendData).split('"').join('**'));
       } , 200 );
       setTimeout(function()
       {
       // console.log("scopeTracking.strLessonStatus::: " ,scopeTracking.strLessonStatus)
        scopeTracking.servicoAtual.setStatusLicao(scopeTracking.strLessonStatus);
       } , 400);


    }
    
    function verificarConclusao()
	{
		var isTelasFinalizadas = true;
		var intTotalModulos = scopeControle.estrutura.modulos.length;
		for(var i = 0 ; i < intTotalModulos; i++)
		{
			var intTotalLicoes = scopeControle.estrutura.modulos[i].arrItens.length;
			for(var j = 0 ; j < intTotalLicoes; j++)
			{
				var intTotalTelas = scopeControle.estrutura.modulos[i].arrItens[j].arrItens.length;
				for(var k = 0 ; k < intTotalTelas; k++)
				{
					var tempObjItemTela = scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k];
                    
                    if(!tempObjItemTela.Finalizado()) 
					{
						isTelasFinalizadas = false;
					}
				}
			}
        }
        //.log( "isTelasFinalizadas::: " , isTelasFinalizadas)
		if(isTelasFinalizadas)
		{
            isCursoFinalizado = true;
            scopeTracking.strLessonStatus = "completed";
            salvarDados();
        }
        return isCursoFinalizado;
	}
    
    function salvarNota(p_intNota)
    {
        scopeTracking.servicoAtual.setNota(p_intNota);
        salvarDados();
    }
    
    
    function apagarTrackingLocal()
    {
        scopeTracking.objLessonLocation = {};
        scopeTracking.strLessonLocation = "";
        scopeTracking.strSuspendData = "";
        scopeTracking.servicoAtual.zerarTracking();
    }
    
    function apagarTrackingCursoExecucao()
    {
        
    }


    function encerrarAplicacao()
    {
        scopeTracking.servicoAtual.EncerraServico();

    }


}




