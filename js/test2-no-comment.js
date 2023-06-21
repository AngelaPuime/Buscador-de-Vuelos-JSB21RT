"use strict";

/*const https = require("https");

const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", apiKey);
data.append("client_secret", apiSecret);

async function getToken() {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const req = https.request(url, options, (respuesta) => {
            let data = "";
            respuesta.on("data", (chunk) => {
                data += chunk;
            });

            respuesta.on("end", () => {
                const dataApi = JSON.parse(data);
                const token = dataApi.access_token;
                resolve(token);
            });
        });
        req.on("error", (error) => {
            reject(error);
        });

        req.write(data.toString());
        req.end();
    });
}

async function getFlightOffers() {
    try {
        const token = await getToken();
        const flightOffersUrl =
            "https://test.api.amadeus.com/v2/shopping/flight-offers";
        const queryParams = new URLSearchParams({
            originLocationCode: "MAD",
            destinationLocationCode: "ICN",
            departureDate: "2023-06-21",
            adults: 1,
            nonStop: false,
            max: 50,
        });

        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const req = https.request(
                `${flightOffersUrl}?${queryParams.toString()}`,
                options,
                (respuesta2) => {
                    let data = "";
                    respuesta2.on("data", (chunk) => {
                        data += chunk;
                    });

                    respuesta2.on("end", () => {
                        const flightOffers = JSON.parse(data).data;
                        resolve(flightOffers);
                    });
                }
            );

            req.on("error", (error) => {
                reject(error);
            });

            req.end();
        });
    } catch (error) {
        throw error;
    }
}

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
    });*/

const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", apiKey);
data.append("client_secret", apiSecret);

function getToken() {
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

function getFlightOffers() {
    return getToken()
        .then((token) => {
            const flightOffersUrl =
                "https://test.api.amadeus.com/v2/shopping/flight-offers";
            const queryParams = new URLSearchParams({
                originLocationCode: "MAD",
                destinationLocationCode: "ICN",
                departureDate: "2023-06-21",
                adults: 1,
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
