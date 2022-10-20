export let dbEmbed = [];
export const mainElement = document.querySelector('main')
export const urlBase = 'https://loja-alura-geek.herokuapp.com/'
let dbPag = [];
let productNotFound = false
export let currentUrl = `${urlBase}produtos?_page=1&_limit=10`

import {paramArray} from './modules/getParams.js';
import {checkAuthentication} from './modules/authentication.js'
import {routeHome, createHomeBanner, createHomeGrid, createHomeCards} from './modules/home.js'
import './modules/search.js'
import {getDb} from './modules/fetch.js'
import {routeLogin, createLoginForm} from './modules/login.js'
import {routProduct, createProductInfos, fetchSimilares, createSimilaresGrid, createSimilaresCards} from './modules/product.js'
import {routeAddProduct, createAddProductForm, desformataCurrency, adicionarProduto, adicionarCategoria} from './modules/addProduct.js'

const defineRota = async (page) => {
	const auth = checkAuthentication()
	switch (page) {
		case "login":
		routeLogin();
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
		dbEmbed = await getDb(`${urlBase}categorias?_embed=produtos`);
		routeHome();
	}
}

document.addEventListener("DOMContentLoaded", () => defineRota(paramArray.page));

// ############### All products ###############

function routeAllproducts(auth) {
	createPaginationButtons()
	fetchProducts(auth)
}

async function fetchProducts(auth) {
	let productsHandler = document.getElementById('allproducts-handler')
	
	if (productsHandler) {productsHandler.remove()}

		if (paramArray.q) {currentUrl = currentUrl + `&q=${paramArray.q}`}

			dbPag = await getDb(currentUrl)

		createAllProductsGrid(auth)
	}


	function createAllProductsGrid(auth) {
		let paginateDiv = document.querySelector('.paginate')

		let newSection = document.createElement("section")
		newSection.classList.add("ver-tudo")
		newSection.setAttribute('id', 'allproducts-handler')
		mainElement.insertBefore(newSection, paginateDiv)

		let sectionTitle = document.createElement("h2")
		sectionTitle.classList.add("ver-tudo__title")
		sectionTitle.innerHTML = "Todos os produtos"
		newSection.appendChild(sectionTitle)

		let addProduct = document.createElement("a")
		addProduct.classList.add("button", "button--bg", "button--p", "button--addproduct")
		addProduct.innerHTML = "Adicionar produto"
		addProduct.href = "?page=addproduct"
		newSection.appendChild(addProduct)
		if (auth) {
			addProduct.style.visibility = 'visible'
		} else {
			addProduct.style.visibility = 'hidden'
		}

		if (productNotFound === false) {
			createAllProductsCards(newSection);
		} else {
			let newParagraph = document.createElement("p")
			newParagraph.classList.add("product-not-found")
			newParagraph.innerText = "Produto não encontrado."
			mainElement.insertBefore(newParagraph, paginateDiv)

			paginateDiv.style.display = 'none'
		}
	}

	function createAllProductsCards(section) {
		dbPag.forEach(produto => {
			let divCard = document.createElement("div")
			divCard.classList.add("card")

			let cardImg = document.createElement("img")
			cardImg.classList.add("card__img")
			cardImg.setAttribute("alt", `${produto.alt}`)
			cardImg.setAttribute("src", `${produto.img}`)
			divCard.appendChild(cardImg)


			let cardTitle = document.createElement("h3")
			cardTitle.classList.add("card__titulo")
			cardTitle.innerHTML = `${produto.nome}`
			divCard.appendChild(cardTitle)

			let cardPreco = document.createElement("p")
			cardPreco.classList.add("card__preco")
			cardPreco.innerHTML = `${produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
			divCard.appendChild(cardPreco)

			let verProduto = document.createElement("a")
			verProduto.classList.add("produtos__link")
			verProduto.innerHTML = "Ver produto"
			verProduto.setAttribute("href", `?page=product&id=${produto.id}`)
			divCard.appendChild(verProduto)

			section.appendChild(divCard)
		})
	}

	function createPaginationButtons() {
		let newDiv = document.createElement('div')
		newDiv.classList.add("paginate")
		mainElement.appendChild(newDiv)

		let buttonFirst = document.createElement('button')
		buttonFirst.classList.add('button-pag', 'button-pag--first', 'button--p', 'button--bg')
		buttonFirst.addEventListener('click', () => paginate("first"))
		buttonFirst.textContent = "First"
		newDiv.appendChild(buttonFirst)
		let buttonPrev = document.createElement('button')
		buttonPrev.classList.add('button-pag', 'button-pag--prev', 'button--p', 'button--bg')
		buttonPrev.addEventListener('click', () => paginate("prev"))
		buttonPrev.textContent = "<< Prev"
		newDiv.appendChild(buttonPrev)

		let buttonNext = document.createElement('button')
		buttonNext.classList.add('button-pag', 'button-pag--next', 'button--p', 'button--bg')
		buttonNext.addEventListener('click', () => paginate("next"))
		buttonNext.textContent = "Next >>"
		newDiv.appendChild(buttonNext)

		let buttonLast = document.createElement('button')
		buttonLast.classList.add('button-pag', 'button-pag--last', 'button--p', 'button--bg')
		buttonLast.addEventListener('click', () => paginate("last"))
		buttonLast.textContent = "Last"
		newDiv.appendChild(buttonLast)
	}


	function parseLinkHeader( linkHeader ) {
		const linkHeadersArray = linkHeader.split( ", " ).map( header => header.split( "; " ) );
		const linkHeadersMap = linkHeadersArray.map( header => {
			const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
			const thisHeaderUrl = header[0].slice( 1, -1 ).replace('http', 'https');
			return [ thisHeaderRel, thisHeaderUrl ]

		} );

		return Object.fromEntries( linkHeadersMap );
	}


	const paginate = ( direction ) => {
		fetch(currentUrl).then( response => {
			let linkHeaders = parseLinkHeader( response.headers.get("Link") );

			if ( !!linkHeaders[direction] ) {
				currentUrl = linkHeaders[direction];
				fetchProducts( linkHeaders[direction] );
			}
		} );
	}

