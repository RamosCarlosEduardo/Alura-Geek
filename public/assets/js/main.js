let produtos = [];

fetch('https://loja-alura-geek.herokuapp.com/produtos')
	.then(response => response.json())
	.then(data => {
		produtos = data
	})