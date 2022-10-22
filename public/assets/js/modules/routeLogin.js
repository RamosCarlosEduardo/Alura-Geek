import {createElement} from './builder.js'

const urlBase = 'https://loja-alura-geek.herokuapp.com/'
const mainElement = document.querySelector('main')

function routeLogin () {
	createLoginForm();
}

function createLoginForm() {
	let section = createElement("section", {class: "form__section-container"} )
	mainElement.appendChild(section)

	let form = createElement("form", {class: "form"} )
	section.appendChild(form)

	let mailDivFormCx = createElement("div", {class: "form__caixa"} )
	form.appendChild(mailDivFormCx)

	let inputMail = createElement("input", 
	{
		class: "login__mail form__input",
		type: "email",
		id: "form__login-mail"
	})
	mailDivFormCx.appendChild(inputMail)

	let lblMail = createElement("label",
	{
		for: "form__login-mail",
		class: "form__lbl",
		textContent: "Escreva seu e-mail"
	})
	mailDivFormCx.appendChild(lblMail)

	let passDivFormCx = createElement("div", {class: "form__caixa"})
	form.appendChild(passDivFormCx)

	let inputPass = createElement("input",
	{
		class: "login__pass form__input",
		type: "password",
		id: "form__login-pass"
	})
	passDivFormCx.appendChild(inputPass)

	let lblPass = createElement("label",
	{
		for: "form__login-pass",
		class: "form__lbl",
		textContent: "Escreva sua senha"
	})
	passDivFormCx.appendChild(lblPass)

	let button = createElement("a",
	{
		class: "button button--p button--bg login__submit",
		textContent: "Entrar"
	})
	form.appendChild(button)

	button.addEventListener('click', (event) => {
		if (inputMail.value === 'teste@teste.com' && inputPass.value === '123456'){
			sessionStorage.setItem('auth', true);
			window.location.href = `${urlBase}`
		} else {
			sessionStorage.setItem('auth', false);
			alert('Dados inválidos, tente novamente.')
		}
	})
	
}

export {routeLogin, createLoginForm}