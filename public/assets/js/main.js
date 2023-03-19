import {paramArray} from './modules/getParams.js';
import {checkAuthentication} from './modules/authentication.js'
import {routeHome, createHomeBanner, createHomeGrid, createHomeCards} from './modules/routeHome.js'
import './modules/search.js'
import {getDb} from './modules/fetch.js'
import {routeLogin, createLoginForm} from './modules/routeLogin.js'
import {routProduct, createProductInfos, fetchSimilares, createSimilaresGrid, createSimilaresCards} from './modules/routeProduct.js'
import {routeAddProduct, createAddProductForm, desformataCurrency, adicionarProduto, adicionarCategoria} from './modules/routeAddProduct.js'
import {routeAllproducts} from './modules/routeAllProducts.js'

const urlBase = "https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/"

const defineRota = async (page) => {
	const auth = checkAuthentication()
	switch (page) {
		case "login":
		routeLogin();
		break;

		case "loginerror":
		// routeLoginError();
		break;

		case "allproducts":	
		routeAllproducts(auth);
		break

		case "addproduct":
		if (auth){
			routeAddProduct();		
		} else {
			alert('Apenas usuários logados podem acessar essa página')
			window.location.href = `${urlBase}?page=login`
		}
		break

		case "product":
		routProduct();
		break

		default: 
		routeHome();
	}
}

document.addEventListener("DOMContentLoaded", () => defineRota(paramArray.page));

