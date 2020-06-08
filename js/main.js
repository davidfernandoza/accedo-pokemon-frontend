let totalItems = 0,
	range = 10,
	initRange = 1,
	currentButtons = 0;

function printPaginate(dataPagination) {
	const { previous, next, currentPage, initRange, range } = dataPagination;
	currentButtons = 0;

	// previous
	$("#pagination").empty().append(`
	<li class="page-item ${previous.classValuePre}">
		<a class="page-link" onclick="countPages(${previous.previousValue}, 'pre')">Previous</a>
	</li>
	`);

	for (let i = initRange; i <= range; i++) {
		currentButtons += 1;

		let classValueCurrent = currentPage == i ? "active" : "";
		$("#pagination").append(`		
			<li class="page-item ${classValueCurrent}" aria-current="page">
				<a class="page-link" onclick="countPages(${i}, 'btn')">${i}</a>
			</li>			
		`);
	}

	$("#pagination").append(`		
			<li class="page-item ${next.classValueNext}">
				<a class="page-link" onclick="countPages(${next.nextValue}, 'next')">Next</a>
			</li>		
		`);
}

// Función que calcula las paginaciones
function countPages(currentPage, typeButton) {
	let totalButtons = Math.round(totalItems / 20),
		baseButton = 0,
		classValuePre = "disabled",
		classValueNext = "disabled",
		previousValue = 1,
		nextValue = 1,
		paginateItems = currentPage * 20,
		amountItems = 20,
		paginate = "";

	// Validar cuantos registros hay en la ultima pagina para llamar en la api
	if (currentPage == totalButtons) {
		amountItems = 20 - (totalButtons * 20 - totalItems);
	}

	// Habilitar el boton de previo si hay datos
	if (currentPage > 1) {
		classValuePre = "";
		previousValue = currentPage - 1;
		paginate = `?offset=${paginateItems}&limit=${amountItems}`;
	}

	// Habilitar el boton de siguiente si hay datos
	if (currentPage < totalButtons || typeButton == "init") {
		nextValue = currentPage + 1;
		classValueNext = "";
	}

	// Generar un rango de botones a mostrar
	if (currentPage > range) {
		/*
		 * Next
		 */
		range += 10;
		range = range > totalButtons ? totalButtons : range;
		initRange = currentPage;
	}
	if (typeButton == "pre" && range > 10) {
		/*
		 * Previous
		 */
		range -= 10;
		range = range < currentPage ? (range += 10) : range;

		// Devuelve el rango al estado normal de 10 cuando esta en el ultimo rango posible de la paginación
		if (range == totalButtons) {
			baseButton = +(Math.trunc(totalButtons / 10) + "0");
			if (baseButton == currentPage) {
				range = baseButton;
			}
		}
		initRange = range - 9;
	}

	// Llamar a los pokemones a la api
	getPokemons(paginate);

	// Imprimir la paginacion
	printPaginate({
		previous: {
			previousValue,
			classValuePre,
		},
		next: {
			nextValue,
			classValueNext,
		},
		currentPage,
		initRange,
		range,
	});
}

countPages(1, "init");
