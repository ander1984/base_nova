function offline()
{
    this.objControlePegaInfos;
    this.cookie;
    this.setCookie = setCookie;
    this.IniciarServico = IniciarServico;
    this.EncerraServico = EncerraServico;
    this.buscaInfosAPI = buscaInfosAPI;
    this.setStatusLicao = setStatusLicao;
    this.getStatusLicao = getStatusLicao;
    this.setDadosSecundarios = setDadosSecundarios;
    this.getDadosSecundarios = getDadosSecundarios;
    this.setLicaoLocalizacao = setLicaoLocalizacao;
    this.getLicaoLocalizacao = getLicaoLocalizacao;
    this.getNotaCorte = getNotaCorte;
    this.getNota = getNota;
    this.setNota = setNota;
    this.getNomeAluno = getNomeAluno;
    this.getAlunoID = getAlunoID;
    this.setTempoSessao = setTempoSessao;
    this.converteSegundosParaTempo = converteSegundosParaTempo;
    this.converteTempoParaSegundos = converteTempoParaSegundos;
    this.zerarTracking = zerarTracking;
    this.ComitarDados = ComitarDados;
	
    function IniciarServico()
    {
        buscaInfosAPI();

    }
    
    function zerarTracking()
    {
        /*var tempCookies = cookie;
        for(var strCookie in tempCookies)
         {
             $.removeCookie(strCookie);

         }*/
         var cookies = $.cookie();
         for(var strCookie in cookies) {
            $.removeCookie(strCookie);
         }

    }

    function setCookie(p_cookie)
    {
        cookie = p_cookie;
    }
    
    function EncerraServico()
    {
        top.close();
    }
    
    
    function buscaInfosAPI()
    {
        objControlePegaInfos = new Object();
        objControlePegaInfos['cmi.core.lesson_status'] = null;
        objControlePegaInfos['cmi.core.lesson_location'] = null;
        objControlePegaInfos['cmi.suspend_data'] = null;
        objControlePegaInfos['cmi.student_data.mastery_score'] = null;
        objControlePegaInfos['cmi.core.score.raw'] = null;
        objControlePegaInfos['cmi.core.student_name'] = null;
        objControlePegaInfos['cmi.core.student_id'] = null;
        
        for(var i in objControlePegaInfos) {
            objControlePegaInfos[i] = getDadosCookie(i);
            objControlePegaInfos[i] = (objControlePegaInfos[i] != undefined)  && (objControlePegaInfos[i] != "undefined")? objControlePegaInfos[i] : "";
        }
		
		
    }
    
    function setDadosCookie(p_name , p_value)
    {
       cookie(p_name , p_value);
    }
    
    function getDadosCookie(p_name)
    {
        return cookie(p_name);
    }
    
    
    
    function setStatusLicao(strStatus)
    {
        objControlePegaInfos['cmi.core.lesson_status'] = strStatus;
        setDadosCookie('cmi.core.lesson_status' , strStatus);
    }
    
    
    function getStatusLicao()
    {
        return objControlePegaInfos['cmi.core.lesson_status'];
    }
    
    function setDadosSecundarios(strDados)
    {
        objControlePegaInfos['cmi.suspend_data'] = strDados;
        setDadosCookie('cmi.suspend_data' , strDados);
    }
    
    
    function getDadosSecundarios()
    {
        return objControlePegaInfos['cmi.suspend_data'];
    }
    
    function setLicaoLocalizacao(strLocalizacao)
    {
        objControlePegaInfos['cmi.core.lesson_location'] = strLocalizacao;
        setDadosCookie('cmi.core.lesson_location' , strLocalizacao);
    }
    
    
    function getLicaoLocalizacao()
    {
        return objControlePegaInfos['cmi.core.lesson_location'];
    }
    
    
    function getNotaCorte()
    {
        return parseInt(objControlePegaInfos['cmi.student_data.mastery_score']);
    }
    
    
    function getNota()
    {
        var intReturn = parseInt(objControlePegaInfos['cmi.core.score.raw']);
        if (isNaN(intReturn) || intReturn == undefined || intReturn == "") {
            intReturn = null;
        }
        return intReturn;
    }
    
    function setNota(intNota)
    {
        if (!isNaN(intNota)) {
            objControlePegaInfos['cmi.core.score.raw'] = String(int(intNota));
            setDadosCookie('cmi.core.score.raw' , int(intNota))
        }   
    }
    
    
    function getNomeAluno()
    {
        return objControlePegaInfos['cmi.core.student_name'];
    }
    
    
    function getAlunoID()
    {
        return objControlePegaInfos['cmi.core.student_id'];
    }
    
    function setTempoSessao(strTempoFormatado)
    {
        objControlePegaInfos['cmi.core.session_time'] = strTempoFormatado;
        setDadosCookie('cmi.core.score.raw' , strTempoFormatado)
    }
    
    
    function converteSegundosParaTempo(intTempo)
    {
        var sec = (intTempo % 60);
    
        intTempo -= sec;
        var tmp = (intTempo % 3600);
        intTempo -= tmp;
        
        sec = Math.round(sec*100)/100;
        
        var strSec = new String(sec);
        
        if ((intTempo % 3600) != 0 ){
            var hour = 0;
        } else {
            var hour = (intTempo / 3600);
        }
            
        if ( (tmp % 60) != 0 ) {
            var min = 0;
        } else {
            var min = (tmp / 60);
        }
    
        if (String(hour).length < 2) {
            hour = "0" + hour;
        }
            
        if (String(min).length < 2) {
            min = "0" + min;
        }
    
        if (String(strSec.split(".")[0]).length < 2) {
            strSec = "0" + strSec;
        }
        
        var rtnVal = hour+":"+min+":"+strSec;
        
        return rtnVal;
    }
    
    function converteTempoParaSegundos()
    {
        return 0;
    }
    
    function ComitarDados()
    {
    
    }
}


