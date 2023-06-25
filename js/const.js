"use strict";

//DOM references
const fromInput = document.querySelector("input[name='from']");
const toInput = document.querySelector("input[name='to']");
const departureDateInput = document.querySelector("input[name='outbound']");
const passengersInput = document.querySelector("input[name='passenger']");
const btnSearch = document.querySelector("button#searchButton");
const formSearch = document.querySelector("form#searchForm");
const responseSection = document.querySelector(".response");
const loadingSection = document.querySelector("section.loading");

// Amadeus API url
const apiUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

// API keys
const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

//slider
const arrayFotos = [
	"../img/slider1.jpg",
	"../img/slider2.jpg",
	"../img/slider3.jpg",
	"../img/slider4.jpg",
];
const imgSearch = document.querySelector(".search");

export {
	fromInput,
	toInput,
	departureDateInput,
	passengersInput,
	btnSearch,
	formSearch,
	apiUrl,
	apiKey,
	apiSecret,
	responseSection,
	loadingSection,
	arrayFotos,
	imgSearch,
};
