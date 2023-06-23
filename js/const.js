"use strict";


// Obtener referencias a los elementos del DOM
const fromInput = document.querySelector("input[name='from']");
const toInput = document.querySelector("input[name='to']");
const departureDateInput = document.querySelector("input[name='outbound']");
const passengersInput = document.querySelector("input[name='passenger']");
const btnSearch = document.querySelector("button#searchButton");
const formSearch = document.querySelector("form#searchForm");
const responseSection = document.querySelector(".response");

// URL de la API de Amadeus
const apiUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

// Claves de API
const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

export {fromInput,toInput,departureDateInput,passengersInput,btnSearch,formSearch,apiUrl,apiKey,apiSecret,responseSection};