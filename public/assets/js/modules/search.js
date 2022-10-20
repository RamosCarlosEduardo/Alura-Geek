import {urlBase} from '../main.js'


const searchInputElement = document.querySelector('[data-search-input]')

searchInputElement.addEventListener('keydown', (event) => {
	
	const searchInputValue = searchInputElement.value

	if (event.key === 'Enter') {
		window.location.href = `${urlBase}?page=allproducts&q=${searchInputElement.value}`
	}
})