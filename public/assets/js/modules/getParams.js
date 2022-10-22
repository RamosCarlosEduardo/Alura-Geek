export var params = window.location.search.substring(1).split('&');
export var paramArray = {};

	for(var i=0; i<params.length; i++) {
    	var param = params[i].split('=');
    	paramArray[param[0]] = param[1];
	}
