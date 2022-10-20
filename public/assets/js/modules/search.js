import {urlBase} from '../main.js'

const searchInputElement = document.querySelector('[data-search-input]')
const searchInputValue = searchInputElement.value

searchInputElement.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		window.location.href = `${urlBase}?page=allproducts&q=${searchInputValue}`
	}
})