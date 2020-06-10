var escopoConfiguracaoPlayer;
function configuracaoPlayer()
{
    var escopoControlePlayer;
    var strDiretorio = "vendors/jwplayer/";
    escopoConfiguracaoPlayer = this;
    escopoConfiguracaoPlayer.setURLCompleta  = setURLCompleta;
    escopoConfiguracaoPlayer.configurarPlayer = configurarPlayer
    escopoConfiguracaoPlayer.limparPlayer =  limparPlayer
    escopoConfiguracaoPlayer.init = init;
    escopoConfiguracaoPlayer.objConfig;

    var objPlayer = new Object();
    var strURLCompletaVideo = "";
    var strURLVideo = "";
    var streamingURL = "";
    var isStreaming = false;
    var strPlayList ="";
    var arrFormato = new Array();
    var downloadURL = "";

    function init(p_escopoControlePlayer)
    {
        escopoControlePlayer = p_escopoControlePlayer;

        isStreaming = escopoControlePlayer.configuracoes.streaming;
        strDiretorio = escopoControlePlayer.configuracoes.diretorio;
        arrFormato = escopoControlePlayer.configuracoes.formato;
        streamingURL = escopoControlePlayer.configuracoes.configStreaming.url;
        strPlayList = escopoControlePlayer.configuracoes.configStreaming.strPlayList;
        downloadURL = escopoControlePlayer.configuracoes.configDownload.url;

        try{
            if(is)
            {
                verificaVersao();
            } 
        }
        catch
        {
            head.load("is.min.js", function() 
            {
                verificaVersao();
            });
        }
    }


    function  verificaVersao()
    {
        escopoConfiguracaoPlayer.objConfig = new Object();
        var tempStrArquivoJS = "";
        var tempStrKey = "";

       
        if(is.ie(8))
        {
            tempStrArquivoJS = strDiretorio + "jwplayer-6.7.4/jwplayer.js";
            tempStrKey = "mTZGtG+/78Qooqp5vEJGdMk1OVS1aaDSQMjrxlTASHk=";
        }
        else if(is.ie(9))
        {
            tempStrArquivoJS = strDiretorio + "jwplayer-7.8.6/jwplayer.js";
            tempStrKey = "vIVdK0Vj+Z7gOrdH/GLp4SmrpAcEUGfYYJxqhODNFgo=";
        }
        else if(is.ie(10))
        {
            tempStrArquivoJS = strDiretorio + "jwplayer-7.8.6/jwplayer.js";
            tempStrKey = "vIVdK0Vj+Z7gOrdH/GLp4SmrpAcEUGfYYJxqhODNFgo=";
        }
        else
        {
            tempStrArquivoJS = strDiretorio + "jwplayer-8.1.8/jwplayer.js";
            tempStrKey = "HdCX+EBRmpwX5L+wcY05X4GBuFM/umawuYbCBrgr06mG2MwI";
        }

        escopoConfiguracaoPlayer.objConfig.arquivoJSPlayer =  tempStrArquivoJS;
        escopoConfiguracaoPlayer.objConfig.keyJWPlayer = tempStrKey;
        head.load( escopoConfiguracaoPlayer.objConfig.arquivoJSPlayer, function() 
		{                                                
            jwplayer.key = escopoConfiguracaoPlayer.objConfig.keyJWPlayer;
            $('body').trigger('playerConfigurado' , escopoConfiguracaoPlayer.objConfig);
        });

       
    }

    function limparPlayer(p_obj)
    {
        var strSeletorIdPlayer = p_obj.playerId;
       if(objPlayer[strSeletorIdPlayer])
        {
            //objPlayer[strSeletorIdPlayer].player.destroy();
            $("#"+strSeletorIdPlayer).empty();
        }
    }
             
    function setURLCompleta(p_strURLVideo)
    {
        
        var strNomeVideo = p_strURLVideo;

        var arrNomeVideo = strNomeVideo.split("/");

        if(arrNomeVideo.length)
        {
            for(var i = 0; i < arrNomeVideo.length; i++)
            {
                var strTemp = arrNomeVideo[i];
                for(var j = 0; j < arrFormato.length; j++)
                {
                    if(strTemp.indexOf(arrFormato[j]) != -1)
                    {
                        strNomeVideo = strTemp;
                        break;
                    }
                }
            }
        }

        if(isStreaming)
        {
            strURLCompletaVideo = streamingURL + strNomeVideo + strPlayList;
        }
        else
        {
            strURLCompletaVideo = downloadURL + strNomeVideo;
        }

        return strURLCompletaVideo;
    }

    function configurarPlayer(p_obj)
    {
        var objConfigPlayer = p_obj;
        //objConfigPlayer.tipo;
        //objConfigPlayer.strNomeVideo;
        var strURLCompleta =  objConfigPlayer.caminhoVideo;
        var strURLPoster =  objConfigPlayer.playerPoster;
        var strSeletorIdPlayer = objConfigPlayer.playerId;

        objPlayer[strSeletorIdPlayer] = new Object();


        var objData = new Object();
        objData.thisIFrame = $(this);
        objData.idBlocoPai = $(this).parents('.bloco').attr('id');
        objData.player =  objPlayer[strSeletorIdPlayer].player;
        objData.objConfigPlayer = objConfigPlayer;

        objPlayer[strSeletorIdPlayer].player = jwplayer(strSeletorIdPlayer).setup({
            file: strURLCompleta,
            image: strURLPoster,
            width: "100%",
            aspectratio: '16:9',
			minWidth: 790,
			skin: {
                    "name": "custom" 
                },     
            // repeat: $repeat,
            autostart: true,
        }); 

        var objPlayerAtual =  objPlayer[strSeletorIdPlayer].player;

     

        jwplayer(strSeletorIdPlayer).on("complete" , function()
        {
            objData.thisPlayerJS = $(this);
            escopoControlePlayer.completo(objData);
        });
        jwplayer(strSeletorIdPlayer).on("play" , function()
        {
            if (is.mobile() || is.tablet())
            {
                this.setFullscreen(true);
            }
            objData.thisPlayerJS = $(this);
            escopoControlePlayer.iniciado(objData);
        });
        jwplayer(strSeletorIdPlayer).on("pause" , function()
        {
            objData.thisPlayerJS = $(this);
            escopoControlePlayer.pausado(objData);
        });
        jwplayer(strSeletorIdPlayer).on("time" , function()
        {
            objData.thisPlayerJS = $(this);
            escopoControlePlayer.tempoAtualizado(objData);
        });

    }

}