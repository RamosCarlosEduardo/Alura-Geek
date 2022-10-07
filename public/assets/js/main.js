let db = [];
let main = document.querySelector('main')

var params = window.location.search.substring(1).split('&');
//Criar objeto que vai conter os parametros
var paramArray = {};
//Passar por todos os parametros
for(var i=0; i<params.length; i++) {
    //Dividir os parametros chave e valor
    var param = params[i].split('=');

    //Adicionar ao objeto criado antes
    paramArray[param[0]] = param[1];
}

 document.addEventListener("DOMContentLoaded", defineRota(paramArray.page));


async function defineRota (page) {
	switch (page) {
		case undefined:
		case "":
		case "home":
			await fetchDb();
			routeHome();
			break;

		case "login":
			routeLogin();
			break;

		case "allproducts":
			console.log("todos os produtos")
			break

		case "newproduct":
			console.log("adicionar produto")
			break

		case "product":
			console.log("produto X")
			break
	}
	
}

// baixa o banco de dados de produtos


async function fetchDb () {
	await fetch('https://loja-alura-geek.herokuapp.com/categorias?_embed=produtos')
			.then(response => response.json())
			.then(data => {
				db = data
			});
}
// #--------------------------------#

function routeHome () {
	createHomeBanner();
	createHomeGridCards();
}

function createHomeBanner () {
	let section = document.createElement("section")
		section.classList.add("banner-promo")
		main.appendChild(section)

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
		link.setAttribute("href", "#")
		section.appendChild(link)
}

function createHomeGridCards () {
	db.forEach((el) => {
		let newSection = document.createElement("section")
		newSection.classList.add("grid-cards")
		main.appendChild(newSection)

		let sectionTitle = document.createElement("h2")
		sectionTitle.classList.add("grid-cards__title")
		sectionTitle.innerHTML = el.nome
		newSection.appendChild(sectionTitle)

		let verTudo = document.createElement("a")
		verTudo.classList.add("produtos__link", "grid-cards__ver-tudo")
		verTudo.innerHTML = "Ver tudo ->"
		verTudo.setAttribute("href", "#")
		newSection.appendChild(verTudo)

		createHomeCards(el, newSection);
	})
}

function createHomeCards (el, section){

	for (let i = 1; i <= 5; i++){
		let divCard = document.createElement("div")
		divCard.classList.add("card")

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

function routeLogin () {
	createLoginForm();
}

function createLoginForm() {
	let section = document.createElement("section")
		section.classList.add("login__container")
		main.appendChild(section)

	let form = document.createElement("form")
		form.classList.add("login__form")
		section.appendChild(form)

	let inputMail = document.createElement("input")
		inputMail.classList.add("login__mail")
		inputMail.setAttribute("type", "text")
		inputMail.setAttribute("placeholder", "Escreva seu e-mail")
		form.appendChild(inputMail)

	let inputPass = document.createElement("input")
		inputPass.classList.add("login__mail")
		inputPass.setAttribute("type", "password")
		inputPass.setAttribute("placeholder", "Escreva sua senha")
		form.appendChild(inputPass)

	let button = document.createElement("a")
		button.classList.add("button", "button--p", "button--bg", "login__submit")
		button.innerHTML = "Entrar"
		form.appendChild(button)
}
