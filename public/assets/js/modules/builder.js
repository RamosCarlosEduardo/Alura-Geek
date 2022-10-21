const createElement = (elementName, attributes) => {
	const element = document.createElement(elementName)
	const attributesArray = Object.entries(attributes)

	attributesArray.forEach( ([key, value]) => {
		if (key === 'textContent') {
			element.textContent = value
		} else {
			element.setAttribute(key, value)}
		})
	return element
}

export {createElement}