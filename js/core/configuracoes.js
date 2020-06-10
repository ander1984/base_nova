var configuracoes = {
    iniciar:{
        scoInicial: "M01L01",
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
                offline: "",
                online: "",
            },
            bloquearControle:{
                ajuda: "",
                menu: "",
                tela: ""
            }
        },
        info: {
            titulosVisivel: {
                tela: "licao,tela",
                menu: "licao"
            }
        }
    },

	player:{
        nome: "jwplayer",
		diretorio: "js/vendors/jwplayer/",
        streaming: true,
		formato: ["mp4","webm","wmv","m4a","mp3"],
        configStreaming: {
            url: "https://stream.ciatech.com.br/vod_cia/mp4:default/power_sapiencia/"+estrutura.IdCurso+"/videos/",
            strPlayList: "/playlist.m3u8"
        },
        configDownload: {
            url: "video/",
            strPlayList: ""
        }

        
    }

};


