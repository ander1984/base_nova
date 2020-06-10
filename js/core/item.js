function item(p_strItem, p_id , p_idModulo , p_idLicao, p_nome, p_arrItens, p_tipo, p_comportamento, p_arquivo) 
{
		
        var ITEM_MODULO = "modulo";
        var ITEM_LICAO = "licao";
        var ITEM_TELA = "tela";

        this.Item = p_strItem;
        this.ID = p_id;
        this.Nome = p_nome;
        this.arrItens = p_arrItens;
        this.Tipo = p_tipo;
        this.Comportamento = p_comportamento;
        this.Arquivo = p_arquivo;
        this.complete;
        this.Finalizado = Finalizado;
        this.totalTelas = totalTelas;
        
        if(this.Item == ITEM_TELA)
        {
            this.idModulo = p_idModulo;
            this.idLicao = p_idLicao;
        }
        else if(this.Item == ITEM_LICAO)
        {
            this.idModulo = p_idLicao;
        }

        function totalTelas()
        {
            var intTotalTelas = 0;
            if (this.arrItens != null)
            {
                for(var i = 0; i < this.arrItens.length; i++ )
                {
                    intTotalTelas += this.arrItens[i].totalTelas();
                }
            }
            else
            {
                intTotalTelas = 1 
            }
            return intTotalTelas
        } 

        function Finalizado(p_bln)
        {
  
            if(p_bln != undefined)
            {
                if (this.arrItens != null)
                {
                    for (var i = 0; i < this.arrItens.length; i++ ) 
                    {
                        this.arrItens[i].Finalizado(p_bln);
                    }
                }
                this.complete = p_bln;
            }
            else
            {

                var blnResult = true;
                if  (this.arrItens != null)
                {
                    for (var i = 0; i < this.arrItens.length; i++ ) {
                        if (this.arrItens[i].Finalizado != true) {
                            blnResult = false;
                        }
                    }
                    this.complete = blnResult;
                } 
                else
                {
                    blnResult = this.complete;
                }

                return this.complete;


            }
      
        }


}

