import {paramArray} from './getParams.js';
import {getDb} from './fetch.js'
import {mainElement} from '../main.js'

let currentCategoria = undefined
let dbSimilares = [];
const urlBase = 'https://loja-alura-geek.herokuapp.com/'

async function routProduct () {
	await createProductInfos(paramArray['id'])
	await fetchSimilares()
	
}

async function createProductInfos (productId) {
	const produto = await getDb(`${urlBase}produtos/${productId}`)
	
	currentCategoria = produto.categoriaId

	let divCard = document.createElement("div")
	divCard.classList.add("product__card")

	let cardImg = document.createElement("img")
	cardImg.classList.add("product__img")
	cardImg.setAttribute("alt", `${produto.alt}`)
	cardImg.setAttribute("src", `${produto.img}`)
	divCard.appendChild(cardImg)

	let divTextContainer = document.createElement("div")
	divTextContainer.classList.add("product__card", "product__card__text")
	divCard.appendChild(divTextContainer)

	let cardTitle = document.createElement("h3")
	cardTitle.classList.add("product__card__title")
	cardTitle.innerHTML = `${produto.nome}`
	divTextContainer.appendChild(cardTitle)

	let cardPreco = document.createElement("p")
	cardPreco.classList.add("product__card__preco")
	cardPreco.innerHTML = `${produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
	divTextContainer.appendChild(cardPreco)

	let descricao = document.createElement("p")
	descricao.classList.add("product__card__descricao")
	descricao.innerHTML = produto.descricao
	divTextContainer.appendChild(descricao)

	mainElement.appendChild(divCard)
}

async function fetchSimilares() {
	dbSimilares = await getDb(`${urlBase}categorias/${currentCategoria}/produtos?id_ne=${paramArray.id}`)
	createSimilaresGrid()
}


function createSimilaresGrid() {

	let newSection = document.createElement("section")
	newSection.classList.add("grid-cards", "grid-cards--similares")
	mainElement.appendChild(newSection)

	let sectionTitle = document.createElement("h2")
	sectionTitle.classList.add("grid-cards__title")
	sectionTitle.innerHTML = "Produtos similares"
	newSection.appendChild(sectionTitle)

	createSimilaresCards(newSection);
}

function createSimilaresCards(section) {

	for (let i = 0; i<5;i++){

		let divCard = document.createElement("div")
		divCard.classList.add("card", "card--home")

		let cardImg = document.createElement("img")
		cardImg.classList.add("card__img")
		cardImg.setAttribute("alt", `${dbSimilares[i].alt}`)
		cardImg.setAttribute("src", `${dbSimilares[i].img}`)
		divCard.appendChild(cardImg)


		let cardTitle = document.createElement("h3")
		cardTitle.classList.add("card__titulo")
		cardTitle.innerHTML = `${dbSimilares[i].nome}`
		divCard.appendChild(cardTitle)

		let cardPreco = document.createElement("p")
		cardPreco.classList.add("card__preco")
		cardPreco.innerHTML = `${dbSimilares[i].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
		divCard.appendChild(cardPreco)

		let verProduto = document.createElement("a")
		verProduto.classList.add("produtos__link")
		verProduto.innerHTML = "Ver produto"
		verProduto.setAttribute("href", `?page=product&id=${dbSimilares[i].id}`)
		divCard.appendChild(verProduto)

		section.appendChild(divCard)

	}
}

export {routProduct, createProductInfos, fetchSimilares, createSimilaresGrid, createSimilaresCards}