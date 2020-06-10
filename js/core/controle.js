var scopeControle ;
function controle()
{
	scopeControle = this;
	scopeControle.primeiroCarregamento 		= 	true;
	scopeControle.initControle 				= 	initControle;
	scopeControle.iniciarCurso 				= 	iniciarCurso;
	scopeControle.getObjItemTelaAtual 		= 	getObjItemTelaAtual;
	scopeControle.verificarConclusao 		= 	verificarConclusao;
	scopeControle.encerrarAplicacao 		= 	encerrarAplicacao;
	scopeControle.getPorcentagemExecucao 	=	getPorcentagemExecucao;
	scopeControle.inicia 					= 	inicia;
	
	scopeControle.iniciarTela 			= 	iniciarTela;
	scopeControle.finalizarTela 			= 	finalizarTela;
	scopeControle.finalizar 				= 	finalizar;
	scopeControle.Avancar 					= 	Avancar;
	scopeControle.Voltar 					= 	Voltar;
	scopeControle.irPara 					= 	irPara;

	scopeControle.intModuloAtual;
	scopeControle.intLicaoAtual;
	scopeControle.intTelaAtual;

	scopeControle.intContadorAtual;
	scopeControle.intContadorTotal;

	scopeControle.intTotalTelasCursos;
	scopeControle.intTotalModulosCursos;
	scopeControle.intTotallioesCurso;

	scopeControle.indexModuloAtual;
	scopeControle.indexLicaoAtual;
	scopeControle.indexTelaAtual;

	scopeControle.tracking;
	scopeControle.carregamento;
	scopeControle.configuracoes;
	scopeControle.estrutura;
	scopeControle.interface;
	
	scopeControle.objControles;
	scopeControle.objInfo;

	scopeControle.objTitulosVisivel;
	scopeControle.objControlesDisponiveis;
	scopeControle.objControlesBloquear;
	
	scopeControle.scoInicial;
	scopeControle.scoTracking;

	scopeControle.objLocation;
	scopeControle.objItemAtual;
	scopeControle.objItemModuloAtual;
	scopeControle.objItemLicaoAtual;

	scopeControle.TelaAtual;
	
	scopeControle.isTracking;
	scopeControle.isRecuperarPosicao;
	scopeControle.isConfirmaRetorno;
	scopeControle.isConfirmaSaida;
	scopeControle.isCursoFinalizado;

	scopeControle.estadoFinal;
	scopeControle.tempoTimeout;
	scopeControle.strModoAtual;
	scopeControle.strModoConclusao;
	scopeControle.strModoCurso 			=  "CURSO"; 
	scopeControle.strModoModulo 		=  "MODULO";
	scopeControle.strModoLicao 			=  "LICAO"; 
	scopeControle.SessaoAtual;
	scopeControle.SessaoTela 			=  	"tela";
	scopeControle.SessaoMenu 			= 	"menu";
	scopeControle.SessaoAjuda 			= 	"ajuda";
	scopeControle.SCO_ATUAL;
	scopeControle.querySCO;

	scopeControle.boxMensagemRetorno;
	scopeControle.boxMensagemSaida;
	scopeControle.currentBoxMensagem;
	scopeControle.btnAvancar;
	scopeControle.btnVoltar;

	scopeControle.strTipoAtual;
	scopeControle.ITEM_MODULO		 	= 	"modulo";
	scopeControle.ITEM_LICAO 			= 	"licao";
	scopeControle.ITEM_TELA 			= 	"tela";
	scopeControle.MODULO_ONE_PAGE 		= 	"modulo_onepage";
	scopeControle.LICAO_ONE_PAGE 		= 	"licao_onepage";
	scopeControle.TELA_ONE_PAGE 		= 	"tela_onepage";
	scopeControle.ONE_PAGE 				= 	"onepage";
	scopeControle.NET_CURSO 			= 	"curso";
	scopeControle.AVALIACAO 			= 	"avaliacao";

	scopeControle.isOnePage 			= 	false;
	scopeControle.util;
	var util;

	function initControle()
	{

		scopeControle.intContadorAtual = 0;
		scopeControle.intContadorTotal = 0;

		$('body').on('estruturaCarregada',   estruturaCarregada );
		$('body').on('configuracoesCarregadas',   configuracoesCarregadas );
		$('body').on('trackingIniciado',   trackingIniciado );
		carregarEstrutura();
	}


	function inicia()
	{
		var strArquivosJS = ["js/vendors/featherlight/featherlight.min.js", 
							"js/vendors/wow-js/wow.min.js",
							"js/core/controleScroll.js" , 
							"js/core/utils.js", 
							"js/core/tracking.js",  
							"js/core/telaAtual.js",
							"js/core/carregamento.js"];
							
		head.load(strArquivosJS , function() 
		{
			
			util 								=   new utils();
			scopeControle.carregamento 			= 	new carregamento();
			scopeControle.tracking 				= 	new tracking();
			scopeControle.scroll 				= 	new controleScroll();
			scopeControle.tracking.controle 	= 	scopeControle;
			scopeControle.querySCO 				= 	util.getParameterByName("SCO");
			
			scopeControle.util 					=   util;
			
			$('body').on('arquivoCarregado',   telaCarregada );
			//$('body').trigger('arquivoCarregado');

			scopeControle.tracking.init();
		});
	}


	function configuracoesCarregadas(ev, objData)
	{
		scopeControle.configuracoes 			= 	objData.configuracoes;
		scopeControle.scoInicial 				= 	scopeControle.configuracoes.iniciar.scoInicial;
		scopeControle.isRecuperarPosicao 		= 	scopeControle.configuracoes.iniciar.recuperarPosicao;
		scopeControle.isConfirmaRetorno 		= 	scopeControle.configuracoes.iniciar.confirmaRetorno;
		scopeControle.isConfirmaSaida 			= 	scopeControle.configuracoes.iniciar.confirmaSaida;
		scopeControle.estadoFinal 				= 	scopeControle.configuracoes.iniciarestadoFinal;
		scopeControle.tempoTimeout 				= 	scopeControle.configuracoes.iniciar.tempoTimeout;

		scopeControle.interface 				= 	scopeControle.configuracoes.interface;
		scopeControle.objInfo 					= 	scopeControle.interface.info;
		
		scopeControle.objControles 				= 	scopeControle.interface.controles;

		scopeControle.objTitulosVisivel 		= 	scopeControle.objInfo.titulosVisivel;
		var arr = new Array();

		scopeControle.objControlesDisponiveis 	= 	scopeControle.objControles.controlesDisponiveis;
		scopeControle.objControlesBloquear 		= 	scopeControle.objControles.bloquearControle;


		var tempSCO = scopeControle.scoInicial;

		if(scopeControle.querySCO != "" && scopeControle.querySCO != undefined && scopeControle.querySCO != "undefined" && scopeControle.querySCO != null)
		{
			tempSCO = scopeControle.querySCO;
		}

		if(tempSCO == "" || tempSCO == undefined || tempSCO == "undefined" || tempSCO == null)
		{
			scopeControle.intModuloAtual 	= 	1;
			scopeControle.intLicaoAtual 	=	1;
			scopeControle.intTelaAtual 		=	1;
			scopeControle.strModoConclusao 	= 	scopeControle.strModoCurso;
	
		}
		else
		{
			var tempModulo 	= 	tempSCO.substr(1,2);
			var tempLicao 	= 	tempSCO.substr(4,2);

			if(tempModulo != undefined && tempModulo != "undefined" && tempModulo != "")
			{
				scopeControle.intModuloAtual 	= 	Number(tempModulo);
				scopeControle.strModoConclusao 	= 	scopeControle.strModoModulo;
			}
			else
			{
				scopeControle.intModuloAtual = 1;
			}

			if(tempLicao != undefined && tempLicao != "undefined" && tempLicao != "")
			{
				scopeControle.intLicaoAtual 	=  	Number(tempLicao);
				scopeControle.strModoConclusao 	= 	scopeControle.strModoLicao;
			}
			else
			{
				scopeControle.intLicaoAtual = 1;
			}
			scopeControle.intTelaAtual = 1;


		}
		montaObjetoEstrutura(scopeControle);
	}

	function estruturaCarregada(ev, objData)
	{
		scopeControle.estrutura = objData.estrutura;
		controle.inicia();

	}



	function trackingIniciado(ev)
	{

		scopeControle.objLocation 	= 	scopeControle.tracking.objLessonLocation;
		scopeControle.isTracking 	= 	( scopeControle.objLocation.modulo != null && scopeControle.objLocation.modulo != undefined  && scopeControle.objLocation.modulo != "undefined")
		////console.log(isTracking +" ::: ",scopeControle.objLocation)	
		/*if(scopeControle.isTracking)
		{
			setSCOTracking();
			setTelasFinalizadas();
		}
		else
		{

			setSCOInicial();
			
		}*/
		scopeControle.iniciarCurso();
	}

	function setSCOTracking()
	{
		scopeControle.scoTracking = "M"+util.Format(scopeControle.objLocation.modulo)+"L"+util.Format(scopeControle.objLocation.licao);

		if(scopeControle.isRecuperarPosicao)
		{
			scopeControle.SCO_ATUAL 		= 	scopeControle.scoTracking;
			scopeControle.intModuloAtual 	= 	scopeControle.objLocation.modulo;
			scopeControle.intLicaoAtual 	= 	scopeControle.objLocation.licao;
			scopeControle.intTelaAtual 		= 	scopeControle.objLocation.tela;
			//console.log("scopeControle.SCO_ATUAL: " , scopeControle.SCO_ATUAL)
			//console.log("scopeControle.intModuloAtual: " , scopeControle.intTelaAtual)
			//console.log("scopeControle.intLicaoAtual: " , scopeControle.intLicaoAtual)
			//console.log("scopeControle.intTelaAtual: " , scopeControle.intTelaAtual)

		}
		setTelasFinalizadas();
	}

	function setSCOInicial()
	{
		scopeControle.objLocation = {}
		scopeControle.intContadorAtual = 1;
		scopeControle.SCO_ATUAL = scopeControle.scoInicial;
	}

function setTelasFinalizadas()
{
	var objTrackingTelas = scopeControle.tracking.getSuspendData("TT");
	//console.log("objTrackingTelas::: " , objTrackingTelas)
	////console.log(scopeControle.estrutura)
	for(var i = 0; i < scopeControle.estrutura.modulos.length; i++)
	{
		var intIDModulo = scopeControle.estrutura.modulos[i].ID;
		for(var j = 0; j < scopeControle.estrutura.modulos[i].arrItens.length; j++)
		{
			var intIDLicao = scopeControle.estrutura.modulos[i].arrItens[j].ID;
			for(var k = 0; k < scopeControle.estrutura.modulos[i].arrItens[j].arrItens.length; k++)
			{
				var intIDTela = Number(scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k].ID);
				var isTelaFinalizada = false;
				if(objTrackingTelas != "" && objTrackingTelas != "undefined" && objTrackingTelas != undefined && objTrackingTelas != null)
				{
					isTelaFinalizada = (objTrackingTelas[intIDModulo][intIDLicao].substr(k , 1) == 1);
				}
			
				scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k].Finalizado(isTelaFinalizada)
				if(scopeControle.isRecuperarPosicao && scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k].Finalizado()) scopeControle.intContadorAtual++;
			}
		}
		
	}
}

	function atualizarIndexAtual()
	{
		scopeControle.indexModuloAtual  	= 	(scopeControle.intModuloAtual - 1);
		scopeControle.indexLicaoAtual 		=  	(scopeControle.intLicaoAtual - 1);
		scopeControle.indexTelaAtual 		=  	(scopeControle.intTelaAtual - 1);

		scopeControle.intContadorTotal 		= 	getTotalItensEstrutura();
		scopeControle.objItemAtual 			= 	getObjItemTelaAtual();
		scopeControle.objItemModuloAtual    =	getObjItemModuloAtual();
		scopeControle.objItemLicaoAtual     = 	getObjItemLicaoAtual();
	}

	function setCarregamento()
	{

		scopeControle.isOnePage  = false;
		if(scopeControle.objItemModuloAtual.Tipo == scopeControle.ONE_PAGE)
		{
			scopeControle.strTipoAtual = scopeControle.MODULO_ONE_PAGE;
			scopeControle.isOnePage = true;
		}
		else if(scopeControle.objItemLicaoAtual.Tipo == scopeControle.ONE_PAGE)
		{
			scopeControle.strTipoAtual = scopeControle.LICAO_ONE_PAGE;
			scopeControle.isOnePage = true;
		}
		else
		{
			scopeControle.strTipoAtual = scopeControle.NET_CURSO;
		}

		contoleCarregamento();
	
	}

	function contoleCarregamento()
	{

		if(scopeControle.strTipoAtual == scopeControle.MODULO_ONE_PAGE)
		{
			scopeControle.objItemModuloAtual
			scopeControle.carregamento.carregarOnePageModulo(scopeControle.objItemModuloAtual);
		}
		else if(scopeControle.strTipoAtual == scopeControle.LICAO_ONE_PAGE )
		{

			scopeControle.objItemLicaoAtual
			scopeControle.carregamento.carregarOnePageLicao(scopeControle.objItemLicaoAtual , scopeControle.objItemModuloAtual);
		}
		else
		{
			scopeControle.carregamento.carregarTela(scopeControle.objItemAtual , scopeControle.objItemLicaoAtual , scopeControle.objItemModuloAtual);
			//scopeControle.carregamento.carregarArquivo(scopeControle.objItemAtual.Arquivo);
			//carregarTela(scopeControle.objItemAtual.Arquivo)
		}



		
	} 

/*	function carregarTela(p_arquivo)
	{
		var strURLArquivo = "data/" + p_arquivo;
		$(".loader").fadeIn(200);

		if($('#areaConteudo')[0].tagName == "IFRAME")
		{
			$('#areaConteudo').attr('src', strURLArquivo);
			if(scopeControle.primeiroCarregamento) 
			{
				scopeControle.primeiroCarregamento = false;
				$("#areaConteudo").load(telaCarregada);
			}
		}
		else{

			$("#areaConteudo").load(strURLArquivo , telaCarregada); 
		}
	
	}*/
	function setControlesExecusao()
	{

		scopeControle.carregamento.setCarregamento($('#areaConteudo'));

		scopeControle.btnAvancar 	= 	$("#btnAvancar");
		scopeControle.btnVoltar 	= 	$("#btnVoltar");
		scopeControle.btnMenu 		= 	$("#btnMenu");
		scopeControle.btnFechar 	= 	$("#btnFechar");
		scopeControle.btnAjuda 		= 	$("#btnAjuda");

		scopeControle.contadorTelas = 	$("#contadorTelas");

		scopeControle.totalTelas 	= 	$("#totalTelas");
		scopeControle.telaAtual 	= 	$("#telaAtual");

		scopeControle.nomeCurso 	= 	$("#nomeCurso");
		scopeControle.nomeModulo 	= 	$("#nomeModulo");
		scopeControle.nomeLicao 	= 	$("#nomeLicao");
		scopeControle.nomeTela 		= 	$("#nomeTela");

		scopeControle.boxMensagemRetorno = new Object();
		scopeControle.boxMensagemRetorno.seletor = "#boxConfirmarRetorno";
		scopeControle.boxMensagemRetorno.configuracao = {
												//variant: "fl-box-confirmar-retorno",
												closeOnClick:  false,
												closeOnEsc: false	,
												closeIcon: ""
											}

		scopeControle.boxMensagemSaida = new Object();
		scopeControle.boxMensagemSaida.seletor = "#boxConfirmarSaida";
		scopeControle.boxMensagemSaida.configuracao = {
												variant: "fl-box-confirmar-saida",
												closeOnClick:  false,
												closeOnEsc: false	,
												closeIcon: ""
											}

		var btnRetornoSim 	= 	$("#btnRetornoSim");
		var btnRetornoNao 	= 	$("#btnRetornoNao");
		var btnSaidaSim 	= 	$("#btnSaidaSim");
		var btnSaidaNao 	= 	$("#btnSaidaNao");

		btnRetornoSim.off('click').on('click' , confirmarRetornoClickHandler)
		btnRetornoNao.off('click').on('click' , cancelarRetornoClickHandler)
		btnSaidaSim.off('click').on('click' , confirmarSaidaClickHandler)
		btnSaidaNao.off('click').on('click' , cancelarSaidaClickHandler)

		scopeControle.btnAvancar.off('click').on('click' , avancarClickHandler)
		scopeControle.btnVoltar.off('click').on('click' , voltarClickHandler)
		scopeControle.btnMenu.off('click').on('click' , menuClickHandler)
		scopeControle.btnFechar.off('click').on('click' , fecharClickHandler)
		scopeControle.btnAjuda.off('click').on('click' , ajudaClickHandler)
	}

	function openBoxMensagem(p_obj)
	{
		$.featherlight(p_obj.seletor, p_obj.configuracao);
		scopeControle.currentBoxMensagem = $.featherlight.current();
	}

	function iniciarCurso()
	{
		$('body').trigger('controleIniciado');

		setControlesExecusao();
		
		scopeControle.tracking.estrutura = scopeControle.estrutura;



		if(scopeControle.isTracking )
		{
			if(scopeControle.isConfirmaRetorno)
			{
				openBoxMensagem(scopeControle.boxMensagemRetorno)
			}
			else
			{
				setSCOTracking();
				setDadosTelaExecucao();
			}
		}
		else
		{
			setSCOInicial();
			setDadosTelaExecucao();
		}

		$('body').trigger('cursoIniciado');
		
	}

	function confirmaRetorno()
	{
		setSCOTracking();
		scopeControle.currentBoxMensagem.close();
		setDadosTelaExecucao();
	}


	function cancelaRetorno()
	{
		setSCOInicial();
		scopeControle.currentBoxMensagem.close();
		setDadosTelaExecucao();
	}

	function confirmaSaida()
	{
		encerrarAplicacao();
	}


	function cancelaSaida()
	{
		scopeControle.currentBoxMensagem.close();
	}
	function fecharCurso()
	{
		if(scopeControle.isConfirmaSaida)
		{
			openBoxMensagem(scopeControle.boxMensagemSaida)
		}
		else
		{
			tracking.encerrarAplicacao();
		}
	}

	function encerrarAplicacao()
	{
		scopeControle.tracking.encerrarAplicacao();
	}

	function getTitulos(p_modulo , p_licao , p_tela)
	{
		var tempIntIndexModulo 	= 	p_modulo ? (p_modulo-1) : scopeControle.indexModuloAtual;
		var tempIntIndexLicao 	= 	p_licao ? (p_licao-1) : scopeControle.indexLicaoAtual;
		var tempIntIndexTela 	= 	p_tela ? (p_tela-1) : scopeControle.indexTelaAtual;

		var objTitulos 			= 	new Object();
		objTitulos.curso 		= 	scopeControle.estrutura.nomeCurso;
		objTitulos.modulo 		= 	scopeControle.estrutura.modulos[tempIntIndexModulo].Nome;
		objTitulos.licao 		= 	scopeControle.estrutura.modulos[tempIntIndexModulo].arrItens[tempIntIndexLicao].Nome;
		objTitulos.tela 		= 	scopeControle.estrutura.modulos[tempIntIndexModulo].arrItens[tempIntIndexLicao].arrItens[tempIntIndexTela].Nome;
		return objTitulos;
	}

	function atualizaContador()
	{
		scopeControle.telaAtual.text(scopeControle.strTelaAtual+"| ");
		scopeControle.totalTelas.text(scopeControle.strTotalTelas);
	}


	function confirmarRetornoClickHandler()
	{
		confirmaRetorno();
	}
	function cancelarRetornoClickHandler()
	{
		cancelaRetorno();
	}
	function confirmarSaidaClickHandler()
	{
		confirmaSaida();
	}
	function cancelarSaidaClickHandler()
	{
		cancelaSaida();
	}

	function avancarClickHandler()
	{
		Avancar();
	}

	function voltarClickHandler()
	{
		Voltar();
	}

	function menuClickHandler()
	{
		carregaMenu();
	}

	function fecharClickHandler()
	{
		fecharCurso();
	}

	function ajudaClickHandler()
	{
		
	}

	function setDadosTelaExecucao()
	{
		atualizarIndexAtual();
		setCarregamento();
		
	}

	function controleLessonLocation()
	{
		
		/*//console.log(scopeControle.intModuloAtual ," > ",scopeControle.objLocation.modulo)
		//console.log(scopeControle.intLicaoAtual ," > ",scopeControle.objLocation.licao)
		//console.log(scopeControle.intTelaAtual ," > ",scopeControle.objLocation.tela)*/

		if(scopeControle.objLocation.modulo == undefined)
		{
			scopeControle.objLocation.modulo = scopeControle.intModuloAtual;

			scopeControle.objLocation.licao 	= 	scopeControle.intLicaoAtual;
			scopeControle.objLocation.tela 		= 	scopeControle.intTelaAtual;
		}
		else if(scopeControle.intTelaAtual > scopeControle.objLocation.tela)
		{
			if(scopeControle.intModuloAtual ==  scopeControle.objLocation.modulo && scopeControle.intLicaoAtual ==  scopeControle.objLocation.licao)
			{
				scopeControle.objLocation.tela = scopeControle.intTelaAtual;
			}
		}
		else if(scopeControle.intLicaoAtual > scopeControle.objLocation.licao)
		{
			if(scopeControle.intModuloAtual == scopeControle.objLocation.modulo)
			{
				scopeControle.objLocation.licao = scopeControle.intLicaoAtual;
				scopeControle.objLocation.tela = scopeControle.intTelaAtual;
			}
		}
		else if(scopeControle.intModuloAtual >  scopeControle.objLocation.modulo)
		{
			scopeControle.objLocation.modulo = scopeControle.intModuloAtual;
			scopeControle.objLocation.licao = scopeControle.intLicaoAtual;
			scopeControle.objLocation.tela = scopeControle.intTelaAtual;

		}

		scopeControle.tracking.atualizaLessonLocation();
		////console.log(scopeControle.objLocation)
	}



	function getObjItemTelaAtual()
	{
		var tempObjItemTela = estrutura.modulos[scopeControle.indexModuloAtual].arrItens[scopeControle.indexLicaoAtual].arrItens[scopeControle.indexTelaAtual];
		return tempObjItemTela;
	}
	
	function getObjItemModuloAtual()
	{
		var tempObjItemModulo = estrutura.modulos[scopeControle.indexModuloAtual];
		return tempObjItemModulo;
	}	
	
	function getObjItemLicaoAtual()
	{
		var tempObjItemLicao = estrutura.modulos[scopeControle.indexModuloAtual].arrItens[scopeControle.indexLicaoAtual];
		return tempObjItemLicao;
	}
	function getTotalItensEstrutura(p_intModulo , p_intLicao , p_intTela)
	{
		var intTotal = 0;

		if(p_intModulo != undefined)
		{
			var tempIndexModulo = (p_intModulo -1);
			if(p_intLicao != undefined)
			{
				var tempIndexLicao = (p_intLicao -1);
				if(p_intTela != undefined)
				{
					var tempIndexTela = (p_intTela -1);
					intTotal = (estrutura.modulos[tempIndexModulo].arrItens[tempIndexLicao].arrItens.length);
				}
				else
				{
					intTotal = (estrutura.modulos[tempIndexModulo].arrItens.length);
				}
			}
			else
			{
				intTotal = (estrutura.modulos.length);
			}
	
		}
		else
		{
			intTotal = estrutura.totalItens;
		}

		return intTotal;
	}


	function telaCarregada()
	{
		scopeControle.SessaoAtual = scopeControle.SessaoTela;
		scopeControle.TelaAtual = new telaAtual(scopeControle , scopeControle.objItemAtual);
		scopeControle.TelaAtual.PrimeiraTela = (scopeControle.intTelaAtual == 1);
		scopeControle.TelaAtual.UltimaTela = (scopeControle.intTelaAtual == getTotalItensEstrutura(scopeControle.intModuloAtual , scopeControle.intLicaoAtual , scopeControle.intTelaAtual));

		scopeControle.TelaAtual.PrimeiraLicao = (scopeControle.intLicaoAtual == 1);
		scopeControle.TelaAtual.UltimaLicao = (scopeControle.intLicaoAtual == getTotalItensEstrutura(scopeControle.intModuloAtual , scopeControle.intLicaoAtual));
	
		scopeControle.TelaAtual.PrimeiroModulo = (scopeControle.intModuloAtual == 1);
		scopeControle.TelaAtual.UltimoModulo = (scopeControle.intModuloAtual == getTotalItensEstrutura(scopeControle.intModuloAtual));
		

		scopeControle.strTelaAtual = util.Format(scopeControle.intContadorAtual);
		scopeControle.strTotalTelas = String(scopeControle.intContadorTotal);
		atualizaTracking();
		atualizaControles();
		atualizaInformacoesInterface();

		if(scopeControle.isOnePage)
		{
			if(!scopeControle.controleOnePage)
			{
				head.load("js/controleOnePage.js", function() 
				{
					scopeControle.controleOnePage = new controleOnePage();
					scopeControle.controleOnePage.init();
					//contoleCarregamento();
				});
			}
			else
			{
				scopeControle.controleOnePage.init();
			}

		}
		else
		{
			//contoleCarregamento();


			
			//console.log(scopeControle.TelaAtual.Item.ID ,"  scopeControle.intTelaAtual:: " , scopeControle.intTelaAtual)


		}





		$('body').trigger('telaCarregada');
	}

	function atualizaInformacoesInterface()
	{
		scopeControle.nomeCurso.hide();
		scopeControle.nomeModulo.hide();
		scopeControle.nomeLicao.hide();
		scopeControle.nomeTela.hide();
		scopeControle.contadorTelas.hide();
		var arrTitulosTelas =  scopeControle.objTitulosVisivel.tela != "" ? scopeControle.objTitulosVisivel.tela.split(",") : [];
		for(var i = 0; i < arrTitulosTelas.length; i++)
		{
			switch(arrTitulosTelas[i])
			{
				case "curso":
					scopeControle.nomeCurso.show();
				break;
				case "modulo":
					scopeControle.nomeModulo.show();
				break;
				case "licao":
					scopeControle.nomeLicao.show();
				break;
				case "tela":
					scopeControle.nomeTela.show();
				break;
				case "contador":
					scopeControle.contadorTelas.show();
				break;
			}
		}
		
		
		if(scopeControle.tracking.isSCORM)
		{
			var arrControlesDisponiveis = scopeControle.objControles.controlesDisponiveis.online != "" ? scopeControle.objControles.controlesDisponiveis.online.split(",") : [];
		}
		else
		{
			var arrControlesDisponiveis = scopeControle.objControles.controlesDisponiveis.offline != "" ? scopeControle.objControles.controlesDisponiveis.offline.split(",") : [];
		}

		scopeControle.btnAvancar.hide();
		scopeControle.btnVoltar.hide();
		scopeControle.btnMenu.hide();
		scopeControle.btnFechar.hide();
		scopeControle.btnAjuda.hide();

		for(var i = 0; i < arrControlesDisponiveis.length; i++)
		{
			switch(arrControlesDisponiveis[i])
			{
				case "avancar":
					scopeControle.btnAvancar.show();
				break;
				case "voltar":
					scopeControle.btnVoltar.show();
				break;
				case "ajuda":
					scopeControle.btnAjuda.show();
				break;
				case "menu":
					scopeControle.btnMenu.show();
				break;
				case "sair":
					scopeControle.btnFechar.show();
				break;
			}
		}

		scopeControle.nomeCurso.html(getTitulos().curso);
		scopeControle.nomeModulo.html(getTitulos().modulo);
		scopeControle.nomeLicao.html(getTitulos().licao);
		scopeControle.nomeTela.html(getTitulos().tela);
		atualizaContador();
	}

	function atualizaTracking()
	{
		scopeControle.tracking.atualizaTrackingEstrutura();
		
		
	}

	function desabilitaControles()
	{
		scopeControle.btnAvancar.attr("disabled" , true);
		scopeControle.btnVoltar.attr("disabled" , true );
	}

	function atualizaControles()
	{
		var habilitaAvancar = ((!scopeControle.TelaAtual.telaFinalizada ) || scopeControle.TelaAtual.UltimaTela && scopeControle.TelaAtual.UltimaLicao && scopeControle.TelaAtual.UltimoModulo)
		var habilitaVoltar = (scopeControle.TelaAtual.PrimeiraTela && scopeControle.TelaAtual.PrimeiraLicao && scopeControle.TelaAtual.PrimeiroModulo);
		scopeControle.btnAvancar.attr("disabled" , habilitaAvancar);
		scopeControle.btnVoltar.attr("disabled" ,  habilitaVoltar);
	}

	function finalizar(p_intModulo, p_intLicao , p_intTela)
	{
		var intIndexModulo = (p_intModulo != undefined) ? (p_intModulo-1) : scopeControle.indexModuloAtual;
		var intIndexLicao = (p_intLicao != undefined)? (p_intLicao-1) : scopeControle.indexLicaoAtual;
		var intIndexTela = (p_intTela != undefined)? (p_intTela-1) : scopeControle.indexTelaAtual;

		if(p_intModulo != undefined)
		{
			var tempObjItemModulos = estrutura.modulos[intIndexModulo];
			if(p_intLicao != undefined)
			{
				var tempObjItemLicao = tempObjItemModulos.arrItens[intIndexLicao];
				if(p_intTela != undefined)
				{
					var tempObjItemTela = tempObjItemLicao.arrItens[intIndexTela];
					tempObjItemTela.Finalizado(true);
					$('body').trigger('telasFinalizados');
				}
				else
				{
					tempObjItemLicao.Finalizado(true);
					$('body').trigger('licaoFinalizados');
				}
			}
			else
			{
				tempObjItemModulos.Finalizado(true);
				$('body').trigger('moduloFinalizados');
			}
			
		}
		else
		{
			for(var i = 0 ; i < estrutura.modulos.length; i++)
			{
				var tempObjItemModulos = estrutura.modulos[i];
				tempObjItemModulos.Finalizado(true);
			}
			$('body').trigger('modulosFinalizados');
		}

		

	}

	function finalizarTela(p_intTela)
	{
		//console.log("FINALIZAR TELAAAAAAAAAAAAAAAAA")
		if(p_intTela != undefined)
		{
			var intIndexTela = (p_intTela-1);
			var tempObjItemTela = estrutura.modulos[scopeControle.indexModuloAtual].arrItens[scopeControle.indexLicaoAtual].arrItens[intIndexTela];
			tempObjItemTela.Finalizado(true);
		}
		else 
		{
			if(scopeControle.SessaoAtual == scopeControle.SessaoTela)
			{
				scopeControle.objItemAtual.Finalizado(true);
				
			}
			scopeControle.TelaAtual.atualizarDadosTela();
		}
		atualizaTracking();
		atualizaControles();
		controleLessonLocation();
		verificarConclusao();
		scopeControle.tracking.salvarDados();
		$('body').trigger('telaFinalizada');
	}

	function iniciarTela()
	{
		$('body').trigger('telaIniciada');
		 
	}

	function irPara(p_intModulo , p_intLicao , p_intTela)
	{

	} 

	function Avancar()
	{
		scopeControle.intContadorAtual++;
		desabilitaControles();
		$('body').trigger('AvancarAcionado');
		
		if(scopeControle.TelaAtual.UltimaTela)
		{
			if(scopeControle.TelaAtual.UltimaLicao)
			{
				if(!scopeControle.TelaAtual.UltimoModulo)
				{
					scopeControle.intModuloAtual++;
					scopeControle.intLicaoAtual = 1;
					scopeControle.intTelaAtual = 1;
				}
			}
			else
			{
				scopeControle.intLicaoAtual++;
				scopeControle.intTelaAtual = 1;
			}
		}
		else
		{
			scopeControle.intTelaAtual++;
		}
		
		//scopeControle.intModuloAtual++;
		//scopeControle.intLicaoAtual++;
		
		
		
		setDadosTelaExecucao();
		
		
	}

	function Voltar()
	{
		scopeControle.intContadorAtual--;
		desabilitaControles();
		$('body').trigger('VoltarAcionado');
		if(scopeControle.TelaAtual.PrimeiraTela)
		{
			if(scopeControle.TelaAtual.PrimeiraLicao)
			{
				if(!scopeControle.TelaAtual.PrimeiroModulo)
				{
					scopeControle.intModuloAtual--;
					
					scopeControle.intLicaoAtual = getTotalItensEstrutura(scopeControle.intModuloAtual , scopeControle.intLicaoAtual);
					scopeControle.intTelaAtual = getTotalItensEstrutura(scopeControle.intModuloAtual , scopeControle.intLicaoAtual , scopeControle.intLicaoAtual)
				}
			}
			else
			{
				scopeControle.intLicaoAtual--;
				scopeControle.intTelaAtual = getTotalItensEstrutura(scopeControle.intModuloAtual , scopeControle.intLicaoAtual , scopeControle.intLicaoAtual);
			}
		}
		else
		{
			scopeControle.intTelaAtual--;
		}
		setDadosTelaExecucao();
		
	}


	function verificarConclusao()
	{
		scopeControle.isCursoFinalizado = scopeControle.tracking.verificarConclusao();
		
	}

	function getConclusaoCurso()
	{
		return scopeControle.isCursoFinalizado;
	} 

	function getPorcentagemExecucao(p_intModulo , p_intLicao)
	{
		var intPorcentagem = 0;
		var intTotalItens = 0;
		var intTotalFinalizados = 0;
		if(p_intModulo != undefined)
		{
			if(p_intLicao != undefined)
			{
				var indexMod = (p_intModulo-1)
				var indexLic = (p_intLicao-1)
				var intIDLicao = scopeControle.estrutura.modulos[indexMod].arrItens[indexLic].ID;
				for(var k = 0; k < scopeControle.estrutura.modulos[i].arrItens[indexLic].arrItens.length; k++)
				{
					var intIDTela = Number(scopeControle.estrutura.modulos[indexMod].arrItens[indexLic].arrItens[k].ID);
					if(scopeControle.estrutura.modulos[indexMod].arrItens[indexLic].arrItens[k].Finalizado()) intTotalFinalizados++;
				}
			}
			else
			{
				var indexMod = (p_intModulo-1)
				for(var j = 0; j < scopeControle.estrutura.modulos[indexMod].arrItens.length; j++)
				{
					var intIDLicao = scopeControle.estrutura.modulos[indexMod].arrItens[j].ID;
					for(var k = 0; k < scopeControle.estrutura.modulos[indexMod].arrItens[j].arrItens.length; k++)
					{
						var intIDTela = Number(scopeControle.estrutura.modulos[indexMod].arrItens[j].arrItens[k].ID);
						if(scopeControle.estrutura.modulos[indexMod].arrItens[j].arrItens[k].Finalizado()) intTotalFinalizados++;
					}
				}
			}
		}
		else
		{
			intTotalItens = scopeControle.estrutura.totalItens;
			for(var i = 0; i < scopeControle.estrutura.modulos.length; i++)
			{
				var intIDModulo = scopeControle.estrutura.modulos[i].ID;
				for(var j = 0; j < scopeControle.estrutura.modulos[i].arrItens.length; j++)
				{
					var intIDLicao = scopeControle.estrutura.modulos[i].arrItens[j].ID;
					for(var k = 0; k < scopeControle.estrutura.modulos[i].arrItens[j].arrItens.length; k++)
					{
						var intIDTela = Number(scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k].ID);
						if(scopeControle.estrutura.modulos[i].arrItens[j].arrItens[k].Finalizado()) intTotalFinalizados++;
					}
				}
				
			}

		}

		intPorcentagem = ((intTotalFinalizados*100)/intTotalItens);

		return intPorcentagem;
	}
}



