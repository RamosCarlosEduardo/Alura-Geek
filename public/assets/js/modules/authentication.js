export function checkAuthentication () {
	const auth = sessionStorage.getItem('auth');
	const loginButtonHeader = document.querySelector('[data-login]')

	if (auth == "true") {
		loginButtonHeader.style.display = 'none'
		return true
	} else {
		loginButtonHeader.style.display = 'initial'
		return false
	}	
}