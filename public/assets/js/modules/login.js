import {urlBase} from '../main.js'
import {mainElement} from '../main.js'

function routeLogin () {
	createLoginForm();
}

function createLoginForm() {
	let section = document.createElement("section")
	section.classList.add("form__section-container")
	mainElement.appendChild(section)

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
	inputPass.classList.add("login__pass", "form__input")
	inputPass.setAttribute("type", "password")
	inputPass.setAttribute("id", "form__login-pass")
	passDivFormCx.appendChild(inputPass)

	let lblPass = document.createElement("label")
	lblPass.setAttribute("for", "form__login-pass")
	lblPass.classList.add("form__lbl")
	lblPass.innerText = "Escreva sua senha"
	passDivFormCx.appendChild(lblPass)

	let button = document.createElement("a")
	button.classList.add("button", "button--p", "button--bg", "login__submit")
	button.innerHTML = "Entrar"
	form.appendChild(button)

	const loginButton = document.querySelector('.login__submit')
	loginButton.addEventListener('click', (event) => {
		const inputMail = document.getElementById('form__login-mail')
		const inputPass = document.getElementById('form__login-pass')

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