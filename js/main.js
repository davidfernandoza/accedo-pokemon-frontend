start();

async function start() {
	$("#modalForm .close").click();
	if (await validateAuth()) {
		const user = await getLocal("user_data");
		$("#navBody").empty().append(`
		<li class="nav-item active">
		<a class="nav-link" onclick="typeModal('info')" data-toggle="modal" data-target="#modalForm">${user.first_name} ${user.last_name}</a>
		</li>
		
		<li class="nav-item">
		<a class="nav-link" onclick="logout()">Cerrar sesión</a>
		</li>
		`);
	} else {
		console.log("si");

		$("#navBody").empty().append(`
		<li class="nav-item active">
		<a class="nav-link" onclick="typeModal('register')" data-toggle="modal" data-target="#modalForm" >Registro</a>
		</li>
		
		<li class="nav-item">
		<a class="nav-link" onclick="typeModal('login')" data-toggle="modal" data-target="#modalForm" >Inciar sesión</a>
		</li>
		`);

		// Devuelve si no esta loguiado
		if (init == "info") location.href = "../";
	}

	// Cargar pokemones
	if (init == "index") countPages(1, "init");
	else getPokemon();
}
