const urlBase = 'https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/'
const mainElement = document.querySelector('main')
import {createElement} from './builder.js'
import {getDb} from './fetch.js'
import {validate} from './formvalidations.js'

function routeAddProduct () {
	createAddProductForm()
}

async function createAddProductForm () {
	let section = createElement("section", {class: "form__section-container"} )
	
	let form = createElement("form", {class: "form"} )
	form.addEventListener('submit', (event) => {
		event.preventDefault()
		adicionarProduto()
	})

	let nomeDivFormCx = createElement("div", {class: "form__caixa"} )

	let nomeInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__nome",
		required:"",
		'data-input':"name",
	})
	let nomeLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__nome",
		textContent: "Nome do produto"
	})
	let nomeSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		


	let urlImgDivFormCx = createElement("div", {class: "form__caixa"} )
	let inputUrlImg = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__url-img",
		required:"",
		'data-input':"imgurl",
	})
	let lblUrlImg = createElement("label",
	{
		class: "form__lbl",
		for: "form__url-img",
		textContent: "URL da imagem"
	})
	let urlImgSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		
	
	let precoDivFormCx = createElement("div", {class: "form__caixa"} )
	
	let precoInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__preco",
		required:"",
		'data-input':"price",
	})
	precoInput.addEventListener("focusout", (event) => {
		let numDesformatado = precoInput.value
		if (numDesformatado) {
			let numFormatado = parseFloat(numDesformatado)
				.toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
			if (numFormatado.includes('NaN')){
			return precoInput.value = ""
			}
			return precoInput.value = numFormatado	
		}	
	})
	precoInput.addEventListener("focusin", (event) => {
		let numFormatado = precoInput.value
		precoInput.value = desformataCurrency(numFormatado)

	})
	let precoSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		
	let precoLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__preco",
			textContent: "Preço do produto"
	})
	
	let descricaoDivFormCx = createElement("div", {class: "form__caixa"} )
	let descricaoInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__descricao",
		required:"",
		'data-input':"description",
	})
	let descricaoSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		
	let descricaoLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__descricao",
		textContent: "Descricao do produto"
	})


	let altImgDivFormCx = createElement("div", {class: "form__caixa"} )
	let altImgInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		id: "form__add__altImg",
		required:"",
		'data-input':"alternative",
	})
	let altImgSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		
	let altImgLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__altImg",
		textContent: "Texto alternativo do produto"
	})
	
	let categoriasDivFormCx = createElement("div", {class: "form__caixa"} )
	let categoriasInput = createElement("input",
	{
		class: "form__input",
		type: "text",
		list: "categorias-list",
		id: "form__add__categoria",
		autocomplete: "off",
		required:"",
		'data-input':"category",
	})
	let categoriasSpan = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		
	let categoriasLbl = createElement("label",
	{
		class: "form__lbl",
		for: "form__add__categoria",
		textContent: "Categoria"
	})

	let categoriasList = createElement("datalist", {id: "categorias-list"} )
	
	const dbCategorias = await getDb(`${urlBase}categorias`)
	dbCategorias.forEach( element => {
		let categoriasOption = document.createElement("option")
		categoriasOption.innerHTML = element.nome
		categoriasList.appendChild(categoriasOption)
	})

	let button = createElement("input",
	{
		class: "button button--p button--bg form__add__submit",
		textContent: "Enviar",
		type: "submit"
	})
	
	nomeDivFormCx.append(nomeInput, nomeSpan, nomeLbl)
	urlImgDivFormCx.append(inputUrlImg, urlImgSpan, lblUrlImg)
	precoDivFormCx.append(precoInput, precoSpan, precoLbl)
	descricaoDivFormCx.append(descricaoInput, descricaoSpan, descricaoLbl)
	altImgDivFormCx.append(altImgInput, altImgSpan, altImgLbl)
	categoriasDivFormCx.append(categoriasInput, categoriasSpan, categoriasLbl)

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

	let inputsToValidate = form.querySelectorAll('[data-input]')
	inputsToValidate.forEach(input => {
		input.addEventListener('keyup', (event) => {
		 	validate(input)
		})
	})

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

	let data = await getDb(`${urlBase}categorias`)
	for (let i in data) {
		if ( Object.values(data[i]).includes(categoriaInput.value) ) {
			categoriasId = data[i].id
		}
	}
	if (!categoriasId) {
		categoriasId = data.length + 1
		adicionarCategoria();
	}
	
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
		.then( () => {
			alert('Produto cadastrado com sucesso!')
			window.location.href = urlBase
			})
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
		console.log('Categoria cadastrada com sucesso')
		)
}

export {routeAddProduct, createAddProductForm, desformataCurrency, adicionarProduto, adicionarCategoria}