import {createElement} from './builder.js'
import {paramArray} from './getParams.js';
import {getDb} from './fetch.js'

const urlBase = 'https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/'
const mainElement = document.querySelector('main')
let productNotFound = false
let dbPag = [];
let currentUrl = `${urlBase}produtos?_page=1&_limit=10`

function routeAllproducts(auth) {
	createPaginationButtons()
	fetchProducts(auth)
}

async function fetchProducts(auth) {
	let productsHandler = document.getElementById('allproducts-handler')
	
	if (productsHandler) {productsHandler.remove()}
	if (paramArray.q) {currentUrl = currentUrl + `&q=${paramArray.q}`}
	dbPag = await getDb(currentUrl)
	if (dbPag.length === 0) {productNotFound = true}
	createAllProductsGrid(auth)
}

function createAllProductsGrid(auth) {
	let paginateDiv = document.querySelector('.paginate')

	let newSection = createElement("section", {
		class: 'ver-tudo',
		id: 'allproducts-handler'
	})
	
	let sectionTitle = createElement("h2",
	{
		class: 'ver-tudo__title',
		textContent: 'Todos os produtos'
	})

	let addProduct = createElement("a",
	{
		class: "button button--bg button--p button--addproduct",
		textContent: 'Adicionar produto',
		href: '?page=addproduct'

	})
	
	if (auth) {
		addProduct.style.visibility = 'visible'
	} else {
		addProduct.style.visibility = 'hidden'
	}

	newSection.append(sectionTitle, addProduct)
	mainElement.insertBefore(newSection, paginateDiv)
	
	
	if (productNotFound === false) {
		createAllProductsCards(newSection);
	} else {
		let newParagraph = createElement("p",
		{
			class: "product-not-found",
			textContent: "Produto não encontrado."
		})
		mainElement.insertBefore(newParagraph, paginateDiv)
		paginateDiv.style.display = 'none'
	}
}

function createAllProductsCards(section) {
	dbPag.forEach(produto => {
		let divCard = createElement("div", {class: "card"} )
		
		let cardImg = createElement("img", 
		{
			class: "card__img",
			alt: produto.alt,
			src: produto.img
		})
		
		let cardTitle = createElement("h3",
		{
			class: "card__titulo",
			textContent: produto.nome
		})

		let cardPreco = createElement("p",
		{
			class:'card__preco',
			textContent: produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
		})

		let verProduto = createElement("a", 
		{
			class: 'produtos__link',
			textContent: "Ver produto",
			href: `?page=product&id=${produto.id}`
		})
		
		divCard.append(
			cardImg,
			cardTitle,
			cardPreco,
			verProduto
			)
		section.appendChild(divCard)
	})
}

function createPaginationButtons() {
	let newDiv = createElement('div',
	{
		class: "paginate"
	})
	mainElement.appendChild(newDiv)

	let buttonFirst = createElement('button',
	{
		class: 'button-pag button-pag--first button--p button--bg',
		textContent: "First"
	})
	buttonFirst.addEventListener('click', () => paginate("first"))
	newDiv.appendChild(buttonFirst)

	let buttonPrev = createElement('button',
	{
		class: 'button-pag button-pag--prev button--p button--bg',
		textContent: "<< Prev"
	})
	buttonPrev.addEventListener('click', () => paginate("prev"))
	newDiv.appendChild(buttonPrev)

	let buttonNext = createElement('button',
	{
		class: 'button-pag button-pag--next button--p button--bg',
		textContent: "Next >>"
	})
	buttonNext.addEventListener('click', () => paginate("next"))
	newDiv.appendChild(buttonNext)

	let buttonLast = createElement('button',
	{
		class: 'button-pag button-pag--last button--p button--bg',
		textContent: "Last"
	})
	buttonLast.addEventListener('click', () => paginate("last"))
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

export {routeAllproducts}