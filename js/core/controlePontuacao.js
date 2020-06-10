var scopePontuacao;
function controlePontuacao()
{
	scopePontuacao = this;
	scopePontuacao.getPontos = getPontos;
	scopePontuacao.setPontos = setPontos;
	scopePontuacao.salvarNota = salvarNota;
	scopePontuacao.getAproveitamentoCurso = getAproveitamentoCurso;
	
	var isSalvarNotaLMS = false;
	var intAproveitamentoCurso = 0;
	var intAproveitamento = 0;
	var intTotalPontos = 0;
	var isTotalPontos = false;
	var pontosCurso = 0;
	var pontos = 0;
	var objConfig;
	var objPontos;
	
	function init(p_objConfig)
	{
		objConfig = p_objConfig ? p_objConfig : new Object();
			
		objPontos = new Object();	
		
		if(objConfig.intTotalPontos != undefined)
		{
			isTotalPontos =  true;
			intTotalPontos = objConfig.intTotalPontos;
		}
		
		isSalvarNotaLMS = (objConfig.salvarNotaLMS == true);
		
		var tempPontosCurso = getSuspendData("pontosCurso");
		
		if(tempPontosCurso != undefined && tempPontosCurso != "" && tempPontosCurso != null && tempPontosCurso != "undefined")
		{
			
			var strObjPontos = tempPontosCurso.split("**").join('"');
			
			objPontos = JSON.parse(strObjPontos);
		
		}
		
		pontosCurso = getPontos().pontos;
		intAproveitamentoCurso = calculoAproveitamento(intTotalPontos);
		intAproveitamentoCurso = isNaN(intAproveitamentoCurso) ? 0 : intAproveitamentoCurso;

	}
	
	function getPontos(p_modulo , p_licao , p_tela , p_id)
	{
		
		var objGeralPontos = new Object();
		
		var intPontos = 0;
		var intTotalMaxPontos = 0;
		var intTotalPontosCalculo = 0;
		
		var intMod 	=	p_modulo;
		var intLic	=	p_licao;
		var intTela = 	p_tela;
		var intId 	=	p_id;

		var strMod = "m"+intMod;
		var strLic = "t"+intLic;
		var strTela = "t"+intTela;
		var strId = "t"+intId;		
		
		if(intMod != undefined && intLic != undefined && intTela != undefined && intId != undefined)
		{
			objGeralPontos.tipo = "pontosID";
			intPontos = objPontos[strMod][strLic][strTela][strId].pontos;
			intTotalPontosCalculo++;
			
		}
		else if(intMod != undefined && intLic != undefined && intTela != undefined)
		{
			objGeralPontos.tipo = "pontosTela";
			for(var objID in objPontos[strMod][strLic][strTela])
			{
				intPontos += objPontos[strMod][strLic][strTela][objID].pontos;
				intTotalMaxPontos += objPontos[strMod][strLic][strTela][objID].max;
				intTotalPontosCalculo++;
			}
		}
		else if(intMod != undefined && intLic != undefined)
		{
			objGeralPontos.tipo = "pontosLicao";
			for(var objTela in objPontos[strMod][strLic])
			{
				for(var objID in objPontos[strMod][strLic][strTela])
				{
					intPontos		  += objPontos[strMod][strLic][objTela][objID].pontos;
					intTotalMaxPontos += objPontos[strMod][strLic][objTela][objID].max;
					intTotalPontosCalculo++;
				}
			}
		}
		else if(intMod != undefined)
		{
			objGeralPontos.tipo = "pontosModulo";
			for(var objLicao in objPontos[strMod])
			{
				for(var objTela in objPontos[strMod][objLicao])
				{
					for(var objID in objPontos[strMod][objLicao][strTela])
					{
						
						intPontos		  += objPontos[strMod][objLicao][objTela][objID].pontos;
						intTotalMaxPontos += objPontos[strMod][objLicao][objTela][objID].max;
						intTotalPontosCalculo++;
					}
				}
			}
		}
		else
		{	
			objGeralPontos.tipo = "pontosCurso";
			for(var objMod in objPontos)
			{
				for(var objLicao in objPontos[objMod])
				{
					for(var objTela in objPontos[objMod][objLicao])
					{
						for(var objID in objPontos[objMod][objLicao][objTela])
						{
							
							intPontos		  += objPontos[objMod][objLicao][objTela][objID].pontos;
							intTotalMaxPontos += objPontos[objMod][objLicao][objTela][objID].max;
							intTotalPontosCalculo++;
						}
					}
				}
			}
		}
	
		if(!isTotalPontos)
		{
			intTotalPontos = intTotalMaxPontos;
		}

		objGeralPontos.pontos = intPontos;
		objGeralPontos.maxPontos = intTotalMaxPontos;
		objGeralPontos.aproveitamento = calculoAproveitamento(intTotalPontosCalculo);
		objGeralPontos.aproveitamentoCurso
		intAproveitamentoCurso = calculoAproveitamento(intTotalPontos);
	
		return objGeralPontos;
	}
	
	function setPontos(p_pontos , p_max , p_id)
	{
		var pontuacao = p_pontos;
		var maxPontos = p_max;
		
		pontosCurso += pontuacao;
		
		var intModuloAtual = Number(SCO.substr(1 , 2)); 
		var intLicaoAtual = Number(SCO.substr(4 , 2)); 
		var intTelaAtual = cursoPosicao; 

		
		var intId = isNaN(p_id) ? 1 : Number(p_id) ; 
		
		if(!objPontos["m"+intModuloAtual])
		{
			objPontos["m"+intModuloAtual] = new Object();
		}					
		
		if(!objPontos["m"+intModuloAtual]["l"+intLicaoAtual])
		{
				objPontos["m"+intModuloAtual]["l"+intLicaoAtual] = new Object();
		}

		if(!objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual])
		{
			objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual] = new Object();
		}		
		
		if(!objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId])
		{
			objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId] = new Object();
			objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId].pontos = 0;
			objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId].max = 0;
		}
				
		objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId].pontos = pontuacao;
		objPontos["m"+intModuloAtual]["l"+intLicaoAtual]["t"+intTelaAtual]["id"+intId].max = maxPontos;
		
		if(!isTotalPontos)
		{
			intTotalPontos += isNaN(maxPontos) ? 1 : maxPontos;
		}
		
		intAproveitamento = calculoAproveitamento(intTotalPontos);
		intAproveitamentoCurso = calculoAproveitamento(intTotalPontos);

		var strTempObjPontos = JSON.stringify(objPontos);
		
		
		
		var strObjPontos = strTempObjPontos.split('"').join("**");
	
		setSuspendData("pontosCurso" , strObjPontos);
	}
	
	function getAproveitamentoCurso()
	{
		return intAproveitamentoCurso;
	}
	
	function getAproveitamento()
	{
		return intAproveitamento;
	}
	
	function calculoAproveitamento(p_intTotalPontosCalculo)
	{
		var intCalculo = Math.round(((pontosCurso*100)/p_intTotalPontosCalculo));
		return intCalculo;
	}
	
	function salvarNota()
	{
		setSuspendData("nota" , intAproveitamentoCurso);
		if(SCORM && isSalvarNotaLMS)
		{
			SetScore(intAproveitamentoCurso);
		}
	}
	
	init();
	
}