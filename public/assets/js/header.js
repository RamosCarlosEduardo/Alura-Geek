const searchButton = document.querySelector("[data-search-button]")
const searchInput = document.querySelector("[data-search-input]")
const headerLogin = document.querySelector("[data-login]")
const headerLogo = document.querySelector("[data-logo]")

searchButton.addEventListener("click", () => {
	headerLogin.classList.toggle("hidden")
	headerLogo.classList.toggle("hidden")
	searchButton.dataset.searchButton == "fechar" ? searchButton.dataset.searchButton = "" : searchButton.dataset.searchButton = "fechar"
	searchInput.classList.toggle("hidden")
})
