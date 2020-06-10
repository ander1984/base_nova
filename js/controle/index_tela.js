var strNomeXML = "midias.xml";
var objControleMidias;
var intTotalSlides;
var intSlideAtual;

var blnControleAcesso;

var SCO;
var POSICAO;
var strSCOTracking;
 
var btnAvancarSlider;
var btnVoltarSlider;
var btnSliders;

var controleTracking;
var intTelaAtual = 1;
var arrArquivosJS = ["js/controle/slides.min.js"]

var strSlideFinalizado;
var objControleSlide;
var objControleVideos;

var streamingProtocol = "";
var objVideosSectionAtual = null;
var strObjMaterial;
var strVideoAtual;

var objControle;

function iniciarTelaControleSlides()
{
	
	objControle = controle;
	blnControleAcesso = false;

	intTelaAtual = objControle.intTelaAtual;
	SCO = objControle.SCO_ATUAL;	
	POSICAO = objControle.util.Format(intTelaAtual);
	
	strSCOTracking = SCO+"T"+POSICAO+"Slides";
	
	objControleSlide = objControle.tracking.getSuspendData(strSCOTracking);

	if(!objControleSlide || objControleSlide == "" || objControleSlide == null || objControleSlide == "null" || objControleSlide == undefined || objControleSlide == "undefined" )
	{
		objControleSlide = new Object();
		objControleSlide.slideFinalizados = "";
		objControleSlide.objControleVideos = new Object();

	}

	objControleVideos = new Object();
	objControleVideos = objControleSlide.objControleVideos;

	if(!objControleVideos || objControleVideos == "" || objControleVideos == null || objControleVideos == "null" || objControleVideos == undefined || objControleVideos == "undefined" )
	{
		objControleVideos = new Object();
	}
	
	//console.log("objControleSlide: >>> " ,objControleSlide);
	//console.log("objControleSlide.intSlideAtual: >>> " ,objControleSlide.intSlideAtual);
	
	intSlideAtual = isNaN(objControleSlide.intSlideAtual) ? 1 : objControleSlide.intSlideAtual;

	strSlideFinalizado = objControleSlide.slideFinalizados;


	//console.log("objControleSlide.intSlideAtual: >>> " ,objControleSlide.intSlideAtual);
	
	$('body').addClass("slides smooth horizontal smoothScroll noPreload animated");
	
	
	
	btnAvancarSlider = $(".nextSlide");
	btnVoltarSlider = $(".prevSlide");
	
	$(".side").addClass("forcar-ativo");
	
	btnSliders = $(".sections");
	
	btnSliders.hide();
	
	addEventos();
	objControleMidias = new Object();
	carregarXML(strNomeXML);
	
	 
}

function addEventos()
{	

	 $('body').on('playerCompleto' , function(event , data){videoFinalizado(data)});

	 btnAvancarSlider.on('click' , avancarClickHandler);
	 btnVoltarSlider.on('click' , voltarClickHandler);
	
	$(window).on("slideChange", slideChangeHandler);
	$(window).on("ready", slideReadyHandler);
	$(window).on("hold", function(){});
	$(window).on("tap", function(){});
	$(window).on("swipe", function(){});
	$(window).on("swipeStatus", function(){})
	$(window).on("swipeRight", function(){});
	$(window).on("swipeLeft", function(){});
	$(window).on("swipeUp", function(){});
	$(window).on("swipeDown", function(){});
	$(window).on("pinchStatus", function(){});
	$(window).on("pinchIn", function(){});
	$(window).on("pinchOut", function(){});
	$(window).on("longtap", function(){});
	$(window).on("hashchange", function(){});
	$(window).on("ajaxSuccess", ajaxSuccessHandler);
	$(window).on("ajaxError", function(){});
	$(window).on("ajaxStart", function(){});
	$(window).on("ajaxSend", function(){});
}


function carregarXML(p_strNomeXML)
{
	var urlXML = "xml/" + p_strNomeXML;
	
	$.ajax({   
	  type: "GET",
        url: urlXML,
        dataType: "xml",
        success: function(xml){
			$(xml).find("tela").each(function(index_tela)
			{	
				if(intTelaAtual == (index_tela+1))
				{
					$(this).find("material").each(function(index)
					{
						var intID = index + 1;
						var strTempObjMaterial = "material"+intID;
						objControleMidias[strTempObjMaterial] = new Object();
						var tempObjMaterial = objControleMidias[strTempObjMaterial];
						
						tempObjMaterial.id = intID;
						tempObjMaterial.titulo = $(this).find("titulo").text();
						
						tempObjMaterial.anexo = $(this).find("anexo").text();
						
						tempObjMaterial.arrVideos = new Array();

						
						 $(this).find("video").each(function(indexVideo)
						 {
							 var objVideo = new Object();
							 objVideo.id = (indexVideo+1);
							 objVideo.video = $(this).find("url").text();
							 objVideo.imagem = $(this).find("imagem").text();
							
							var strCharAt = objControleSlide.objControleVideos[strTempObjMaterial] ? objControleSlide.objControleVideos[strTempObjMaterial].charAt(indexVideo) : "0";
							 

							 objVideo.completo = (strCharAt == "1");
							 
							 tempObjMaterial.arrVideos.push(objVideo);

						 
						 });
					});
				}
			});
			
			//console.log("objControleMidias: " , objControleMidias);
			carregarTela();
		}
	 });
}

function carregarTela()
{
	atualizaHTML();
}


function atualizaHTML()
{
	//console.log("ANTES TOTAL SLIDES " , $(".slide").length)
	var strHTML = "";
	
	
	//console.log($("svg")[0])
	
	
	$("svg").each(function(i){
		if(i == 0) $(this).after(createTagLogo());
	})
	

	//p_tagSection.before(strTagSection);
	
	//$("[data-title]").each(function(){
	$("section").each(function()
	{
		
		createTagSectionVideos($(this))
		$(".icone-check").hide();
		
	})
	setVideoPlayerMarkup()
	
	//console.log("objControleMidias: " , objControleMidias);
	
	//$("body").append(strHTML);
	 //window.updateHash();
	 head.load(arrArquivosJS , function(){ 
			//controleTracking = new tracking();
		//controleTracking.init();
		iniciarControle();
		//setTimeout(iniciarControle , 1000)
	});
	
	 //console.log("DEPOIS TOTAL SLIDES " , $(".slide").length)
	
}



function iniciarControle()
{
	//strSlideFinalizado[strSCOTracking] = "";
	
	intTotalSlides = $(".slide").length;

	
	if(!strSlideFinalizado || strSlideFinalizado == "" || strSlideFinalizado == undefined || strSlideFinalizado == "undifned" || strSlideFinalizado == null)
	{
		strSlideFinalizado = "";
		for(var i = 0;  i < intTotalSlides ; i++)
		{
			strSlideFinalizado	+= "0";
		}
	}
	
	var objControleVideo = new controlePlayer(configuracoes.player);
	
	//console.log("iniciarControle " , strSlideFinalizado.length)
	
	$("[data-slider-id='videos'] a").on("click", function(e){  
		e.preventDefault();
		
		if($(this).hasClass("box-block"))
		{
			return;
		};
		
       // console.log("CLiCK NO BOTAO PARA VIDEO " , $(this).attr("id"))
		
		var objVideo = {};
		
		  //objVideo.targetVideo = isStreaming ? streamingURL+$(this).attr("href")+streamingProtocol : $(this).attr("href");
          objVideo.poster = $(this).data("poster");  
          objVideo.indexSlider = $(this).parents('section.slide').index('section.slide') + 1;
          objVideo.indexVideoSlider = $(this).parents('section.slide').find('[data-slider-id="videos"] a').index($(this));
       
        objVideo.file = $(this).attr("href");
        objVideo.image = $(this).data("poster");  
        objVideo.seletor = "videoPlayer";
        objVideo.autostart = true;
        objVideo.aspectratio = "16:9";
		objVideo.width = "100%";

		strVideoAtual = $(this).attr("id");

		 openIframeVideo(objVideo);
		
      });
	//console.log("strSlideFinalizado:: " , strSlideFinalizado.length)
	
	
	
	//window.changeSlide(intSlideAtual);
	//$(window).trigger("slideChange", [window.stage, c])
	updateSetupVideo();
	//slideChangeHandler();
	objControle.iniciarTela ();
	
}

function voltarClickHandler()
{
	desabilitarBotoesNavegacao();
}

function avancarClickHandler()
{
	desabilitarBotoesNavegacao();
}

function habilitarAvancar()
{
	btnAvancarSlider.show();
}

function desabilitarBotoesNavegacao()
{
	btnAvancarSlider.hide();
	btnVoltarSlider.hide();
}

function controleBotoesNavegacao()
{
	var isEnableAvancar = (intSlideAtual < intTotalSlides);
	var isEnableVoltar = (intSlideAtual > 1);
	
	if(isEnableAvancar)
	{
		btnAvancarSlider.show();
	}
	else
	{
		btnAvancarSlider.hide();
	}	
	
	if(isEnableVoltar)
	{
		btnVoltarSlider.show();
	}
	else
	{
		btnVoltarSlider.hide();
	}
}



function videoFinalizado(data)
{
	controleNavegacaoVideos();
	closeAllModalInstances();
}


function controleNavegacaoVideos()
{
	for(var i = 0 ; i < objVideosSectionAtual.arrVideos.length; i++)
	{
		
		var tempObjVideoAtual = objVideosSectionAtual.arrVideos[i];
		if(tempObjVideoAtual.idSeletor == strVideoAtual)
		{
			
			var strSeletor = "#"+tempObjVideoAtual.idSeletor;
			tempObjVideoAtual.completo = true;
			
			
		}
	};
	updateSetupVideo()
	controleNavegacao()
	
}

function updateSetupVideo()
{
	var isComplete = true;
	var tempStrControleVideo;
	for(var strMaterial in objControleMidias)
	{
		var isMaterialCompleto = true;
		var tempObjControleMaterial = objControleMidias[strMaterial];
		var tempArrVideo = tempObjControleMaterial.arrVideos;
		
		tempStrControleVideo = "";
		
		for(var i = 0; i < tempArrVideo.length; i++)
		{
			var tempObjVideo = tempArrVideo[i];
			var strSeletor = "#"+tempObjVideo.idSeletor;
			
			var charAtual = objControleVideos[strMaterial] ? objControleVideos[strMaterial].charAt(i) : "0";
			$("#check_"+strSeletor).hide();
			if(i == 0)
			{
				$(strSeletor).addClass("ativo");
				$(strSeletor).removeClass("box-block");
			}
			if(tempObjVideo.completo)
			{
				
				$(strSeletor).addClass("completed");
				$(strSeletor+"_check").addClass("icone-check-completed");

				$(strSeletor+"_check").show();
				var tempProxObjVideo = tempArrVideo[(i+1)];
				if(tempProxObjVideo)
				{
					var strProxSeletor = "#"+tempProxObjVideo.idSeletor;
					$(strProxSeletor).addClass("ativo");
					$(strProxSeletor).removeClass("box-block");
				}
				
			}
			else
			{
				
				isMaterialCompleto = false;

			}
			tempStrControleVideo += tempObjVideo.completo ? "1" : charAtual;
		}

		objControleVideos[strMaterial] = tempStrControleVideo;

		if(isMaterialCompleto)
		{
			tempObjControleMaterial.completo = true;
		}
		else
		{
			isComplete = false;
		}
		
	}
	
	if(isComplete)
	{
		objControleMidias.completo = true;
	}
	
	
	
}

function controleNavegacao()
{

	if(objVideosSectionAtual)
	{
		btnVoltarSlider.show();

		if(objVideosSectionAtual.completo)
		{
			setSlideFinalizado();
			controleBotoesNavegacao();
		}
	}
	else
	{
		setSlideFinalizado();
		controleBotoesNavegacao();
	}
	
	atualizaDadosControleSlides();
	
	
}

function verificarFim()
{
	if(objControleSlide.slideFinalizados.indexOf("0") == -1)
	{
		controle.finalizarTela();
	}
}

function setSlideFinalizado()
{
	var indexSlideAtual = (intSlideAtual-1);
	var strTempSlideFinalizado = "";
	for(var i = 0; i < strSlideFinalizado.length; i++)
	{
		var charAtual = strSlideFinalizado.charAt(i);
		strTempSlideFinalizado += (i == indexSlideAtual) ? "1" : charAtual;
		
	}
	
	strSlideFinalizado = strTempSlideFinalizado;
	
}

function atualizaDadosControleSlides()
{
	objControleSlide.intSlideAtual = intSlideAtual;
	objControleSlide.slideFinalizados = strSlideFinalizado;
	objControleSlide.objControleVideos = objControleVideos;
	
	objControle.tracking.setSuspendData( strSCOTracking , objControleSlide);
	
	verificarFim();

}


function ajaxSuccessHandler()
{
	//console.log("ajaxSuccess  SLIDE")
}

function slideReadyHandler()
{

	if(!blnControleAcesso)
	{
		desabilitarBotoesNavegacao();
		intTotalSlides = $(".slide").length;
		blnControleAcesso = true;
		window.changeSlide(intSlideAtual);
		setTimeout(controleNavegacao , 1500);

	}
}

function slideChangeHandler(event , p_intSlideAtual , p_param)
{

	if(blnControleAcesso)
	{

		var objSectionAtual = p_param;
		
		intSlideAtual = p_intSlideAtual;
		
		strObjMaterial = objSectionAtual[0].id;
		
		objVideosSectionAtual = objControleMidias[strObjMaterial];
		
		setTimeout(controleNavegacao , 1500);
	}
}

function createTagLogo()
{
	
	var strSVGLogo = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\
		<symbol id="logo_principal" viewBox="0 0 205.94 31.61">\
			<svg id="Camada_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 50" style="enable-background:new 0 0 425 50">\
				<path d="M20.7 5.3H5.8v.2c3 1.2 2.7 5.7 2.7 8.4v23c0 2.7.4 7.3-2.7 8.3v.2h12.1v-.2c-3.2-1.8-3.2-4.3-3.2-7.7V10c1.4-.2 2.8-.4 4.3-.4 4.9 0 8.7 2.1 8.7 7.5 0 5.9-5.7 9.1-10.9 9.4 1.4.7 2.9.9 4.4.9 6.9 0 13.4-4.5 13.4-11.5 0-6.8-6-10.6-13.9-10.6m51.9.2l-.1-.2H60.9v.2c3 1.2 2.7 5.6 2.7 8.3v18.4c0 2.2.1 3.7-1.3 5.6-2 2.9-5.5 4.3-8.9 4.3-6.3 0-9.7-3.8-9.7-11.9V13.8c0-2.7-.4-7.2 2.7-8.3v-.2H34.8v.2c3.1 1.2 2.7 5.6 2.7 8.3v16.3c0 4.4-.1 8.5 3.1 12 2.7 3 7 4.3 11 4.3 4.3 0 9.3-1.5 11.9-5v4h9v-.2c-3.1-1.2-2.7-5.6-2.7-8.3v-23c0-2.8-.3-7.3 2.8-8.4zm35.6 32c-3.8 2.2-8.4 3.8-13 3.8-9.4 0-15.5-8-15.5-16.9 0-8.8 5.9-15 14.3-15 4 0 7.9 1.3 11.3 3.5v-7c-3.6-.8-7.4-1.5-11.1-1.5-12.5 0-21.4 8.4-21.4 21 0 13 8.9 21.1 23.3 21.1 3.2 0 6.3-.5 9.2-1.8l3.1-7.1h-.2zm26.6-.6c2.6 3.2 6.4 6.3 9.9 8.5h-5.6c-3.2 0-5.2-.8-7.1-3l-7.4-9.2-5.6-8.6c4.9-.7 10.5-3 10.5-8.7 0-4.4-3.8-7-7.9-6.8-1.4.1-2.7.2-4.1.5v27.3c0 2.8-.4 7.3 2.7 8.3v.2h-11.6v-.2c3.1-1.1 2.7-5.6 2.7-8.3v-23c0-2.8.4-7.3-2.7-8.4v-.2h14.5c8.2 0 12.6 4.3 12.6 9.8 0 5.4-4.7 9.6-9.7 10.7l8.8 11.1m16.7-22.6c0-4.2 4.4-5.5 7.9-5.5 3.4 0 7.2 1.4 9.6 3.8V5.7c-2.9-.9-6-1.3-9.1-1.3-7.4 0-15.3 2.9-15.3 10.6 0 12.9 21 11.2 21 20.7 0 4.3-5.2 6.3-8.7 6.3-4.8 0-9.8-2-13.4-5.1l1.8 7.6c3.5 1.3 7.2 1.8 10.9 1.8 9.5 0 16.3-6.1 16.3-12.6 0-11.2-21-11.1-21-19.4zm259.2 14.5h8.5v2.6h-8.5v-2.6zm-117.2-3.5v-10c0-2.2-.8-3.4-3.2-3.4h-2.8v7.4c-.9-4.4-4.6-7.8-9.7-7.8s-9.2 3.4-10.1 7.8v-3.9c0-2.2-.8-3.4-3.3-3.4h-2.8v10.2c0 2.6-1.1 3.4-2.8 3.4-1.7 0-2.8-.8-2.8-3.4v-6.8c0-2.2-.8-3.4-3.3-3.4h-2.8v10.2c0 6.5 3.4 9.1 8.9 9.1 5.6 0 8.5-2.2 8.9-8.2.9 4.8 5 8.2 10.1 8.2 4.7 0 8.9-3.4 9.7-7.7v7.3h11.3c2.4 0 3.4-.7 3.4-3.2v-2.3h-8.7zm-15.9.3c-2.4 0-4.1-1.9-4.1-4.3s1.7-4.3 4.1-4.3c2.4 0 4.2 1.9 4.2 4.3s-1.8 4.3-4.2 4.3zm39.5-13.7c4.3 0 7.1.4 7.1 6.5 0 2.7-1.4 4.2-4.8 4.2h-7.8c0 4.3.8 5.4 3.5 5.4 3.2 0 6.1 0 8.7-.3v1.9c-2.8.8-5.8 1-8.7 1-4.7 0-6.1-2.3-6.1-9.5.1-8.1 2.4-9.2 8.1-9.2zm2.3 8.3c1.5 0 2.2-.6 2.2-1.7 0-3.6-.7-4-4.4-4-3.9 0-5.5 0-5.5 5.7h7.7zm13.6-8.4c1.6 0 4.6.5 6.8 1.4v-8h2.5v25.4h-1.8l-.7-2.1c-.9.7-4.4 2.3-6.8 2.3-5 0-6.1-5.1-6.1-9.3 0-4.9.8-9.7 6.1-9.7zm0 16.3c2.7 0 4.9-.8 6.8-1.6V15.3c-2.4-.6-4.1-.9-6.8-.9-2.2 0-3.5 1.4-3.5 7 0 4.5 1.2 6.7 3.5 6.7zm11.7-15.5l3.4-.6.6-5.1h1.9V12h5.4v2.6h-5.4v9.3c0 3 .8 3.7 2 4 0 0 2.8.7 3.1.7v1.8h-3.1c-2.7 0-4.6-1.7-4.6-6.6v-9.3h-3.4v-1.9zm21.8-.7c4.3 0 7.1.4 7.1 6.5 0 2.7-1.4 4.2-4.8 4.2H361c0 4.3.8 5.4 3.5 5.4 3.2 0 6.1 0 8.7-.3v1.9c-2.8.8-5.8 1-8.7 1-4.7 0-6.1-2.3-6.1-9.5.1-8.1 2.4-9.2 8.1-9.2zm2.3 8.3c1.5 0 2.2-.6 2.2-1.7 0-3.6-.7-4-4.4-4-3.9 0-5.5 0-5.5 5.7h7.7zm13.6-8.3c1.8 0 5.5.5 7.9.9v1.9s-4.8-.2-7.9-.2c-2.1 0-3.5.4-3.5 7 0 5.3 1 6.7 3.5 6.7 3.2 0 8.2-.4 8.2-.4v1.9c-2.8.8-5.3 1-8.2 1-3.4 0-6.1-1.3-6.1-9.4s2.5-9.4 6.1-9.4zm11.2-6.7h2.6v9c2.1-1.2 4-2.5 6.8-2.5 3.7 0 5.7 2.8 5.7 5.9v12.9h-2.6V17.7c0-2.3-1.3-3.3-3.1-3.3-2.8 0-4.1.7-6.8 2v14.2h-2.6V5.2zM249.8 39.1h3.9v.6H252v5.1h-.6v-5.1h-1.7v-.6zm6.9 1c0-.8.5-1 1-1l2.5.1v.5h-2.5c-.4 0-.4.2-.4.4v1.6l2.5.1v.5l-2.5.1V44c0 .4.3.4.5.4h2.4v.4l-2.4.1c-.5 0-1.1-.1-1.1-1v-3.8zm8.5-1.1c.4 0 1.4.1 1.9.2v.5s-1.2-.1-1.9-.1c-1 0-1.3.4-1.3 2.3 0 1.3.3 2.3 1.3 2.3.8 0 1.9-.1 1.9-.1v.5c-.5.1-1.5.2-1.9.2-1.4 0-1.9-1.2-1.9-2.9 0-1.8.3-2.9 1.9-2.9zm5.1.1h.6l3 4.6v-4.6h.6v5.7h-.6l-3-4.6v4.6h-.6v-5.7zm9.7 0c1.3 0 2.2.3 2.2 2.9 0 2.5-.8 2.8-2.2 2.8-1.4 0-2.2-.2-2.2-2.8 0-2.7.9-2.9 2.2-2.9zm0 5.1c1.2 0 1.6-.3 1.6-2.3 0-2.3-.6-2.3-1.6-2.3s-1.6 0-1.6 2.3c0 2.1.4 2.3 1.6 2.3zm5.5-5.1h.6v4.7c0 .4.3.4.5.4h2.4v.6h-2.4c-.5 0-1.1-.1-1.1-1v-4.7zm8.5 0c1.3 0 2.2.3 2.2 2.9 0 2.5-.8 2.8-2.2 2.8-1.4 0-2.2-.2-2.2-2.8 0-2.7.9-2.9 2.2-2.9zm0 5.1c1.2 0 1.6-.3 1.6-2.3 0-2.3-.6-2.3-1.6-2.3s-1.6 0-1.6 2.3c0 2.1.4 2.3 1.6 2.3zm6.9-5.2c.4 0 1.4.1 2 .2v.5s-1.2-.1-2-.1c-1 0-1.2.7-1.2 2.3 0 1.7.3 2.3 1.3 2.3.6 0 1.5-.4 1.5-.4v-1.6h-1.3V42c.3-.1.7-.2 1.4-.2h.5v3h-.4l-.1-.4c-.3.2-.8.4-1.5.4-1.6 0-1.8-1.3-1.8-2.9-.2-1.5.1-2.9 1.6-2.9zm5.5.1h.6v5.7h-.6v-5.7zm5.8 0h.6l2 5.7h-.7l-.5-1.6h-2.3l-.5 1.6h-.7l2.1-5.7zm1.2 3.5l-.9-2.6-.9 2.6h1.8zm8.6-3.5h2.3c.6 0 1.4.3 1.4 1.6 0 1.6-.8 1.7-1.4 1.7-.3 0-1.7-.1-1.8-.2v2.5h-.5v-5.6zm2.4 2.8c.4 0 .8-.1.8-1.1s-.5-1.1-.8-1.1h-1.8v2.2h1.8zm5.8-2.8h.6l2 5.7h-.8l-.5-1.6h-2.3l-.5 1.6h-.7l2.2-5.7zm1.2 3.5l-.9-2.6-.9 2.6h1.8zm4.3-3.5h2.4c.7 0 1.3.4 1.3 1.7 0 1.5-.8 1.6-1 1.6l1.2 2.3h-.6l-1.2-2.3-1.6-.1v2.4h-.6v-5.6zm2.4 2.7c.4 0 .7 0 .7-1s-.4-1.1-.7-1.1h-1.8v2.2h1.8zm6.5-2.7h.6l2 5.7h-.7l-.5-1.6h-2.3l-.5 1.6h-.7l2.1-5.7zm1.2 3.5l-.9-2.6-.9 2.6h1.8zm8.8-2.5c0-.8.5-1 1-1l2.5.1v.5h-2.5c-.4 0-.4.2-.4.4v1.6l2.5.1v.5l-2.5.1V44c0 .4.3.4.5.4h2.4v.4l-2.4.1c-.5 0-1.1-.1-1.1-1v-3.8zm6.7-1h2.1c1.7 0 2 1.7 2 2.9 0 1.3-.5 2.8-2 2.8h-2.1v-5.7zm2.1 5.1c1 0 1.4-1 1.4-2.2 0-1.7-.5-2.3-1.4-2.3h-1.5v4.5h1.5zm5.4-5.1h.6v3.2c0 2 .6 1.9 1.5 1.9.8 0 1.5 0 1.5-1.9v-3.2h.6v3.2c0 2.5-1.1 2.5-2.1 2.5-1.1 0-2.1.1-2.1-2.5v-3.2zm9.2-.1c.4 0 1.4.1 1.9.2v.5s-1.2-.1-1.9-.1c-1 0-1.3.4-1.3 2.3 0 1.3.3 2.3 1.3 2.3.8 0 1.9-.1 1.9-.1v.5c-.5.1-1.5.2-1.9.2-1.4 0-1.9-1.2-1.9-2.9.1-1.8.4-2.9 1.9-2.9zm7 .1h.6l2 5.7h-.7l-.5-1.6h-2.3l-.5 1.6h-.7l2.1-5.7zm1.2 3.5l-.9-2.6-.9 2.6h1.8zm5.9-3.6c.4 0 1.4.1 1.9.2v.5s-1.2-.1-1.9-.1c-1 0-1.3.4-1.3 2.3 0 1.3.3 2.3 1.3 2.3.8 0 1.9-.1 1.9-.1v.5c-.5.1-1.5.2-1.9.2-1.4 0-1.9-1.2-1.9-2.9 0-1.8.3-2.9 1.9-2.9zm-.2 6.7c.2-.1.2-.4.2-.7h.5c0 .8-.2 1.1-.8 1.1h-.4v-.3l.5-.1zm7.1-6.6h.6l2 5.7h-.7l-.5-1.6h-2.3l-.5 1.6h-.7l2.1-5.7zm-.1-1.3c.4 0 .6.3.8.3.2 0 .5-.1.7-.3l.2.3c-.3.2-.6.5-.9.5-.4 0-.6-.3-.8-.3-.3 0-.5.2-.7.3l-.2-.3c.3-.3.6-.5.9-.5zm1.3 4.8l-.9-2.6-.9 2.6h1.8zm6.3-3.5c1.3 0 2.2.3 2.2 2.9 0 2.5-.8 2.8-2.2 2.8-1.4 0-2.2-.2-2.2-2.8 0-2.7.9-2.9 2.2-2.9zm0 5.1c1.2 0 1.6-.3 1.6-2.3 0-2.3-.6-2.3-1.6-2.3s-1.6 0-1.6 2.3c0 2.1.4 2.3 1.6 2.3zM241.2 20.6c.1-.8.2-1.7.2-2.5-.2-5.1-4-10.2-8.5-12.4-1.8-.9-3.6-1.3-5.8-1.3-2 0-3.7.3-5.7 1-5.2 1.9-9 7.9-9 12.5 0 .7.1 1.4.2 2-.4 1.2-.7 2.5-.7 4 0 6.6 6.7 12.5 14.7 12.6 2.7 0 5.1-.8 7.1-2.3 2.7-.5 5-2.8 6.7-5.8 1.6-2.7 1.7-5.7.8-7.8m-14-15.7c5.4-.1 10 3.3 12.1 7.8.8 1.7 1.3 3.7 1.3 5.7v1.1c-.6-.8-1.5-1.4-2.5-1.7-.7-.2-1.4-.2-2.2-.1-2.6-3.3-6.9-5.4-11.4-5.4-4.8 0-8.9 2.2-11 5.7.1-7 5.7-13 13.7-13.1m5.7 29.2c-.5 0-.9 0-1.4-.2-1.3-.4-2.2-1.1-2.8-2.1 3-.4 5.8-1.6 8-3.5-.6 2.5-2 4.4-3.8 5.8m-5.2-2.7h-.6c-6.9 0-12.7-5.3-13.5-11.7 1.8-3.4 5.7-5.4 10.3-5.4 3.3 0 7 1.7 9.6 4.2-2.4 1.3-4.5 3.7-5.5 6.3-1.1 2.5-1.1 4.9-.3 6.6M229 26c1-2.6 3.4-4.9 5.9-5.8 1.3 1.7 2.1 3.6 2.1 5.7 0 .6 0 1.1-.1 1.6-2.2 2.2-5.1 3.6-8.3 3.9-.6-1.5-.4-3.4.4-5.4m8.2-6.2c.3 0 .7.1 1 .1.9.2 1.6.7 2.1 1.3-.4 1.6-1 3.1-1.9 4.4v-1c0-1.7-.4-3.3-1.2-4.8m-11.4 16.4c-7.3 0-13.3-6.1-13.3-11.9 0-1.1.1-2 .4-3 1.6 6 7.3 10.5 14 10.5h1.1c.6 1.1 1.7 1.9 3.1 2.2.5.1 1 .2 1.5.2-2 1.4-4.3 2-6.8 2m14.3-7.3c-1.5 2.5-3.7 4.5-6 5 2.1-1.7 3.7-4.2 4.2-7.1 1.2-1.4 2.1-3 2.6-4.7.9 1.8.6 4.4-.8 6.8"/></svg>\
			</symbol>\
		</svg>'
	
	var strTagLogo = strSVGLogo+'<div class="panel">\
        			<div class="sections desktop">\
        				<div class="right">\
        					<svg style="width:250px;height:60px;margin:6px 0 0 16px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo_principal"></use></svg>\
        				</div>\
        			</div>\
        		</div>'

	return strTagLogo;
}
function creteTagIcone(p_id)
{
	return '&nbsp;&nbsp;&nbsp;<svg class="icone-check" id="'+p_id+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 41"><title>Rectangle-32</title><path d="M43.767 0L50 6.338 15.91 41 0 24.824l5.958-6.057 9.675 9.838L43.767 0z" fill="#fff" fill-rule="evenodd"/></svg>'
}

function createTagSectionVideos(p_tagSection)
{
		var strDataTitle = p_tagSection.data().title;
		for(var strObjMaterial in objControleMidias)
		{
			var objMaterialTemp = objControleMidias[strObjMaterial]
			var strURLAnexo = "assets/docs/" + objMaterialTemp.anexo;
			var intID = objMaterialTemp.id;
			var strTitulo = objMaterialTemp.titulo;
			var arrObjVideos = objMaterialTemp.arrVideos;
			var strIDSection = "material"+intID;
			var strDataTitleObj = "Materiais da aula " + intID;
			//strHTML += $(this);
			
			if(strDataTitle.indexOf(strDataTitleObj) != -1)
			{

				var strTagSection = '<section id="'+strIDSection+'">\
					<div class="content">\
							<div class="container">\
								<div class="wrap">\
									<div class="fix-10-12 toCenter margin-bottom-5">\
										<h1 class="hero bold ae-1 fromLeft huge done">'+ strTitulo.toUpperCase() +'</h1>\
									</div>\
									<div class="fix-12-12"> \
										<ul class="grid grid-77 later equal left"> \ ';
				for(var i = 0; i < arrObjVideos.length; i++)
				{		
					var objTempVideo = arrObjVideos[i];
					var strURLNomeVideo = objTempVideo.video;
					var strURLNomeImagem = "assets/img/"+objTempVideo.imagem;
					var strTextoBotao = "Assistir Parte " + objTempVideo.id;
					
					var strIDSeletorVideo = "m"+intID+"v"+objTempVideo.id
					
					objTempVideo.idSeletor = strIDSeletorVideo;
					
					strTagSection +='<li class="col-3-12 ae-2 fromLeft done" data-slider-id="videos"> \
										  <a href="'+ strURLNomeVideo+'" id="'+strIDSeletorVideo+'" class="box-77 ae-4 box-block done"> \
												<div class="thumbnail-77"> \
													<img src="'+ strURLNomeImagem +'" alt="Picture" class="wide" /> \
												</div> \
												<div class="details-77 equalElement" style="height: 116.143px;"> \
													<div class="table wide"> \
														<div class="cell"> \
															<div class="button gold wide crop margin-top-3">'+strTextoBotao+''+creteTagIcone(strIDSeletorVideo+"_check")+'</div> \
															<br> \
														</div> \
													</div> \
												</div> \
										  </a> \
									  </li>';
				}		  
				strTagSection += '</ul> \
							</div>\
							<p class="small margin-1 toCenter"><a target="_blank" rel="noopener noreferrer" href="'+strURLAnexo	+'" style="color:#e1be5a"><u>Clique aqui</u></a> para baixar a apresentação de apoio utilizada pelo professor nesta aula.</p>\
						</div>\
					</div>\
				</div>\
				<div class="background" style="background-image:url(assets/img/background/Slide5.png)"></div> \
				</section>';
				
				p_tagSection.after(strTagSection);
				
				var tagSection = $('#'+strIDSection);
				
				tagSection.addClass("slide fade-6 kenBurns selected active animate");
				tagSection.attr("data-title" , strTitulo);
				tagSection.css("color" , "#e1be5a");
				
				//tagSection.add("div")
				
			}
			
			
		}	
		
		
}

function teste()
{
	var strTagNova = '<section class="slide fade-6 kenBurns selected active animate" data-title="Videos da aula 3" style="color:#e1be5a"> \
  <div class="content"> \
    <div class="container"> \
      <div class="wrap"> \
        <div class="fix-10-12 toCenter margin-bottom-5">  \
          <h1 class="hero bold ae-1 fromLeft huge done"> VÍDEOS DA AULA 3</h1> \
        </div> \
        <div class="fix-12-12"> \
          <ul class="grid grid-77 later equal left"> \
            <li class="col-3-12 ae-2 fromLeft done" data-slider-id="videos"> \
              <a href="videos/aula-3/TD_LuisHumbertoDeMelloVillwock_Aula3_Parte1.mp4" class="box-77 ae-4 box-block ativo done"> \
              <!-- <a href="videos/video.mp4" class="box-77 ae-4 box-block "> --> \
                <div class="thumbnail-77"> \
                  <img src="assets/img/card-aula-3-1.jpg" alt="Picture" class="wide"> \
                </div> \
                <div class="details-77 equalElement" style="height: 116.143px;"> \
                  <div class="table wide"> \
                    <div class="cell"> \
                      <div class="button gold wide crop margin-top-3">Assistir Parte 1</div> \
                      <br> \
                    </div> \
                  </div> \
                </div> \
              </a> \
		  </li> \ </ul> \
        </div> \         <p class="small margin-1 toCenter"><a target="_blank" rel="noopener noreferrer" href="assets/docs/apoio_3.pdf" style="color:#e1be5a"><u>Clique aqui</u></a> para baixar a apresentação \
          de apoio utilizada pelo professor nesta aula.</p> \
      </div> \
    </div> \
  </div> \
  <div class="background" style="background-image:url(assets/img/background/Slide5.png)"></div> \
</section> '
}



function openIframeVideo(videoData){
    var videoPath = videoData.targetVideo;
    var videoPoster = videoData.poster;
    var indexSliderAtual = videoData.indexSlider;
    var indexVideoSlider = videoData.indexVideoSlider;

    $.featherlight("#videoPlayerWrapper", {
        variant: "modal-video-player",
        closeOnClick: false,
        closeOnEsc: false,
        afterOpen: function(){
            //setVideoPlayerMarkup();
            $("#videoPlayerWrapper").appendTo(".featherlight-content");
        },
        afterContent: function(){
            var videoPlayer = document.getElementById("videoPlayer");
			controleVideos(videoData);
                       
        },
        afterClose: function(){
            setVideoPlayerMarkup();
        }
    });
}

function closeAllModalInstances(){
    $.featherlight.close();
}

function setVideoPlayerMarkup(){
    var videoPlayerMarkup =  "";
        videoPlayerMarkup = '<div class="video-player-wrapper" id="videoPlayerWrapper">';
        videoPlayerMarkup += '<div class="video-player" id="videoPlayer">';
        videoPlayerMarkup += '</div>';
        videoPlayerMarkup += '</div>';              
        $(videoPlayerMarkup).appendTo("body");
}

$(document).ready(function()
{
	//iniciarTelaControleSlides();
})