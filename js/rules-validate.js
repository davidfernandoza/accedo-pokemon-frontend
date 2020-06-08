function rigisterRules() {
	/*
	 * Reglas del registo
	 */
	$("#sendRegister").on("click", () => {
		$("#formRegister").validate({
			rules: {
				name: { required: true, minlength: 2, maxlength: 45 },
				lastname: { required: true, minlength: 2, maxlength: 45 },
				email: { required: true, minlength: 5, maxlength: 100, email: true },
				password: { required: true, minlength: 8, maxlength: 60 },
				confirm: {
					equalTo: "#password",
				},
			},
			messages: {
				name: {
					required: "El nombre es requerido",
					minlength: "El minimo permitido son 3 caracteres",
					maxlength: "El maximo permitido son 45 caracteres",
				},
				lastname: {
					required: "El apellido es requerido",
					minlength: "El minimo permitido son 3 caracteres",
					maxlength: "El maximo permitido son 45 caracteres",
				},
				email: {
					required: "El correo es requerido",
					minlength: "El minimo permitido son 5 caracteres",
					maxlength: "El maximo permitido son 100 caracteres",
					email: "Debe de ser un correo valido",
				},
				password: {
					required: "La contraseña es requerida",
					minlength: "El minimo permitido son 8 caracteres",
					maxlength: "El maximo permitido son 60 caracteres",
				},
				confirm: {
					equalTo: "Las contraseñas deben coincidir",
				},
			},
			submitHandler: (form) => {
				register();
			},
		});
	});

	/*
	 * Reglas del login
	 */
	$("#sendLogin").on("click", () => {
		$("#formLogin").validate({
			rules: {
				email: { required: true, minlength: 5, maxlength: 100, email: true },
				password: { required: true, minlength: 8, maxlength: 60 },
			},
			messages: {
				email: {
					required: "El correo es requerido",
					minlength: "El minimo permitido son 5 caracteres",
					maxlength: "El maximo permitido son 100 caracteres",
					email: "Debe de ser un correo valido",
				},
				password: {
					required: "La contraseña es requerida",
					minlength: "El minimo permitido son 8 caracteres",
					maxlength: "El maximo permitido son 60 caracteres",
				},
			},
			submitHandler: (form) => {
				login();
			},
		});
	});
}
