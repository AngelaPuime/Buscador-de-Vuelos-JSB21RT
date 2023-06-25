"use strict";

import { apiUrl, apiKey, apiSecret } from "./const.js";

// Obtaining API token
async function getToken() {
	const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
	const data = new URLSearchParams();
	data.append("grant_type", "client_credentials");
	data.append("client_id", apiKey);
	data.append("client_secret", apiSecret);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: data.toString(),
	});

	const responseData = await response.json();
	return responseData.access_token;
}

// Obtaining departure data
async function getFlightOffers(
	token,
	fromValue,
	toValue,
	departureDateValue,
	passengersValue
) {
	const queryParams = new URLSearchParams({
		originLocationCode: fromValue,
		destinationLocationCode: toValue,
		departureDate: departureDateValue,
		adults: passengersValue,
		nonStop: false,
		max: 50,
	});

	const urlWithParams = `${apiUrl}?${queryParams.toString()}`;

	const response = await fetch(urlWithParams, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const responseData = await response.json();
	return responseData.data;
}

export { getFlightOffers, getToken };
