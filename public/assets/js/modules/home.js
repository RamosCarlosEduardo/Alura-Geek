import {dbEmbed} from '../main.js'
import {mainElement} from '../main.js'

const routeHome = () => {
	createHomeBanner();
	createHomeGrid();
}

const createHomeBanner = () => {
	let section = document.createElement("section")
	section.classList.add("banner-promo")
	mainElement.appendChild(section)

	let h2 = document.createElement("h2")
	h2.classList.add("banner-promo__title")
	h2.innerHTML = "Dezembro Promocional"
	section.appendChild(h2)

	let p = document.createElement("p")
	p.classList.add("banner-promo__text")
	p.innerHTML = "Produtos selecionados com 33% de desconto"
	section.appendChild(p)

	let link = document.createElement("a")
	link.classList.add("button", "button--p", "button--bg", "banner-promo__button")
	link.innerHTML = "Ver tudo ->"
	link.setAttribute("href", "?page=allproducts")
	section.appendChild(link)
}

const createHomeGrid = () => {
	dbEmbed.forEach((el) => {
		let newSection = document.createElement("section")
		newSection.classList.add("grid-cards")
		mainElement.appendChild(newSection)

		let sectionTitle = document.createElement("h2")
		sectionTitle.classList.add("grid-cards__title")
		sectionTitle.innerHTML = el.nome
		newSection.appendChild(sectionTitle)

		let verTudo = document.createElement("a")
		verTudo.classList.add("produtos__link", "grid-cards__ver-tudo")
		verTudo.innerHTML = "Ver tudo ->"
		verTudo.setAttribute("href", "#")
		verTudo.setAttribute("href", "?page=allproducts")
		newSection.appendChild(verTudo)

		createHomeCards(el, newSection);
	})
}

const createHomeCards = (el, section) => {

	for (let i = 1; i <= 5; i++){
		let divCard = document.createElement("div")
		divCard.classList.add("card", "card--home")

		let cardImg = document.createElement("img")
		cardImg.classList.add("card__img")
		cardImg.setAttribute("alt", `${el.produtos[i].alt}`)
		cardImg.setAttribute("src", `${el.produtos[i].img}`)
		divCard.appendChild(cardImg)


		let cardTitle = document.createElement("h3")
		cardTitle.classList.add("card__titulo")
		cardTitle.innerHTML = `${el.produtos[i].nome}`
		divCard.appendChild(cardTitle)

		let cardPreco = document.createElement("p")
		cardPreco.classList.add("card__preco")
		cardPreco.innerHTML = `${el.produtos[i].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
		divCard.appendChild(cardPreco)

		let verProduto = document.createElement("a")
		verProduto.classList.add("produtos__link")
		verProduto.innerHTML = "Ver produto"
		verProduto.setAttribute("href", `?page=product&id=${el.produtos[i].id}`)
		divCard.appendChild(verProduto)

		section.appendChild(divCard)
	}
}

export {routeHome, createHomeBanner, createHomeGrid, createHomeCards}