// evento de incio de modal
$("#modalForm").on("shown.bs.modal", async () => {
	if (valueModal == "register") {
		/*
		 * Titulo del modal
		 */
		$("#titleModal").text("Rigistro de usuario");

		// Cuerpo del formulario
		$("#modalBody").empty().append(`
		<form id="formRegister">
		<div class="form-group">
		<label for="name">Nombres</label>
		<input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp">		
		</div>
		
		<div class="form-group">
		<label for="lastname">Apellidos</label>
		<input type="text" class="form-control" id="lastname" name="lastname" aria-describedby="lastnameHelp">		
		</div>
		
		<div class="form-group">
		<label for="email">Correo Electrónico</label>
		<input type="email" class="form-control" id="email"  name="email" aria-describedby="emailHelp">		
		</div>
		
		<div class="form-group">
		<label for="password">Contraseña</label>
		<input type="password" class="form-control" id="password" name="password" aria-describedby="passwordHelp">		
		</div>
		
		<div class="form-group">
		<label for="confirm">Confirmar Contraseña</label>
		<input type="password" class="form-control" id="confirm" name="confirm" aria-describedby="confirmHelp">		
		</div>
		<br>
		<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="submit" class="btn btn-primary" id="sendRegister">Crear Usuario</button>
		</div>
		</form>
		`);

		// Boton de confirmación
		$("#containerSendButton").empty().append(`
		
		`);
	} else if (valueModal == "login") {
		/*
		 * Titulo del modal
		 */
		$("#titleModal").text("Inicio de sesión");

		// Cuerpo del formulario
		$("#modalBody").empty().append(`
		<form id="formLogin">		
		<div class="form-group">
		<label for="email">Correo Electrónico</label>
		<input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp">		
		</div>
		
		<div class="form-group">
		<label for="password">Contraseña</label>
		<input type="password" class="form-control" id="password" name="password" aria-describedby="passwordHelp">		
		</div>		
		<br>
		<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="submit" class="btn btn-primary" id="sendLogin">Iniciar sesión</button>
		</div>
		</form>
		`);
	} else {
		/*
		 * Titulo del modal
		 */
		$("#titleModal").text("Información del Usuario");
		const user = await getLocal("user_data");

		// Cuerpo del formulario
		$("#modalBody").empty().append(`
		<div class="form-group">
		<label>Id:</label>
		<br>
		<span class="form-control">${user.id}</span>	
		</div>

		<div class="form-group">
		<label>Nombres:</label>
		<br>
		<span class="form-control">${user.first_name}</span>	
		</div>

		<div class="form-group">
		<label>Apellidos:</label>
		<br>
		<span class="form-control">${user.last_name}</span>	
		</div>

		<div class="form-group">
		<label>Correo Electrónico:</label>
		<br>
		<span class="form-control">${user.email}</span>	
		</div>				
		`);
	}

	rigisterRules();
});
