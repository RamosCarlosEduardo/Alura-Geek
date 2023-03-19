import {paramArray} from './getParams.js';
import {getDb} from './fetch.js'
import {createElement} from './builder.js'

const mainElement = document.querySelector('main')
let currentCategoria = undefined
let dbSimilares = [];
const urlBase = 'https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/'

async function routProduct () {
	await createProductInfos(paramArray['id'])
	await fetchSimilares()
	
}

async function createProductInfos (productId) {
	const produto = await getDb(`${urlBase}produtos/${productId}`)
	
	currentCategoria = produto.categoriaId

	let divCard = createElement("div", 
	{
		class: 	"product__card"
	})
	
	let cardImg = createElement("img", 
	{
		class: "product__img",
		alt: produto.alt,
		src: produto.img
	})
	divCard.appendChild(cardImg)

	let divTextContainer = createElement("div",
	{
		class: "product__card product__card__text"
	})
	divCard.appendChild(divTextContainer)

	let cardTitle = createElement("h3",
	{
		class: "product__card__title",
		textContent: produto.nome
	})
	divTextContainer.appendChild(cardTitle)

	let cardPreco = createElement("p",
	{
		class: "product__card__preco",
		textContent: produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
	})
	divTextContainer.appendChild(cardPreco)

	let descricao = createElement("p", {
		class: "product__card__descricao",
		textContent: produto.descricao
	})
	divTextContainer.appendChild(descricao)

	mainElement.appendChild(divCard)
}

async function fetchSimilares() {
	dbSimilares = await getDb(`${urlBase}categorias/${currentCategoria}/produtos?id_ne=${paramArray.id}`)
	createSimilaresGrid()
}


function createSimilaresGrid() {

	let newSection = createElement("section",
	{
		class: "grid-cards grid-cards--similares"
	})
	mainElement.appendChild(newSection)

	let sectionTitle = createElement("h2",
	{
		class: "grid-cards__title",
		textContent: "Produtos similares"
	})
	newSection.appendChild(sectionTitle)

	createSimilaresCards(newSection);
}

function createSimilaresCards(section) {

	for (let i = 0; i<5;i++){

		let divCard = createElement("div",
		{
			class: "card card--home",

		})
		divCard.classList.add()

		let cardImg = createElement("img",
		{
			class: "card__img",
			alt: dbSimilares[i].alt,
			src: dbSimilares[i].img
		})
		divCard.appendChild(cardImg)


		let cardTitle = createElement("h3",
		{
			class: "card__titulo",
			textContent: dbSimilares[i].nome

		})
		divCard.appendChild(cardTitle)

		let cardPreco = createElement("p",
		{
			class: "card__preco",
			textContent: dbSimilares[i].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
		})
		divCard.appendChild(cardPreco)

		let verProduto = createElement("a",
		{
			class: "produtos__link",
			textContent: "Ver produto",
			href: `?page=product&id=${dbSimilares[i].id}`

		})
		divCard.appendChild(verProduto)

		section.appendChild(divCard)

	}
}

export {routProduct, createProductInfos, fetchSimilares, createSimilaresGrid, createSimilaresCards}