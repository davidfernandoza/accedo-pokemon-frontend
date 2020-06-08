let strikes = 0;

// Registro de usuario
async function register() {
	const body = {
		first_name: $("#name").val(),
		last_name: $("#lastname").val(),
		email: $("#email").val(),
		password: $("#password").val(),
	};
	response = await sentServer({
		urlRequest: "users/register",
		method: "POST",
		body,
	});
	if (response.status != 201) {
		alert(`${response.message}:\n● ${response.detail[0].message}`);
	} else {
		saveLocal("user_data", response.payload);
		alert("Usuario creado con exito");
		contendNav();
	}
}

// Login de usuario
async function login() {
	const body = {
		identity: $("#email").val(),
		password: $("#password").val(),
	};
	response = await sentServer({
		urlRequest: "auth/login",
		method: "POST",
		body,
	});
	if (response.status != 200) {
		alert(`${response.message}:\n● ${response.detail[0].message}`);
	} else {
		saveLocal("user_data", response.payload);
		contendNav();
	}
}

// Elimina la data de auteticación
async function logout() {
	deleteLocal("user_data");
	contendNav();
}

// Valida si hay un usuario autenticado
async function validateAuth() {
	const dataUser = await getLocal("user_data");
	if (dataUser) {
		/*
		 * Si exite el usuario se consulta si el token es valido.
		 */
		headers.http_auth_token = dataUser.auth_token;
		let response = await sentServer({
			urlRequest: "users",
			method: "GET",
		});

		delete headers.http_auth_token;
		if (response.status != 200 && response.status != 401) {
			alert(`${response.message}:\n● ${response.detail[0].message}`);
		} else if (response.status == 200) {
			response.payload.auth_token = dataUser.auth_token;
			saveLocal("user_data", response.payload);
			return true;
		} else if (response.status == 401 && strikes == 0) {
			/*
			 * Si no valido el token, se genera uno nuevo y llama a la funcion recursivamente
			 */
			response = await sentServer({
				urlRequest: "auth/new-token",
				method: "POST",
			});
			strikes = 1;
			dataUser.auth_token = response.payload.auth_token;
			saveLocal("user_data", dataUser);
			validateAuth();
		} else {
			deleteLocal("user_data");
			return false;
		}
	}
}
