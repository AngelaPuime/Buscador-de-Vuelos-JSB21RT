"use strict";
// url of amadues api

//inputs from the user
let fromInput = document.querySelector("input[name='from']");
let toInput = document.querySelector("input[name='to']");
let departureDateInput = document.querySelector("input[name='outbound']");
let returnDateInput = document.querySelector("input[name='return']");
let passengersInput = document.querySelector("input[name='passenger']");
let btnSearch = document.querySelector("button#searchButton");
let formSearch = document.querySelector("form#searchForm");

//keys declared
const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

//url form amadeus api
const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

//setting params to make the request
const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", apiKey);
data.append("client_secret", apiSecret);

//getting token with the params
function getToken() {
  //promise created
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.access_token;
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// sending request to the API
export async function getFlightOffers() {
  return getToken()
    .then(async (token) => {
      const flightOffersUrl =
        "https://test.api.amadeus.com/v2/shopping/flight-offers";
      const queryParams = new URLSearchParams({
        originLocationCode: fromInput, // we are using dom here
        destinationLocationCode: toInput, // we are using dom here
        departureDate: departureDateInput, // we are using dom here
        adults: passengersInput, // we are using dom here
        nonStop: false,
        max: 50,
      });

      return fetch(`${flightOffersUrl}?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => data.data)
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}
btnSearch.addEventListener("click", (e) => {
  try {
    e.preventDefault();
    fromInput = fromInput.value;
    if (fromInput.length !== 3) {
      throw new Error("Longitud válida: 3 caracteres");
    }
    toInput = toInput.value;
    departureDateInput = departureDateInput.value;
    // returnDateInput = returnDateInput.value
    passengersInput = passengersInput.value;
    getFlightOffers()
      .then((flightOffers) => {
        if (flightOffers && flightOffers.length > 0) {
          const firstOffer = flightOffers[0];
          const price = firstOffer.price.total;
          console.log(flightOffers);
          console.log(price);
        } else {
          console.log("No se encontraron datos de vuelo.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(fromInput, toInput, departureDateInput, passengersInput);
  } catch (error) {}
});
