const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
let pokemon = {};

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
		<button type="button" class="btn btn-outline-primary btn-block" onclick="openPokemon('${pokemon.url}')">Ver Mas</button>
		</div>
		</div>
		</div>
		`);
	});
}

// Abre la informacion de un pokemon
async function openPokemon(pokemonUrl) {
	if (!(await validateAuth())) alert("Inicia sesión primero!");
	else {
		saveLocal("pokemon_url", pokemonUrl);
		location.href = "./pages/info.html";
	}
}

// obtiene la informacion de un pokemon
async function getPokemon() {
	try {
		const urlPokemon = await getLocal("pokemon_url");
		pokemon = await fetch(urlPokemon).then((data) => data.json());
		printPokemon();
	} catch (error) {
		alert("No exite el pokemon.");
	}
}

// imprime la informacion del pokemon
async function printPokemon() {
	// Menu de información
	$("#infoPokemon").empty().append(`
	<ul class="list-group list-group-flush">
	<li class="list-group-item"><span class="font-weight-bold">Nombre</span>: ${pokemon.name.capitalize()}</li>
	<li class="list-group-item"><span class="font-weight-bold">Habilidades</span>:
	<ul id="abilities">
	</ul>
	</li>
	<li class="list-group-item paginateImg"><span class="font-weight-bold">Imagenes:</span>
	<ul class="pagination pagination-sm" id="containerBtn">
	</ul>
	</li>
	</ul>
	`);

	// Lista de habilidades
	$("#abilities").empty();
	pokemon.abilities.forEach((item) => {
		$("#abilities").append(`
		<li class="list-group-item">${item.ability.name.capitalize()}</li>
		`);
	});

	// Lista de imagenes
	for (let i = 1; i <= 4; i++) {
		$(`#containerBtn`).append(
			`<li class="page-item" id="btn${i}"><a class="page-link"  onclick="setImgPokemon(${i})">${i}</a></li>`
		);
	}

	setImgPokemon(1);
}

function setImgPokemon(numberImg) {
	for (let i = 1; i <= 4; i++) {
		$(`#btn${i}`).removeClass("active");
	}
	$(`#btn${numberImg}`).addClass("active");
	let typeImg = "";
	switch (numberImg) {
		case 1:
			typeImg = "front_default";
			break;
		case 2:
			typeImg = "front_shiny";
			break;

		case 3:
			typeImg = "back_default";
			break;

		default:
			typeImg = "back_shiny";
			break;
	}

	$("#imgPokemon").empty().append(`
	<div class="text-center imgPokemon">
	<img src="${pokemon.sprites[typeImg]}" class="rounded" width="120">
	</div>
	`);
}
