"use strict";

//Este codigo solicita datos a la API Amadeus para obtener ofertas de vuelos

//importamos el modulo 'http' para hacer solicitudes HTTP seguras (node.js)
const https = require("https");

//definimos las Keys dadas por la API
const apiKey = "jg64pcuYIEPr9vghm2IN1qd4McxE1kJ3";
const apiSecret = "yUzHodvV5uiiZLTf";

// establecemos URL del endpoit(direcion de la API para obtener y enviar datos en base a http) al cual realizamos la solicitud
const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

// establecemos los parametros de solicitud
const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", apiKey);
data.append("client_secret", apiSecret);

// Función asincrónica para obtener el access_token de autentificacion en la API(metodo 'POST')
async function getToken() {
    //creamos promesa donde definimos la solicitud y el header(content-type=indica al servidor como estan estructurados los datos que se enviaran en la solicitud)
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", //especificamos el formato de datos enviados en la solicitud como URL(METADATOS)
            },
        };

        //hacemos solicitud HTTP(callback)
        //eventos: url(a donde se hace la solicitud'endpoint') / options(engloba solicitud del metodo HTTP y header) / res(callback que se ejecuta al recibir respuesta del servidor))
        const req = https.request(url, options, (respuesta) => {
            // acumulamos los datos recibidos
            let data = "";
            //este evento se dispara cuando recibe datos
            respuesta.on("data", (chunk) => {
                //chunk = fragmento de datos de gran volumen
                data += chunk;
            });
            //analizamos y extraemos token / procesamos la respuesta recibida en evento 'end' y convertimos los datos tipo string a objeto JSON
            respuesta.on("end", () => {
                const dataApi = JSON.parse(data);
                const token = dataApi.access_token; // token de acceso para realizar solicitud
                resolve(token);
            });
        });
        //si hay error en la solicitud rechaza la promesa
        req.on("error", (error) => {
            reject(error);
        });
        //escribimos los datos de solicitud en HTTP
        req.write(data.toString());
        req.end();
    });
}

// Función asincrónica para hacer la llamada a la API y recibir las ofertas de los vuelos(metodo 'GET')
async function getFlightOffers() {
    try {
        //await garantiza obtener el token de acceso antes de continuar la peticion
        const token = await getToken();
        const flightOffersUrl =
            "https://test.api.amadeus.com/v2/shopping/flight-offers";
        //creamos parametros de busqueda
        const queryParams = new URLSearchParams({
            originLocationCode: "SYD",
            destinationLocationCode: "BKK",
            departureDate: "2023-06-22",
            adults: 1,
            nonStop: false,
            max: 250, //cuantos resultados queremos
        });
        //creamos nueva promesa para la logica de la solicitud(resolve,reject) / establecemos metodo 'GET' y se aniade la autorizacion(token)
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            //hacemos solicitud HTTP con los datos definidos en la promesa anterior
            const req = https.request(
                `${flightOffersUrl}?${queryParams.toString()}`, //url base concatenada con los parametros anteriores convertida a string + la configuracion de la solicitud(options)
                options,
                (respuesta2) => {
                    //callback de respuesta
                    //acumulamos los datos recibidos
                    let data = "";
                    //este evento se dispara cuando recibe datos
                    respuesta2.on("data", (chunk) => {
                        data += chunk; //concatena los datos recibidos(chunk) a los ya existentes(data) es decir, va anadiendo mas datos a 'data'
                    });
                    //procesamos la respuesta recibida en evento 'end' y convertimos los datos tipo string a objeto JSON
                    respuesta2.on("end", () => {
                        const flightOffers = JSON.parse(data).data;
                        //se completa con existo la promesa creada anteriormente / el resultado lo usamos en la cadena de promesas hasta llegar al bloque (.then) de abajo(getFlightOffers)
                        resolve(flightOffers);
                    });
                }
            );
            //si hay error en la solicitud rechaza la promesa
            req.on("error", (error) => {
                reject(error);
            });
            //llamamos para indicar que la solicitud esta completa y hay que enviarla al servidor
            req.end();
        });
    } catch (error) {
        throw error;
    }
}

// Ejecutamos la función asincrona para obtener los datos de vuelo y retornar una promesa / se resuelve con los datos de las ofertas o se rechaza si hay algun error
getFlightOffers()
    .then((flightOffers) => {
        //verificamos si hay ofertas validas
        if (flightOffers && flightOffers.length > 0) {
            //asume que tiene al menos una oferta y la asignamos en 'firstOffer'
            const firstOffer = flightOffers[0];
            //extraemos el precio total de la 1a oferta
            const price = firstOffer.price.total;
            //imprimimos las ofertas recibidas
            console.log(flightOffers);
            //imprimimos el precio total
            console.log(price);
        } else {
            //si no hay ofertas (flightOffers esta vacio)
            console.log("No se encontraron datos de vuelo.");
        }
    })
    //si hay error en la solicitud rechaza la promesa
    .catch((error) => {
        console.log(error);
    });

//.on y .end (metodos que da 'http.ClientRequest'(node.js) / los utilizamos para manejar los eventos 'data' y 'end' / .on registra los eventos relacionados con la respuesta de la solicitud HTTP / .end finaliza la solicitud y la envia al servidor)
