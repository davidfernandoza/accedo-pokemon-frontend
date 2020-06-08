async function getLocal(key) {
	const product = await JSON.parse(localStorage.getItem(`${key}`));
	return product;
}

function saveLocal(key, dataObject) {
	localStorage.setItem(`${key}`, JSON.stringify(dataObject));
}

function deleteLocal(key) {
	localStorage.removeItem(`${key}`);
}
