const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

// obtiene los datos de la api de pokemon con una paginación
async function getPokemons(paginate) {
	try {
		paginate = !paginate ? "" : paginate;
		const currentUrl = baseUrl + paginate;
		const pokemons = await fetch(currentUrl).then((data) => data.json());
		pokemons.current = paginate;
		totalItems = pokemons.count;
		printPokemons(pokemons);
	} catch (error) {
		console.log(error);
		alert("No hay pokemones para mostrar.");
	}
}

// Imprime los pokemones en el dom
function printPokemons(pokemos) {
	$("#container").empty();

	pokemos.results.forEach((pokemon) => {
		$("#container").append(`
		<div class="col-sm-3">
		<div class="card">
		<div class="card-body">
		<h5 class="card-title">${pokemon.name}</h5>
		<a href="${pokemon.url}" class="btn btn-outline-primary btn-block">Ver Mas</a>
		</div>
		</div>
		</div>
		`);
	});
}
