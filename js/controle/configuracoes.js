var configuracoes = {
    iniciar:{
        scoInicial: "M01",
        recuperarPosicao: true,
        confirmaRetorno: false,
        confirmaSaida:false,
        estadoFinal: "completed",
        navegacaoTravada: true,
        tempoTimeout: 0

    },
    interface: {
        controles: {//"avancar,voltar,menu,ajuda"
            controlesDisponiveis:{
                offline: "menu,avancar",
                online: "menu",
            },
            bloquearControle:{
                ajuda: "voltar,avancar",
                menu: "avancar,voltar,menu",
                tela: "avancar"
            }
        },
        info: {
            titulosVisivel: {
                tela: "licao,tela",
                menu: "licao"
            }
        }
    },

    /*player:{
        nome: "vimeo",
		diretorio: "vendors/vimeo/",
        streaming: true,
		formato: ["mp4","webm","wmv","m4a","mp3"],
        configStreaming: {
            url: "https://player.vimeo.com/video/",
            strPlayList: ""
        },
        configDownload: {
            url: "data/assets/",
            strPlayList: ""
        }

        
    }*/ 
	player:{
        nome: "jwplayer",
		diretorio: "js/vendors/jwplayer/",
        streaming: false,
		formato: ["mp4","webm","wmv","m4a","mp3"],
        configStreaming: {
            url: "https://stream.ciatech.com.br/vod_cia/mp4:default/power_sapiencia/psp062/videos/aula-1/",
            strPlayList: "/playlist.m3u8"
        },
        configDownload: {
            url: "video/",
            strPlayList: ""
        }

        
    }

};


