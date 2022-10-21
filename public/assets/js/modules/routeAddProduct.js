const urlBase = 'https://loja-alura-geek.herokuapp.com/'
import {mainElement} from '../main.js'
import {createElement} from './builder.js'
import {getDb} from './fetch.js'

function routeAddProduct () {
	createAddProductForm()
	console.log('adicionar produto')
}

async function createAddProductForm () {
	let section = createElement("section",
	{
		class: "form__section-container"
	})
	
	let form = createElement("form",
	{
		class: "form"
	})
	
	let nomeDivFormCx = createElement("div",
	{
		class: "form__caixa"
	})

	let nomeInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__nome"
	})
	
	let nomeLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__nome",
			textContent: "Nome do produto"
	})
	
	let urlImgDivFormCx = createElement("div",
	{
		class: "form__caixa"
	})

	let inputUrlImg = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__url-img"
	})
	
	let lblUrlImg = createElement("label",
	{
		class: "form__lbl",
		for: "form__url-img",
		textContent: "URL da imagem"
	})
	
	let precoDivFormCx = createElement("div",
	{
		class: "form__caixa"
	})
	
	let precoInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__preco"
	})
	precoInput.addEventListener("keydown", () => event.keyCode !== 69)
	precoInput.addEventListener("focusout", (event) => {
		let numDesformatado = precoInput.value
		if (numDesformatado) {
			let numFormatado = parseFloat(numDesformatado)
				.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
			return precoInput.value = numFormatado
		}	
	})
	precoInput.addEventListener("focusin", (event) => {
		let numFormatado = precoInput.value
		precoInput.value = desformataCurrency(numFormatado)

	})

	let precoLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__preco",
			textContent: "Preço do produto"
	})
	
	let descricaoDivFormCx = createElement("div",
	{
		class: "form__caixa"
	})
	
	let descricaoInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__descricao"
	})

	let descricaoLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__descricao",
			textContent: "Descricao do produto"
	})

	// INPUT ALT
	let altImgDivFormCx = createElement("div",
	{
		class: "form__caixa",
	})
	
	let altImgInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__altImg"
	})
	
	let altImgLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__altImg",
			textContent: "Texto alternativo do produto"
	})
	
	// INPUT CATEGORIAS
	let categoriasDivFormCx = createElement("div",
	{
		class: "form__caixa"
	})
	
	let categoriasInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		list: "categorias-list",
		id: "form__add__categoria",
		autocomplete: "off"
	})
	
	let categoriasLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__categoria",
			textContent: "Categoria"
	})

	let categoriasList = createElement("datalist",
	{
		id: "categorias-list"
	})
	
	const dbCategorias = await getDb(`${urlBase}categorias`)
	dbCategorias.forEach( element => {
		let categoriasOption = document.createElement("option")
		categoriasOption.innerHTML = element.nome
		categoriasList.appendChild(categoriasOption)
	})

	let button = createElement("a",
	{
		class: "button button--p button--bg form__add__submit",
		textContent: "Enviar"
	})
	button.addEventListener('click', adicionarProduto)

	nomeDivFormCx.append(nomeLbl, nomeInput)
	urlImgDivFormCx.append(lblUrlImg, inputUrlImg)
	precoDivFormCx.append(precoLbl, precoInput)
	descricaoDivFormCx.append(descricaoLbl, descricaoInput)
	altImgDivFormCx.append(altImgLbl, altImgInput)
	categoriasDivFormCx.append(categoriasLbl, categoriasInput)

	form.append(
		nomeDivFormCx,
		urlImgDivFormCx,
		precoDivFormCx,
		descricaoDivFormCx,
		altImgDivFormCx,
		categoriasDivFormCx,
		categoriasList,
		button
		)

	section.appendChild(form)

	mainElement.appendChild(section)

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
	let descricao = document.getElementById('form__add__descricao')
	let altImg = document.getElementById('form__add__altImg')
	let categoriasId

	await fetch(`${urlBase}categorias`)
	.then(r => r.json())
	.then(data => {
		for (let i in data) {
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
		descricao: descricao.value,
		alt: altImg.value,
		categoriaId: categoriasId
	}

	const init = {
		method: 'POST',
		headers: {
			"Content-type": 'application/json'
		},
		body: JSON.stringify(newProduct)

	}
	fetch(`${urlBase}produtos`, init)
	.then(alert('Produto cadastrado com sucesso!'))
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

	fetch(`${urlBase}categorias`, init)
	.then(
		// incluir msg de cadastrado com sucesso e limpar o form
		console.log('categoria cadastrada com sucesso')
		)
}

export {routeAddProduct, createAddProductForm, desformataCurrency, adicionarProduto, adicionarCategoria}