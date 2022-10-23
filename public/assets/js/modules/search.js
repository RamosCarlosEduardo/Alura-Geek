// const urlBase = 'https://loja-alura-geek.herokuapp.com/'
const urlBase = 'http://127.0.0.1:5000/'

const searchInputElement = document.querySelector('[data-search-input]')

searchInputElement.addEventListener('keydown', (event) => {
	
	const searchInputValue = searchInputElement.value

	if (event.key === 'Enter') {

		window.location.href = `${urlBase}?page=allproducts&q=${searchInputElement.value}`
	}
})