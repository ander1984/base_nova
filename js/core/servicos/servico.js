function servico()
{
    var scopeServico = this;
    head.load("js/core/servicos/SCORM12.js", 
    "js/core/servicos/offline.js",
    "js/vendors/jquery.cookie/jquery.cookie.js",
    "js/core/servicos/apiwrapper.js",
    "js/core/servicos/scofunctions.js",
    function() 
    {
        var servicoSCORM = new SCORM12();
        var servicoOffline = new offline();

        if(servicoSCORM.getAPISCORM())
        {
            scopeServico.servicoAtual = servicoSCORM;
            scopeServico.isSCORM = true;
        }
        else
        {
			
            scopeServico.servicoAtual = servicoOffline;
			scopeServico.isSCORM = false;
            scopeServico.servicoAtual.setCookie($.cookie);
        }

        scopeServico.IniciarServico = scopeServico.servicoAtual.IniciarServico;
        scopeServico.EncerraServico = scopeServico.servicoAtual.EncerraServico;
        scopeServico.buscaInfosAPI = scopeServico.servicoAtual.buscaInfosAPI;
        scopeServico.setStatusLicao = scopeServico.servicoAtual.setStatusLicao;
        scopeServico.getStatusLicao = scopeServico.servicoAtual.getStatusLicao;
        scopeServico.setDadosSecundarios = scopeServico.servicoAtual.setDadosSecundarios;
        scopeServico.getDadosSecundarios = scopeServico.servicoAtual.getDadosSecundarios;
        scopeServico.setLicaoLocalizacao = scopeServico.servicoAtual.setLicaoLocalizacao;
        scopeServico.getLicaoLocalizacao = scopeServico.servicoAtual.getLicaoLocalizacao;
        scopeServico.getNotaCorte = scopeServico.servicoAtual.getNotaCorte;
        scopeServico.getNota = scopeServico.servicoAtual.getNota;
        scopeServico.setNota = scopeServico.servicoAtual.setNota;
        scopeServico.getNomeAluno = scopeServico.servicoAtual.getNomeAluno;
        scopeServico.getAlunoID = scopeServico.servicoAtual.getAlunoID;
        scopeServico.setTempoSessao = scopeServico.servicoAtual.setTempoSessao;
        scopeServico.converteSegundosParaTempo = scopeServico.servicoAtual.converteSegundosParaTempo;
        scopeServico.converteTempoParaSegundos = scopeServico.servicoAtual.converteTempoParaSegundos;
        scopeServico.ComitarDados = scopeServico.servicoAtual.ComitarDados;
        scopeServico.zerarTracking = scopeServico.servicoAtual.zerarTracking;
       
        scopeServico.IniciarServico();
        
        $('body').trigger('servicoIniciado', {servicoAtual:scopeServico.servicoAtual, isSCORM: scopeServico.isSCORM});

    });
    
    function getServicoAtual()
    {
        return scopeServico.servicoAtual;
    }
}

