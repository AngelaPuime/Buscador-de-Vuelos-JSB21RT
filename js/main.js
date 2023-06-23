"use strict";
import {
  fromInput,
  toInput,
  departureDateInput,
  passengersInput,
  btnSearch,
  responseSection,
} from "./const.js";

import { getFlightOffers, getToken } from "./apiRequest.js";

// Manejar el evento de clic en el botón de búsqueda & validación de datos
function handleSearchClick(event) {
  try {
    event.preventDefault();
    const fromValue = fromInput.value.toUpperCase();
    if (fromValue.length !== 3) {
      // responseSection =
      throw new Error("Valor válido: 3 Caracteres.");
    }
    if (!isNaN(fromValue)) {
      throw new Error("Valor válido: Letras.");
    }
    const toValue = toInput.value.toUpperCase();
    if (toValue.length !== 3) {
      throw new Error("Valor válido: 3 Caracteres");
    }
    if (!isNaN(toValue)) {
      throw new Error("Valor válido: Letras.");
    }
    let departureDateValue = departureDateInput.value;
    departureDateValue = cambiarFormatoFecha(departureDateValue);
    let passengersValue = passengersInput.value;
    passengersValue = Math.floor(passengersValue);

    if (isNaN(passengersValue)) {
      throw new Error("Valor válido: Números.");
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
          console.log(flightOffers);
          console.log(price);
        } else {
          throw new Error("No se encontraron datos de vuelo.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //llamamos a la seccion para q imprima los resultados (solo llega aqui si no entro en nigun error)
    responseSection.innerHTML = `

      <h2>Los datos para tu vuelo de mañana:</h2>
      <ul> 
            <li>Origen ${fromValue}</li>
            <li>Destino:${toInput}</li>
            <li>Precio:${getFlightOffers.[0].price.total} </li>
      

      </ul>
    
    
    `;
  } catch (error) {
    console.log(error);
  }
}

// Agregar el event listener al botón de búsqueda
btnSearch.addEventListener("click", handleSearchClick);

// invertir fecha que introduce usuario para recibir el formato API

function cambiarFormatoFecha(fecha) {
  const partes = fecha.split("-"); // Divide la fecha en partes [dd, mm, yyyy]
  let nuevaFecha = partes[2] + "-" + partes[1] + "-" + partes[0]; // Reordena las partes
  //comprobamos que los dias sean escritos en formato de 31 dias y que los meses esten en formato 12 meses
  if (
    (partes[0] > 31 && partes[0] <= 0) ||
    (partes[1] > 12 && partes[1] <= 0)
  ) {
    throw new Error("Fecha inválida");
  }
  if (partes[2] < 2023) {
    throw new Error("No tenemos vuelos al pasado"); //anadir mas tarde foto del delorian
  }
  return nuevaFecha;
}

//

//cuando llega a un error anade a la section vacia algo
//Si no hay un error anade a esa misma seccion vacia los datos
