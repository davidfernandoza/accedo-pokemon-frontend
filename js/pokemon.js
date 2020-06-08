const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

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

function printPokemons(pokemos) {
	$("#container").empty();

	pokemos.results.forEach((pokemon) => {
		$("#container").append(`
			<div class="col-sm-3">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">${pokemon.name}</h5>
						<a href="${pokemon.url}" class="btn btn-primary">Ver Mas</a>
					</div>
				</div>
			</div>
		`);
	});
}
