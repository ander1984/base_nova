//var configuracoes = new Object();
var estrutura = new Object();
var nodeCurso;

function carregarEstrutura()
{
	$.ajax({
        type: "GET",
        url: "xml/estrutura.xml",
        dataType: "xml",
        success: function(xml)
		{
			nodeCurso = $(xml).find("curso");
			estrutura = new Object();
			estrutura.IdCurso =  nodeCurso.attr("id");
			montaObjetoConfiguracao();
			//montaObjetoEstrutura();
        }
    });
}


function montaObjetoConfiguracao()
{
	var strArquivosJS = ["js/core/configuracoes.js"]
	head.load( strArquivosJS , function() 
	{
		var objEvent = 	{
			"configuracoes": configuracoes
		}
		$('body').trigger('configuracoesCarregadas', objEvent);

	});
/*
	var nodeConfiguracoes = nodeCurso.find("configuracoes");
	var nodeIniciar = nodeConfiguracoes.find("iniciar");
	
	configuracoes = new Object();
	configuracoes.plataforma = nodeConfiguracoes.find("plataforma").text();
	configuracoes.iniciar = new Object();
	
	configuracoes.iniciar.scoInicial = nodeIniciar.find("SCO_incial").text();
	configuracoes.iniciar.recuperarPosicao = (nodeIniciar.find("recuperarPosicao").text() == "true");
	configuracoes.iniciar.confirmaRetorno = (nodeIniciar.find("confirmaRetorno").text() == "true");
	configuracoes.iniciar.confirmaSaida = (nodeIniciar.find("confirmaSaida").text() == "true");
	configuracoes.iniciar.estadoFinal = nodeIniciar.find("estadoFinal").text();
	configuracoes.iniciar.tempoTimeout = Number(nodeIniciar.find("tempoTimeout").text());


	var nodeInterface = nodeConfiguracoes.find("interface");
	var nodeControles = nodeInterface.find("controles");
	var nodeInfo = nodeInterface.find("info");
	
	var nodeControlesDisponiveis = nodeControles.find("controlesDisponiveis");
	var nodeBloquearControles = nodeControles.find("bloquearControle");

	var nodeTitulosVisivel = nodeInfo.find("titulosVisivel");

	configuracoes.interface = new Object();

	configuracoes.interface.controles = new Object();
	
	configuracoes.interface.controles.controlesDisponiveis = new Object();
	configuracoes.interface.controles.controlesDisponiveis.offline = nodeControlesDisponiveis.children("offline").text();
	configuracoes.interface.controles.controlesDisponiveis.online = nodeControlesDisponiveis.children("online").text();
	
	configuracoes.interface.controles.bloquearControle = new Object();
	configuracoes.interface.controles.bloquearControle.ajuda = nodeBloquearControles.children("ajuda").text();
	configuracoes.interface.controles.bloquearControle.menu = nodeBloquearControles.children("menu").text();
	configuracoes.interface.controles.bloquearControle.tela = nodeBloquearControles.children("tela").text();

	configuracoes.interface.info = new Object();
	configuracoes.interface.info.titulosVisivel = new Object();
	configuracoes.interface.info.titulosVisivel.tela = nodeTitulosVisivel.children("tela").text();

*/

	//console.log(configuracoes)
}

function montaObjetoEstrutura(p_scopeControle)
{
	var scopeControle = p_scopeControle;
	var strModoConclusao = scopeControle.strModoConclusao;


	estrutura.totalItens = 0;
	
	
	
	var nodeEstrutura = nodeCurso.find("estrutura");
	var nodeModulos = nodeEstrutura.find("modulos");

	estrutura.nomeCurso = nodeEstrutura.children("nome").text();
	estrutura.modulos = new Array();

	var strModuloExecusao =  ((scopeControle.intModuloAtual) <= 9) ? String("0"+(scopeControle.intModuloAtual)) : String((scopeControle.intModuloAtual)) ; 

	nodeModulos.find("modulo").each(function(indexModulo)
	{
		var nodeModulo = $(this);
		var strIdModulo = ((indexModulo+1) <= 9) ? String("0"+(indexModulo+1)) :  String((indexModulo+1));//nodeModulo.attr("id");

		if(strModoConclusao == scopeControle.strModoCurso)
		{
			strModuloExecusao = strIdModulo;
		}

		if(strModuloExecusao == strIdModulo)
		{

			/*var strTipoModulo = nodeModulo.attr("tipo");
			var strComportamentoModulo = nodeModulo.attr("comportamento");*/
			var strTipoModulo = nodeModulo.children("tipo").text().trim();
			var strComportamentoModulo = nodeModulo.children("comportamento").text().trim();
			var strNomeModulo = nodeModulo.children("nome").text().trim();


			var arrItensLicoes = new Array();

			var nodeLicoes = nodeModulo.find("licoes");
			
			nodeLicoes.find("licao").each(function(indexLicao)
			{
				var nodeLicao = $(this);
				var strIdLicao = ((indexLicao+1) <= 9) ? String("0"+(indexLicao+1)) :  String((indexLicao+1));//nodeLicao.attr("id");
				var strLicaoExecusao =  ((scopeControle.intLicaoAtual) <= 9) ? String("0"+(scopeControle.intLicaoAtual)) : String((scopeControle.intLicaoAtual)) ;
				if((strModoConclusao == scopeControle.strModoCurso) || (strModoConclusao == scopeControle.strModoModulo))
				{
					strLicaoExecusao = strIdLicao;
				}
			
				if(strLicaoExecusao == strIdLicao)
				{
					/*var strTipoLicao = nodeLicao.attr("tipo");
					var strComportamentoLicao = nodeLicao.attr("comportamento");*/
					var strTipoLicao = nodeLicao.children("tipo").text().trim();
					var strComportamentoLicao =nodeLicao.children("comportamento").text().trim();
					var strNomeLicao = nodeLicao.children("nome").text().trim();
					
					var arrItensTelas = new Array();

					var nodeTelas = nodeLicao.find("telas");
					
					

					nodeTelas.find("tela").each(function(id)
					{
						var nodeTela = $(this);
						
						if((Number(strIdLicao) > 0))
						{
							var strIdTela = ((id+1) <= 9) ? String("0"+(id+1)) : String((id+1)) ;//nodeTela.attr("id");
						}
						else
						{
							var strIdTela = (id <= 9) ? String("0"+(id)) : String((id)) ;//nodeTela.attr("id");
						}
						/*var strTipoTela = nodeTela.attr("tipo");
						var strComportamentoTela = nodeTela.attr("comportamento");*/
						var strTipoTela = nodeTela.children("tipo").text().trim();
						var strComportamentoTela = nodeTela.children("comportamento").text().trim();
						var strNomeTela = nodeTela.children("nome").text().trim();
						
						var strArquivoTela = strIdModulo+"_"+strIdLicao+"_"+strIdTela+".html";
						estrutura.totalItens++;
						arrItensTelas.push(new item("tela" , strIdTela , strIdModulo , strIdLicao , strNomeTela, null , strTipoTela , strComportamentoTela , strArquivoTela));

					});
					arrItensLicoes.push(new item("licao" , strIdLicao  , strIdModulo , strIdLicao , strNomeLicao, arrItensTelas , strTipoLicao , strComportamentoLicao , null));
				}
			});
			estrutura.modulos.push(new item("modulo" ,strIdModulo , strIdModulo , null , strNomeModulo , arrItensLicoes , strTipoModulo , strComportamentoModulo , null));
		}
		
		
	});
	//console.log(estrutura)
	//console.log(estrutura.modulos)
	//estrutura.modulos = 
	//estrutura.nomeCurso = nodeEstrutura.find("nome");
	var objEvent = 	{
		"estrutura": estrutura,
		"configuracoes": configuracoes
	}


	$('body').trigger('estruturaCarregada', objEvent);
}