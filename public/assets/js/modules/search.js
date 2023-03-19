const urlBase = 'https://api-alura-geek-m9z68l5ss-ramoscarloseduardo.vercel.app/'

const searchInputElement = document.querySelector('[data-search-input]')

searchInputElement.addEventListener('keydown', (event) => {
	
	const searchInputValue = searchInputElement.value

	if (event.key === 'Enter') {

		window.location.href = `${urlBase}?page=allproducts&q=${searchInputElement.value}`
	}
})
