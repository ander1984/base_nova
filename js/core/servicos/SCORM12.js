function SCORM12()
{
    this.objControlePegaInfos;
    this.getAPISCORM                =   getAPISCORM;
    this.IniciarServico             =   IniciarServico;
    this.EncerraServico             =   EncerraServico;
    this.buscaInfosAPI              =   buscaInfosAPI;
    this.setStatusLicao             =   setStatusLicao;
    this.getStatusLicao             =   getStatusLicao;
    this.setDadosSecundarios        =   setDadosSecundarios;
    this.getDadosSecundarios        =   getDadosSecundarios;
    this.setLicaoLocalizacao        =   setLicaoLocalizacao;
    this.getLicaoLocalizacao        =   getLicaoLocalizacao;
    this.getNotaCorte               =   getNotaCorte;
    this.getNota                    =   getNota;
    this.setNota                    =   setNota;
    this.getNomeAluno               =   getNomeAluno;
    this.getAlunoID                 =   getAlunoID;
    this.setTempoSessao             =   setTempoSessao;
    this.converteSegundosParaTempo  =   converteSegundosParaTempo;
    this.converteTempoParaSegundos  =   converteTempoParaSegundos;
    this.ComitarDados               =   ComitarDados;

    var LESSON_LOCATION             =   'cmi.core.lesson_location';
    var LESSON_STATUS               =   'cmi.core.lesson_status';
    var SUSPEND_DATA                =   'cmi.suspend_data';
    var MASTERY_SCORE               =   'cmi.student_data.mastery_score';
    var SCORE_RAW                   =   'cmi.core.score.raw';
    var STUDENT_NAME                =   'cmi.core.student_name';
    var STUDENT_ID                  =   'cmi.core.student_id';
    var SESSION_TIME                =   'cmi.core.session_time';

    function getAPISCORM()
    {
        var isSCORM = loadPage();
        return isSCORM;
    }
    
    function IniciarServico()
    {
        buscaInfosAPI();
    }
    
    
    function EncerraServico()
    {
        doEncerra();
    }
    
    
    function buscaInfosAPI()
    {

        objControlePegaInfos = new Object();
        objControlePegaInfos[LESSON_STATUS]     =   null;
        objControlePegaInfos[LESSON_LOCATION]   =   null;
        objControlePegaInfos[SUSPEND_DATA]      =   null;
        objControlePegaInfos[MASTERY_SCORE]     =   null;
        objControlePegaInfos[SCORE_RAW]         =   null;
        objControlePegaInfos[STUDENT_NAME]      =   null;
        objControlePegaInfos[STUDENT_ID]        =   null;
        
        for(var i in objControlePegaInfos) {
           
            objControlePegaInfos[i] =  getDadosPlataforma(i);
        }
    }
    
    function zerarTracking()
    {
        setDadosSecundarios("");
        setLicaoLocalizacao("");
        var intTempNota = getScore();
        if(!isNaN(intTempNota))
        {
            SetScore(0);
        }
       
    }
    
    function setStatusLicao(strStatus)
    {
        objControlePegaInfos[LESSON_STATUS] = strStatus;
        setDadosPlataforma(LESSON_STATUS , strStatus);
    }
    
    
    function getStatusLicao()
    {
        return objControlePegaInfos[LESSON_STATUS];
    }
    
    function setDadosSecundarios(strDados)
    {
        objControlePegaInfos[SUSPEND_DATA] = strDados;
        setDadosPlataforma(SUSPEND_DATA , strDados);
    }
    
    
    function getDadosSecundarios()
    {
        return objControlePegaInfos[SUSPEND_DATA];
    }
    
    function setLicaoLocalizacao(strLocalizacao)
    {
        objControlePegaInfos[LESSON_LOCATION] = strLocalizacao;
        setDadosPlataforma(LESSON_LOCATION , strLocalizacao);
    }
    
    function setDadosPlataforma(p_name , p_value)
    {

        if(p_name == LESSON_LOCATION)
        {
            doLocation( p_value )
        }
        else if(p_name == SUSPEND_DATA)
        {
            SetSuspendData(p_value)
        }
        else if(p_name == SCORE_RAW)
        {
            SetScore(p_value);

        }
        else if(p_name == LESSON_STATUS)
        {
            SetStatus(p_value)
        }
        else
        {
            doLMSSetValue(p_name , p_value);
        }
    }
    
    function getDadosPlataforma(p_name)
    {
        var value;
        if(p_name == LESSON_LOCATION)
        {
              value = GetLocation()
        }
        else if(p_name == SUSPEND_DATA)
        {
            value = GetSuspendData();
        }
        else if(p_name == SCORE_RAW)
        {
            value =  GetScore();

        }
        else if(p_name == LESSON_STATUS)
        {
            value =  GetStatus();
        }
        else
        {
            value =  doLMSGetValue(p_name);
        }
        return value;
        
    }
    
    function getLicaoLocalizacao()
    {
        return objControlePegaInfos[LESSON_LOCATION];
    }
    
    
    function getNotaCorte()
    {
        return parseInt(objControlePegaInfos[MASTERY_SCORE]);
    }
    
    
    function getNota()
    {
        var intReturn = parseInt(objControlePegaInfos[SCORE_RAW]);
        if (isNaN(intReturn) || intReturn == undefined || intReturn == "") {
            intReturn = null;
        }
        return intReturn;
    }
    
    function setNota(intNota)
    {
        if (!isNaN(intNota)) {
            objControlePegaInfos[SCORE_RAW] = String(int(intNota));
            setDadosPlataforma(SCORE_RAW , int(intNota))
        }   
    }
    
    
    function getNomeAluno()
    {
        return objControlePegaInfos[STUDENT_NAME];
    }
    
    
    function getAlunoID()
    {
        return objControlePegaInfos[STUDENT_ID];
    }
    
    function setTempoSessao(strTempoFormatado)
    {
        objControlePegaInfos[SESSION_TIME] = strTempoFormatado;
        setDadosPlataforma(SESSION_TIME , strTempoFormatado)
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
        Commit();
    }

}

