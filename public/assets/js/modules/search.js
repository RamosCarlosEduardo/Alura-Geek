const searchInputElement = document.querySelector('[data-search-input]')

searchInputElement.addEventListener('keydown', (event) => {
	
	const searchInputValue = searchInputElement.value

	if (event.key === 'Enter') {

		window.location.href = `https://shopalurageek.vercel.app/?page=allproducts&q=${searchInputElement.value}`
	}
})
