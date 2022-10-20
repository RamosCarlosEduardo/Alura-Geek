// export const getParams = () => {
export var params = window.location.search.substring(1).split('&');
	
	//Criar objeto que vai conter os parametros
export var paramArray = {};
	
	//Passar por todos os parametros
	for(var i=0; i<params.length; i++) {
    
    //Dividir os parametros chave e valor
    	var param = params[i].split('=');
    
    //Adicionar ao objeto criado antes
    	paramArray[param[0]] = param[1];
	}
//}