const urlBase = "https://accedo-pokemon.herokuapp.com/api/v1";

// Capitalizar palabaras
String.prototype.capitalize = function () {
	return this.replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
};

// Enviar request al servidor
async function sentServer(dataSend) {
	body = !dataSend.body ? null : JSON.stringify(dataSend.body);
	const response = await fetch(`${urlBase}/${dataSend.urlRequest}`, {
		method: dataSend.method,
		headers,
		body: body,
	}).then((response) => response.json());
	return response;
}
