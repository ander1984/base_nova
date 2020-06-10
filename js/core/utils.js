var scopeUtils;
function utils()
{
    scopeUtils = this;
    scopeUtils.transformaPrimeiroCaracterMaiusculo = transformaPrimeiroCaracterMaiusculo;
    scopeUtils.Format = Format;
    scopeUtils.getParameterByName = getParameterByName;
    function transformaPrimeiroCaracterMaiusculo(p_str)
    {
        var primeiroCaracter = p_str.charAt(0);
        var primeiroCaracterMaiusculo = primeiroCaracter.toUpperCase();
        var strSaida =  p_str.replace(primeiroCaracter , primeiroCaracterMaiusculo);
        return strSaida;
    }

	function Format(p_int)
	{
		var strOut = ((p_int <= 9) ? "0"+String(p_int) :String(p_int));
		return strOut;
    }
    
	function getParameterByName(nomeParametro, url) {
		if (!url) url = window.location.href;
		nomeParametro = nomeParametro.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + nomeParametro + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}


}