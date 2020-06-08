countPages(1, "init");
contendNav();

async function contendNav() {
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
		$("#navBody").empty().append(`
		<li class="nav-item active">
		<a class="nav-link" onclick="typeModal('register')" data-toggle="modal" data-target="#modalForm" >Registro</a>
		</li>
		
		<li class="nav-item">
		<a class="nav-link" onclick="typeModal('login')" data-toggle="modal" data-target="#modalForm" >Inciar sesión</a>
		</li>
		`);
	}
}
