var escopoControlePlayer;
function controlePlayer(p_configuracoes , p_eventosPlayer)
{

    var NOME_TIPO = "jwplayer";

    escopoControlePlayer = this;

    escopoControlePlayer.carregarPlayer         =   carregarPlayer;
    escopoControlePlayer.completo               =   completo;
    escopoControlePlayer.tempoAtualizado        =   tempoAtualizado;
    escopoControlePlayer.iniciado               =   iniciado;
    escopoControlePlayer.pausado                =   pausado;
    //escopoControlePlayer.tempoTotal           =   tempoTotal;
    escopoControlePlayer.erro                   =   erro;

    escopoControlePlayer.PLAYER_PADRAO          =   "padrao";
    escopoControlePlayer.PLAYER_ATUAL           =   "jwplayer";

    escopoControlePlayer.isConfigurado          =   false;

    if(p_configuracoes)
    {
        escopoControlePlayer.configuracoes      = p_configuracoes;
    }
    else
    {
        escopoControlePlayer.configuracoes.nome             = "padrao";
        escopoControlePlayer.configuracoes.diretorio        = "padrao";
        escopoControlePlayer.configuracoes.streaming        = "padrao";
        escopoControlePlayer.configuracoes.configStreaming  = new Object();
        escopoControlePlayer.configuracoes.configDownload   = new Object();
        escopoControlePlayer.configuracoes.configStreaming.url = "";
        escopoControlePlayer.configuracoes.configStreaming.strPlayList = "";
        escopoControlePlayer.configuracoes.configDownload.url = "videos/";
        escopoControlePlayer.configuracoes.configDownload.strPlayList = "";
    }

    

    escopoControlePlayer.PLAYER_ATUAL = escopoControlePlayer.configuracoes.nome;

    escopoControlePlayer.arrObjPlayers = new Array();
    videosVisitados = [];

    escopoControlePlayer.escutaEvento = p_eventosPlayer;

    /*$('body').on('playerCompleto', function(event ,  data)
    {
        console.log(data);
        
        completo(data);

    });

    $('body').on('playerTempoCorrendo', function(event ,  data)
    {
        tempoAtualizado(data);

    });

    $('body').on('playerIniciado', function(event ,  data)
    {
        iniciado(data);

    });

    $('body').on('playerPausado', function(event ,  data)
    {
        pausado(data);

    });

    $('body').on('erroPlayer', function(event ,  data)
    {
        erro(data);

    });*/
    
    $('body').on('playerConfigurado' , function(event , data)
    {
        escopoControlePlayer.isConfigurado = true;
        

    });


    function carregarPlayer()
    {
        var strURLArquivosJS = "";
        if( escopoControlePlayer.PLAYER_ATUAL ==  escopoControlePlayer.PLAYER_PADRAO)
        {
            strURLArquivosJS = "js/core/configuracaoPlayer.js";
        }
        else if (escopoControlePlayer.PLAYER_ATUAL == "jwplayer")
        {
            strURLArquivosJS = "js/core/configuracaoJWPlayer.js";
        }
        else if (escopoControlePlayer.PLAYER_ATUAL == "vimeo")
        {
            strURLArquivosJS = "js/core/configuracaoVimeoPlayer.js";
        }
        else if(escopoControlePlayer.PLAYER_ATUAL == "atena")
        {

        }

       // strURLArquivosJS = "js/configuracaoPlayer.js";
		head.load(strURLArquivosJS, function() 
		{                       
                        
            escopoControlePlayer.playerConfigurado = new configuracaoPlayer();
            escopoControlePlayer.playerConfigurado.init(escopoControlePlayer);
        });

        //$('body').trigger('playerConfigurado');  
    }

    function completo(p_oj)
    {
        if(escopoControlePlayer.escutaEvento)
        {
            escopoControlePlayer.escutaEvento("complete" , p_oj);
        }
        $('body').trigger('playerCompleto' , p_oj);
 
    }

    function tempoAtualizado(p_oj)
    {
       
        if(escopoControlePlayer.escutaEvento)
        {
            escopoControlePlayer.escutaEvento("time" , p_oj);
        }
        $('body').trigger('playerTempoCorrendo' , p_oj);
    }

    function iniciado(p_oj)
    {
        if(escopoControlePlayer.escutaEvento)
        {
            escopoControlePlayer.escutaEvento("play" , p_oj);
        }
        $('body').trigger('playerIniciado' , p_oj);
       
    }

    function pausado(p_oj)
    {
        if(escopoControlePlayer.escutaEvento)
        {
            escopoControlePlayer.escutaEvento("pause" , p_oj);
        }
        $('body').trigger('playerPausado' , p_oj);
    }

    function erro(p_oj)
    {
        if(escopoControlePlayer.escutaEvento)
        {
            escopoControlePlayer.escutaEvento("erro" , p_oj);
        }
        $('body').trigger('playerErro' , p_oj);
    }

    carregarPlayer();

}

function limparVideos(p_prop)
{
    var objConfigPlayer = new Object();

    if(p_prop)
    {
        objConfigPlayer.playerId        =   p_prop.seletor;
    }
   escopoControlePlayer.playerConfigurado.limparPlayer(objConfigPlayer);
}

function controleVideos(p_prop)
{
    
    if(!escopoControlePlayer.isConfigurado)
    {
       setTimeout( function(){controleVideos(p_prop)} , 500);
       return;
    }

    var objConfigPlayer = new Object();

    var strSeletorIndex = "#indexAreaCarregamento";
    var strSeletorPagina = ".pagina";
    var strSeletorVideoPlayer = ".video-player";

    if(p_prop)
    {

        objConfigPlayer.tipo = "video";
        objConfigPlayer.strNomeVideo    =   p_prop.file;
        objConfigPlayer.caminhoVideo    =   escopoControlePlayer.playerConfigurado.setURLCompleta(p_prop.file);
        objConfigPlayer.playerPoster    =   p_prop.image;
        objConfigPlayer.playerId        =   p_prop.seletor;
        objConfigPlayer.autoStart       =   p_prop.autostart;
        objConfigPlayer.aspectratio     =   p_prop.aspectratio;
        objConfigPlayer.width           =   p_prop.width;
        objConfigPlayer.playerIndex     =   $(this).data("id");
        // objConfigPlayer.idBlocoParent   =   $(this).parents(".bloco").attr("id");
        objConfigPlayer.idBlocoParent   =   p_prop.idBloco;
        
        if(p_prop.escutaEvento)
        {
            escopoControlePlayer.escutaEvento = p_prop.escutaEvento;
        }
        escopoControlePlayer.playerConfigurado.configurarPlayer(objConfigPlayer);
    }
    else if ($(strSeletorIndex).find(strSeletorPagina).find(strSeletorVideoPlayer).length)
    {
        $(strSeletorIndex).find(strSeletorPagina).find(strSeletorVideoPlayer).each(function(i) 
        {

            objConfigPlayer.tipo = "video";
            objConfigPlayer.strNomeVideo    =  String($(this).data("src"));
            objConfigPlayer.caminhoVideo    =   escopoControlePlayer.playerConfigurado.setURLCompleta(objConfigPlayer.strNomeVideo);
            objConfigPlayer.playerPoster    =   $(this).data("poster");
            $(this).attr("id", "playerVideo-" + (i + 1));
            $(this).attr("data-id", i);
            objConfigPlayer.playerId        =   $(this).attr("id");
            objConfigPlayer.playerIndex     =   i;
            objConfigPlayer.idBlocoParent   =   $(this).parents(".bloco").attr("id");

            if(objConfigPlayer.escutaEvento)
            {
                escopoControlePlayer.escutaEvento = objConfigPlayer.escutaEvento;
            }

            escopoControlePlayer.arrObjPlayers.push(objConfigPlayer);
            escopoControlePlayer.playerConfigurado.configurarPlayer(objConfigPlayer);
        });
    }


}


function controleAudios()
{
    escopoControlePlayer.playerConfigurado.configurarPlayer();
}