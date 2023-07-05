"use strict";
import {
	fromInput,
	toInput,
	departureDateInput,
	passengersInput,
	btnSearch,
	responseSection,
	loadingSection,
	arrayFotos,
	imgSearch,
} from "./const.js";

import { getFlightOffers, getToken } from "./apiRequest.js";

// Managing click event and data validation
function handleSearchClick(event) {
	try {
		event.preventDefault();
		loadingSection.classList.remove("hidden");
		responseSection.innerHTML = ``;
		const fromValue = fromInput.value.toUpperCase();
		if (fromValue.length !== 3) {
			// responseSection =
			throw new Error("Valor válido 3 caracteres.");
		}
		if (!isNaN(fromValue)) {
			throw new Error("Valor válido letras.");
		}
		const toValue = toInput.value.toUpperCase();
		if (toValue.length !== 3) {
			throw new Error("Valor válido 3 caracteres");
		}
		if (!isNaN(toValue)) {
			throw new Error("Valor válido letras.");
		}
		let departureDateValue = departureDateInput.value;
		departureDateValue = dateInvert(departureDateValue);
		let passengersValue = passengersInput.value;
		passengersValue = Math.floor(passengersValue);

		if (isNaN(passengersValue)) {
			throw new Error("Valor válido números.");
		}

		getToken()
			.then((token) => {
				return getFlightOffers(
					token,
					fromValue,
					toValue,
					departureDateValue,
					passengersValue
				);
			})
			.then((flightOffers) => {
				if (flightOffers && flightOffers.length > 0) {
					const firstOffer = flightOffers[0];
					const price = firstOffer.price.total;
					let duration = firstOffer.itineraries[0].duration.slice(2);
					console.log(flightOffers);
					//creating section with flight data
					document.querySelector("section.loading").classList.add("hidden");
					responseSection.innerHTML = `

          <article>
          <h2>LOS DATOS PARA TU VUELO DEL</h2>   
          <p>${departureDateInput.value}</p>
          <ul>
            <li><strong>Origen:</strong> ${fromValue}</li>
            <li><strong>Destino:</strong> ${toValue}</li>
            <li><strong>Precio:</strong> ${price}€</li>
            <li><strong>Duracion de vuelo:</strong> ${duration}</li>
          </ul>
        </article>
          `;
				} else {
					loadingSection.classList.add("hidden");
					responseSection.innerHTML = `
            <article class="error"> Error: No se encontraron datos de vuelo </article> 
    
          `;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		loadingSection.classList.add("hidden");
		responseSection.innerHTML = `
      <article class="error"> ${error} </article> 
      
      `;
	}
}

btnSearch.addEventListener("click", handleSearchClick);

// changing date format
function dateInvert(date) {
	const parts = date.split("-"); //new format [dd, mm, yyyy]
	let newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
	//date validation
	if (parts[0] > 31 || parts[0] <= 0 || parts[1] > 12 || parts[1] <= 0) {
		throw new Error("Fecha inválida");
	}
	if (parts[2] < 2023) {
		throw new Error(` No tenemos vuelos al pasado`);
	}
	return newDate;
}

//slider
let currentIndex = 0;

function changeBackgroundImage() {
	currentIndex++;
	if (currentIndex == arrayFotos.length) {
		currentIndex = 0;
	}
	const currentImageUrl = arrayFotos[currentIndex];
	imgSearch.style.backgroundImage = `url(${currentImageUrl})`;
}

setInterval(changeBackgroundImage, 5000);
