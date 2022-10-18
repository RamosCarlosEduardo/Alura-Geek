let dbEmbed = [];
let dbPag = []
let dbSimilares = []
let productNotFound = false
let currentUrl = "https://loja-alura-geek.herokuapp.com/produtos?_page=1&_limit=10"
let main = document.querySelector('main')
let currentCategoria = undefined

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
		await fetchDbEmbed();
		routeHome();
		break;

		case "login":
		routeLogin();
		break;

		case "allproducts":
		routeAllproducts();
		break

		case "addproduct":
		routeAddProduct();
		break

		case "product":
		routProduct();
		break
	}
	
}

// baixa o banco de dados de produtos


async function fetchDbEmbed () {
	await fetch('https://loja-alura-geek.herokuapp.com/categorias?_embed=produtos')
	.then(response => response.json())
	.then(data => {
		dbEmbed = data
	});
}
// #--------------------------------#


// ############### Home #################
function routeHome () {
	createHomeBanner();
	createHomeGrid();
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
	link.setAttribute("href", "?page=allproducts")
	section.appendChild(link)
}

function createHomeGrid () {
	dbEmbed.forEach((el) => {
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
		verTudo.setAttribute("href", "?page=allproducts")
		newSection.appendChild(verTudo)

		createHomeCards(el, newSection);
	})
}

function createHomeCards (el, section){

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

// ############### Login ###############
function routeLogin () {
	createLoginForm();
}

function createLoginForm() {
	let section = document.createElement("section")
	section.classList.add("form__section-container")
	main.appendChild(section)

	let form = document.createElement("form")
	form.classList.add("form")
	section.appendChild(form)

	let mailDivFormCx = document.createElement("div")
	mailDivFormCx.classList.add("form__caixa")
	form.appendChild(mailDivFormCx)

	let inputMail = document.createElement("input")
	inputMail.classList.add("login__mail", "form__input")
	inputMail.setAttribute("type", "text")
	inputMail.setAttribute("id", "form__login-mail")
	// inputMail.setAttribute("placeholder", "Escreva seu e-mail")
	mailDivFormCx.appendChild(inputMail)

	let lblMail = document.createElement("label")
	lblMail.setAttribute("for", "form__login-mail")
	lblMail.classList.add("form__lbl")
	lblMail.innerText = "Escreva seu e-mail"
	mailDivFormCx.appendChild(lblMail)

	let passDivFormCx = document.createElement("div")
	passDivFormCx.classList.add("form__caixa")
	form.appendChild(passDivFormCx)

	let inputPass = document.createElement("input")
	inputPass.classList.add("login__mail", "form__input")
	inputPass.setAttribute("type", "password")
	inputMail.setAttribute("id", "form__login-pass")
	// inputPass.setAttribute("placeholder", "Escreva sua senha")
	passDivFormCx.appendChild(inputPass)

	let lblPass = document.createElement("label")
	lblPass.setAttribute("for", "form__login-mail")
	lblPass.classList.add("form__lbl")
	lblPass.innerText = "Escreva sua senha"
	passDivFormCx.appendChild(lblPass)

	let button = document.createElement("a")
	button.classList.add("button", "button--p", "button--bg", "login__submit")
	button.innerHTML = "Entrar"
	form.appendChild(button)
}

// ############### All products ###############

function routeAllproducts () {
	createPaginationButtons()
	fetchProducts()
}

function fetchProducts() {
	let productsHandler = document.getElementById('allproducts-handler')
	
	if (productsHandler) {productsHandler.remove()}
		if (paramArray.q) {currentUrl = currentUrl + `&q=${paramArray.q}`}

			fetch(currentUrl)
		.then(response => response.json())
		.then(data => {
			if (data.length === 0){
				productNotFound = true
			} else {
				dbPag = data
			}
			createAllProductsGrid()
		});
	}


	function createAllProductsGrid() {
		let paginateDiv = document.querySelector('.paginate')

		let newSection = document.createElement("section")
		newSection.classList.add("ver-tudo")
		newSection.setAttribute('id', 'allproducts-handler')
		main.insertBefore(newSection, paginateDiv)

		let sectionTitle = document.createElement("h2")
		sectionTitle.classList.add("ver-tudo__title")
		sectionTitle.innerHTML = "Todos os produtos"
		newSection.appendChild(sectionTitle)

		let addProduct = document.createElement("a")
		addProduct.classList.add("button", "button--bg", "button--p", "button--addproduct")
		addProduct.innerHTML = "Adicionar produto"
		addProduct.href = "?page=addproduct"
		newSection.appendChild(addProduct)

		if (productNotFound === false) {
			createAllProductsCards(newSection);
		} else {
			let newParagraph = document.createElement("p")
			newParagraph.classList.add("product-not-found")
			newParagraph.innerText = "Produto não encontrado."
			main.insertBefore(newParagraph, paginateDiv)

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
		let main = document.querySelector('main')
		let newDiv = document.createElement('div')
		newDiv.classList.add("paginate")
		main.appendChild(newDiv)

		let buttonFirst = document.createElement('button')
		buttonFirst.classList.add('button-pag', 'button-pag--first', 'button--p', 'button--bg')
		buttonFirst.setAttribute('onclick', 'paginate("first")')
		buttonFirst.textContent = "First"
		newDiv.appendChild(buttonFirst)

		let buttonPrev = document.createElement('button')
		buttonPrev.classList.add('button-pag', 'button-pag--prev', 'button--p', 'button--bg')
		buttonPrev.setAttribute('onclick', 'paginate("prev")')
		buttonPrev.textContent = "<< Prev"
		newDiv.appendChild(buttonPrev)

		let buttonNext = document.createElement('button')
		buttonNext.classList.add('button-pag', 'button-pag--next', 'button--p', 'button--bg')
		buttonNext.setAttribute('onclick', 'paginate("next")')
		buttonNext.textContent = "Next >>"
		newDiv.appendChild(buttonNext)

		let buttonLast = document.createElement('button')
		buttonLast.classList.add('button-pag', 'button-pag--last', 'button--p', 'button--bg')
		buttonLast.setAttribute('onclick', 'paginate("last")')
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


	function paginate( direction ) {

		fetch(currentUrl).then( response => {
			let linkHeaders = parseLinkHeader( response.headers.get("Link") );

			if ( !!linkHeaders[direction] ) {
				currentUrl = linkHeaders[direction];
				fetchProducts( linkHeaders[direction] );
			}
		} );
	}

// #### SEARCH
let search = document.querySelector('[data-search-input]')
search.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		window.location.href = `https://loja-alura-geek.herokuapp.com/?page=allproducts&q=${search.value}`
	}
})

// ######### ADD PRODUCT

function routeAddProduct () {
	createAddProductForm()
	console.log('adicionar produto')
}

async function createAddProductForm () {
	// SECTION
	let section = document.createElement("section")
	section.classList.add("form__section-container")
	main.appendChild(section)

	let form = document.createElement("form")
	form.classList.add("form")
	section.appendChild(form)

	// INPUT NAME
	let nomeDivFormCx = document.createElement("div")
	nomeDivFormCx.classList.add("form__caixa")
	form.appendChild(nomeDivFormCx)

	let nomeInput = document.createElement("input")
	nomeInput.classList.add("form__input")
	nomeInput.setAttribute("type", "text")
	nomeInput.setAttribute("id", "form__add__nome")
	nomeDivFormCx.appendChild(nomeInput)

	let nomeLbl = document.createElement("label")
	nomeLbl.setAttribute("for", "form__add__nome")
	nomeLbl.classList.add("form__lbl")
	nomeLbl.innerText = "Nome do produto"
	nomeDivFormCx.appendChild(nomeLbl)

	// INPUT URL IMG
	let urlImgDivFormCx = document.createElement("div")
	urlImgDivFormCx.classList.add("form__caixa")
	form.appendChild(urlImgDivFormCx)

	let inputUrlImg = document.createElement("input")
	inputUrlImg.classList.add("form__input")
	inputUrlImg.setAttribute("type", "text")
	inputUrlImg.setAttribute("id", "form__add__url-img")
	urlImgDivFormCx.appendChild(inputUrlImg)

	let lblUrlImg = document.createElement("label")
	lblUrlImg.setAttribute("for", "form__url-img")
	lblUrlImg.classList.add("form__lbl")
	lblUrlImg.innerText = "URL da imagem"
	urlImgDivFormCx.appendChild(lblUrlImg)

	// INPUT PREÇO
	let precoDivFormCx = document.createElement("div")
	precoDivFormCx.classList.add("form__caixa")
	form.appendChild(precoDivFormCx)

	let precoInput = document.createElement("input")
	precoInput.classList.add("form__input")
	precoInput.setAttribute("type", "text")
	precoInput.setAttribute("onkeydown", "return event.keyCode !== 69")
	precoInput.setAttribute("id", "form__add__preco")
	precoDivFormCx.appendChild(precoInput)
	precoInput.addEventListener("focusout", (event) => {
		let numDesformatado = precoInput.value
		if (numDesformatado) {
			let numFormatado = parseFloat(numDesformatado).toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
			return precoInput.value = numFormatado
		}	
	})
	precoInput.addEventListener("focusin", (event) => {
		let numFormatado = precoInput.value
		precoInput.value = desformataCurrency(numFormatado)

	})

	let precoLbl = document.createElement("label")
	precoLbl.setAttribute("for", "form__add__preco")
	precoLbl.classList.add("form__lbl")
	precoLbl.innerText = "Preço do produto"
	precoDivFormCx.appendChild(precoLbl)

	// INPUT DESCRIÇAO
	let descricaoDivFormCx = document.createElement("div")
	descricaoDivFormCx.classList.add("form__caixa")
	form.appendChild(descricaoDivFormCx)

	let descricaoInput = document.createElement("input")
	descricaoInput.classList.add("form__input")
	descricaoInput.setAttribute("type", "text")
	descricaoInput.setAttribute("id", "form__add__descricao")
	descricaoDivFormCx.appendChild(descricaoInput)

	let descricaoLbl = document.createElement("label")
	descricaoLbl.setAttribute("for", "form__add__descricao")
	descricaoLbl.classList.add("form__lbl")
	descricaoLbl.innerText = "Descricao do produto"
	descricaoDivFormCx.appendChild(descricaoLbl)

	// INPUT ALT
	let altImgDivFormCx = document.createElement("div")
	altImgDivFormCx.classList.add("form__caixa")
	form.appendChild(altImgDivFormCx)

	let altImgInput = document.createElement("input")
	altImgInput.classList.add("form__input")
	altImgInput.setAttribute("type", "text")
	altImgInput.setAttribute("id", "form__add__altImg")
	altImgDivFormCx.appendChild(altImgInput)

	let altImgLbl = document.createElement("label")
	altImgLbl.setAttribute("for", "form__add__altImg")
	altImgLbl.classList.add("form__lbl")
	altImgLbl.innerText = "Texto alternativo do produto"
	altImgDivFormCx.appendChild(altImgLbl)

	// INPUT CATEGORIAS
	let categoriasDivFormCx = document.createElement("div")
	categoriasDivFormCx.classList.add("form__caixa")
	form.appendChild(categoriasDivFormCx)

	let categoriasInput = document.createElement("input")
	categoriasInput.classList.add("form__input")
	categoriasInput.setAttribute("type", "text")
	categoriasInput.setAttribute("list", "categorias-list")
	categoriasInput.setAttribute("id", "form__add__categoria")
	categoriasDivFormCx.appendChild(categoriasInput)

	let categoriasList = document.createElement("datalist")
	categoriasList.setAttribute("id", "categorias-list")
	form.appendChild(categoriasList)

	// incluindo options de categorias
	await fetch('https://loja-alura-geek.herokuapp.com/categorias')
	.then(r => r.json())
	.then(data => {
		data.forEach( element => {
			let categoriasOption = document.createElement("option")
			categoriasOption.innerHTML = element.nome
			categoriasList.appendChild(categoriasOption)

		})
	})

	let categoriasLbl = document.createElement("label")
	categoriasLbl.setAttribute("for", "form__add__categoria")
	categoriasLbl.classList.add("form__lbl")
	categoriasLbl.innerText = "Categoria"
	categoriasDivFormCx.appendChild(categoriasLbl)

	// BUTTON ENVIAR
	let button = document.createElement("a")
	button.classList.add("button", "button--p", "button--bg", "form__add__submit")
	button.innerHTML = "Enviar"
	form.appendChild(button)
	button.addEventListener('click', adicionarProduto)
}

function desformataCurrency(numFormatado) {
	if (numFormatado) {
		let numDesformatado = numFormatado.replace("R$", "").trim().replaceAll(".","").replace(",", ".")
		return parseFloat(numDesformatado)
	}
	return ""
}

async function adicionarProduto (){
	let urlImg = document.getElementById('form__add__url-img')
	let categoriaInput = document.getElementById('form__add__categoria')
	let nome = document.getElementById('form__add__nome')
	let preco = document.getElementById('form__add__preco')
	let categoriasId

	// arrumar a busca pelo id, nao ta funcionando ai embaixo. retornando 4
	// provavelmente pq o looping continua, e o ultimo a ser verificado é o ultimo item
	// nesse caso o forEach nao vai servir, pq nao existe break. pensar em outra solução
	await fetch('https://loja-alura-geek.herokuapp.com/categorias')
	.then(r => r.json())
	.then(data => {
		for (i in data) {
			if ( Object.values(data[i]).includes(categoriaInput.value) ) {
				categoriasId = data[i].id
			}
		}
		if (!categoriasId) {
			categoriasId = data.length + 1
			adicionarCategoria();
			console.log("precisa de um put categoria")
		}
	})
	
	const newProduct = {
		nome: nome.value,
		img: urlImg.value,
		preco: desformataCurrency(preco.value),
		descricao: 'pegar do form depois de criar o elemento',
		alt: 'pegar do form depois de criar o elemento',
		categoriaId: categoriasId
	}

	const init = {
		method: 'POST',
		headers: {
			"Content-type": 'application/json'
		},
		body: JSON.stringify(newProduct)

	}
	fetch('https://loja-alura-geek.herokuapp.com/produtos', init)
	.then(
		// incluir msg de cadastrado com sucesso e limpar o form
		alert('Produto cadastrado com sucesso!')
		)
}

function adicionarCategoria () {
	let categoriaNome = document.getElementById('form__add__categoria')
	
	const newCategoria = {
		nome: categoriaNome.value,
	}

	const init = {
		method: 'POST',
		headers: {
			"Content-type": 'application/json'
		},
		body: JSON.stringify(newCategoria)
	}

	fetch('https://loja-alura-geek.herokuapp.com/categorias', init)
	.then(
		// incluir msg de cadastrado com sucesso e limpar o form
		console.log('categoria cadastrada com sucesso')
		)
}

// ########## ROUTE PRODUCT ##########
async function routProduct () {
	await createProductInfos(paramArray['id'])
	await fetchSimilares()
	
}

async function createProductInfos (productId) {
	await fetch(`https://loja-alura-geek.herokuapp.com/produtos/${productId}`)
	.then(response => response.json())
	.then(data => produto = data)

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

	main.appendChild(divCard)
}

function fetchSimilares() {
	
	fetch(`https://loja-alura-geek.herokuapp.com/categorias/${currentCategoria}/produtos?id_ne=${paramArray.id}`)
		.then(response => response.json())
		.then(data => {
			dbSimilares = data
			createSimilaresGrid()
		});
}


function createSimilaresGrid() {

	let newSection = document.createElement("section")
	newSection.classList.add("grid-cards", "grid-cards--similares")
	main.appendChild(newSection)

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