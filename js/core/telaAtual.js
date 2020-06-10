function telaAtual(p_controle , p_objItemAtual)
{
    this.controle = p_controle;
    this.Item = p_objItemAtual;
    this.telaFinalizada = this.Item.Finalizado();
    this.finalizarTela = finalizarTela;
    this.avancarTela = avancarTela;
    this.atualizarDadosTela = atualizarDadosTela;
    this.PrimeiraTela;
    this.UltimaTela;
    this.PrimeiraLicao;
    this.UltimaLicao;
    this.PrimeiroModulo;
    this.UltimoModulo;

    function finalizarTela()
    {
        this.controle.finalizarTela();
    }

    function avancarTela()
    {
        this.controle.Avancar();
    }

    function atualizarDadosTela()
    {
        this.telaFinalizada = this.Item.Finalizado();
    }
}