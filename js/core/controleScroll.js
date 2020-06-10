function controleScroll()
{
    var isFinalizada = false;
    var isFinalScroll = false;
    var strElementoConteudo = "#"+"conteudoCurso";
    var elementConteudoScroll = $(strElementoConteudo);
    var intInicioScroll = 0;
    var isPrimeiraVez = false;
    var objInfoScroll = new Object();

    var wow = new WOW({scrollContainer: strElementoConteudo});
	wow.init();	
   elementConteudoScroll.on("scroll" , conteudoScroll);

  /* $("body").on("scrollAcionado" , testando);
   function testando(ev , p_obj)
    {
        console.log("objInfoScroll " , p_obj)
    }*/

    function conteudoScroll()
    {
        var diff = 400;

        var posicaoScroll = elementConteudoScroll.scrollTop();
    
        if(!isPrimeiraVez)
        {
            isPrimeiraVez = true;
            intInicioScroll = posicaoScroll;
        }

        var windowHeight = elementConteudoScroll.height();

        var documentHeight = elementConteudoScroll[0].scrollHeight;
        
        var calculoPosicaoScroll = (documentHeight - windowHeight - diff);

        isFinalScroll = (((documentHeight - windowHeight - diff) < posicaoScroll) && (posicaoScroll > 0));
        isInicioScroll = (posicaoScroll == intInicioScroll); 

        if(isFinalScroll)
        {
            setFinalPagina();
        }
        if(isInicioScroll)
        {
            inicioPagina();
        }

        objInfoScroll.isInicioScroll = isInicioScroll;
        objInfoScroll.inicioScroll = intInicioScroll;
        objInfoScroll.diferencaPagina = diff;
        objInfoScroll.posicaoScroll = posicaoScroll;
        objInfoScroll.tamanhoPagina = windowHeight;
        objInfoScroll.tamanhoDocumento = documentHeight;
        objInfoScroll.isFinalScroll = isFinalScroll;
        objInfoScroll.isFinalizada = isFinalizada;
        objInfoScroll.calculoPosicaoScroll = calculoPosicaoScroll;
        $("body").trigger("scrollAcionado" , objInfoScroll);

    }

    function inicioPagina()
    {
        isFinalizada = true;
        $("body").trigger("inicioPagina" , objInfoScroll);
    }

    function setFinalPagina()
    {
        isFinalizada = true;
        $("body").trigger("finalPagina" , objInfoScroll);
    }

}


