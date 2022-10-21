import {dbEmbed} from '../main.js'
import {mainElement} from '../main.js'
import {createElement} from './builder.js'

const routeHome = () => {
	createHomeBanner();
	createHomeGrid();
}

const createHomeBanner = () => {
	let section = createElement('section',
	{
		class: 'banner-promo'
	})
	
	let h2 = createElement("h2", 
	{
		class: 'banner-promo__title',
		textContent: "Dezembro Promocional"
	})
	
	let p = createElement("p", 
	{
		class: "banner-promo__text",
		textContent: "Produtos selecionados com 33% de desconto"
	})

	let link = createElement("a", 
	{
		class: 'button button--p button--bg banner-promo__button',
		textContent: "Ver tudo ->",
		href: "?page=allproducts"
	})
	
	section.append(h2, p, link)
	mainElement.appendChild(section)
}

const createHomeGrid = () => {
	dbEmbed.forEach((el) => {
		let newSection = createElement("section",
		{
			class: "grid-cards"
		})
		
		let sectionTitle = createElement("h2", 
		{
			class: "grid-cards__title",
			textContent: el.nome
		})

		let verTudo = createElement("a",
		{
			class: "produtos__link grid-cards__ver-tudo",
			textContent: "Ver tudo ->",
			href: "?page=allproducts"
		})
		
		newSection.append(sectionTitle, verTudo)
		mainElement.appendChild(newSection)

		createHomeCards(el, newSection);
	})
}

const createHomeCards = (el, section) => {
	for (let i = 1; i <= 5; i++){
		let divCard = createElement("div",
		{
			class: "card card--home"
		})
		
		let cardImg = createElement("img",
		{
			class: "card__img",
			alt: el.produtos[i].alt,
			src: el.produtos[i].img
		})
		
		let cardTitle = createElement("h3",
		{
			class: "card__titulo",
			textContent: el.produtos[i].nome
		})
		
		let cardPreco = createElement("p",
		{
			class: "card__preco",
			textContent: el.produtos[i].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
		})
		
		let verProduto = createElement("a",
		{
			class: "produtos__link",
			textContent: "Ver produto",
			href: `?page=product&id=${el.produtos[i].id}`

		})

		divCard.append(cardImg, cardTitle, cardPreco,verProduto)
		section.appendChild(divCard)
	}
}

export {routeHome, createHomeBanner, createHomeGrid, createHomeCards}