var controle;
var objConfiguracoes;
var objEstrutura;
var TelaAtual;
var intTotalTelas;
var intTelaAtual;
$(document).ready(function()
{
    setEventos();
    iniciar();
});

function iniciar()
{
    head.load(["js/core/controle.js"], function() 
    {
        head.load(["js/core/item.js",
        "js/core/estrutura.js",
		"js/core/controlePlayer.js"],
        function() 
        {
            controle = new controle();
            controle.initControle();
        });
    });
}

function setEventos()
{
    $('body').on('controleIniciado',   controleIniciado );
    $('body').on('cursoIniciado',   cursoIniciado );
    $('body').on('telaCarregada',   telaCarregada );
    $('body').on('telaIniciada',   telaIniciada );
    $('body').on('telaFinalizada',   telaFinalizada );
    $('body').on("AvancarAcionado",   avancarAcionado );
    $('body').on("voltarAcionado",   voltarAcionado );
    $('body').on("moduloFinalizado",   moduloFinalizado );
    $('body').on("licaoFinalizada",   licaoFinalizada );
    $('body').on("cursoFinalizado",   cursoFinalizado );
    $('body').on("menuAcessado",   menuAcessado );
    $('body').on("ajudaAcessada",   ajudaAcessada );
}

function atualizaContador()
{
    
}


function controleIniciado()
{
    
   // console.log('controleIniciado')
}


function cursoIniciado()
{

}

function telaCarregada()
{
   // console.log(":::::::::::::::::: telaCarregada :::::::::::::::")
   
    TelaAtual = controle.TelaAtual;
	head.load(["js/controle/index_tela.js"] , function()
	{
		iniciarTelaControleSlides();
		
	})
	
    //setTimeout(forcarFinalizarTela , 3000);
    

}


function forcarFinalizarTela()
{
   TelaAtual.finalizarTela();
}

function telaIniciada()
{
  
   $("#blocoTela" + TelaAtual.Item.ID).show();
   $("#indexIndicadorCarregamento").hide();
}

function telaFinalizada()
{
   // console.log(" TelaAtual " ,  TelaAtual )
    //console.log( "TELA ESTA FIANLIZADA? " , TelaAtual.telaFinalizada)
    //console.log('telaFinalizada')
    //console.log("getPorcentagemExecucao: " , controle.getPorcentagemExecucao())


    if(controle.intTelaAtual == 2 && controle.intLicaoAtual == 1)
    {
       
    }
    if(controle.intTelaAtual == 3 && controle.intLicaoAtual == 1)
    {
       
    }

}


function avancarAcionado()
{
    //console.log('avancarAcionado')
}

function voltarAcionado()
{
    //console.log('voltarAcionado')
}

function moduloFinalizado()
{
    //console.log('moduloFinalizado')
}

function licaoFinalizada()
{
    //console.log('licaoFinalizada')
}

function cursoFinalizado()
{
    //console.log('cursoFinalizado')
}

function menuAcessado()
{
    //console.log('menuAcessado')
}

function ajudaAcessada()
{
    //console.log('ajudaAcessada')
}

 
