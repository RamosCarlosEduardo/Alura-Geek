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

verificaPage(paramArray.page)

async function verificaPage (page) {
	await fetchDb()
	
	console.log(page)
	if (page === undefined || page === "home") {
		createGridCards();
	} else if (page === "login") {
		alert('pagina de login weeeee')
	}
	
}


let db = [];
let main = document.querySelector('main')

async function fetchDb () {
	await fetch('https://loja-alura-geek.herokuapp.com/categorias?_embed=produtos')
			.then(response => response.json())
			.then(data => {
				db = data
			});
}
	
function createGridCards () {
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

		createCards(el, newSection);
	})
}

function createCards (el, section){

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
		verProduto.setAttribute("href", "#")
		divCard.appendChild(verProduto)

		section.appendChild(divCard)
	}
}


