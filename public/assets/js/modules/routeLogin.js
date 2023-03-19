import {createElement} from './builder.js'
import {validate} from './formvalidations.js'
const urlBase = 'https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/'
const mainElement = document.querySelector('main')

function routeLogin () {
	createLoginForm();
}

function createLoginForm() {
	let section = createElement("section", {class: "form__section-container"} )
	
	let form = createElement("form", {class: "form"} )
	form.addEventListener('submit', (event) => {event.preventDefault()})

	let mailDivFormCx = createElement("div", {class: "form__caixa"} )
	let inputMail = createElement("input", 
	{
		class: "login__mail form__input",
		type: "email",
		maxlength: "40",
		'data-input':"email",
		pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
		required:"",
		id: "form__login-mail",
		
	})
	let lblMail = createElement("label",
	{
		for: "form__login-mail",
		class: "form__lbl",
		textContent: "Escreva seu e-mail"
	})
	let spanMail = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})		

	let passDivFormCx = createElement("div", {class: "form__caixa"})
	let inputPass = createElement("input",
	{
		class: "login__pass form__input",
		type: "password",
		'data-input':"pass",
		required:"",
		id: "form__login-pass",
		maxlength: "12",
		minlength: "6",
		pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,12}",
        title: "A senha deve conter pelo menos uma letra maíuscula, uma minúscula, um número e ter pelo menos 8 caracteres."
	})
	let lblPass = createElement("label",
	{
		for: "form__login-pass",
		class: "form__lbl",
		textContent: "Escreva sua senha"
	})
	let spanPass = createElement("span",
	{
		class: "span-rule",
		textContent: ""
	})

	let button = createElement("input",
	{
		class: "button button--p button--bg login__submit",
		textContent: "Entrar",
		type: "submit"
	})
	button.addEventListener('click', (event) => {
		if (inputMail.value === 'teste@teste.com' && inputPass.value === 'Ab1234'){
			sessionStorage.setItem('auth', true);
			window.location.href = `${urlBase}?page=allproducts`
		} else {
			sessionStorage.setItem('auth', false);
			alert('Dados inválidos, tente novamente.')
			// window.location.href = `${urlBase}?page=loginerror`
		}
	})

	mailDivFormCx.append(inputMail, spanMail, lblMail)
	passDivFormCx.append(inputPass, spanPass, lblPass)
	form.append(
		mailDivFormCx,
		passDivFormCx,
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

export {routeLogin, createLoginForm}