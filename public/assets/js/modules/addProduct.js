import {urlBase} from '../main.js'
import {mainElement} from '../main.js'

function routeAddProduct () {
	createAddProductForm()
	console.log('adicionar produto')
}

async function createAddProductForm () {
	// SECTION
	let section = document.createElement("section")
	section.classList.add("form__section-container")
	mainElement.appendChild(section)

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
	await fetch(`${urlBase}categorias`)
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

	fetch(`${urlBase}categorias`, init)
	.then(
		// incluir msg de cadastrado com sucesso e limpar o form
		console.log('categoria cadastrada com sucesso')
		)
}

export {routeAddProduct, createAddProductForm, desformataCurrency, adicionarProduto, adicionarCategoria}