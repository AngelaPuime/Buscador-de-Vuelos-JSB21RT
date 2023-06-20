//We are testing how to use the API

// Set the endpoint URL
const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

const getKeys = async () => {
  try {
    const res = await fetch("./keys.json");
    const data = await res.json();
    return [data.apiKey, data.apiSecret];
  } catch (error) {
    console.error("Error con JSON");
    return [];
  }
};

const main = async () => {
  // Set the request parameters
  const [apiKey, apiSecret] = await getKeys();
  //console.log(apiKey, apiSecret);
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", apiKey);
  data.append("client_secret", apiSecret);
};

//async function to get the access_token
async function getToken() {
  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const dataApi = await response.json();
  const datos = dataApi.access_token;
  return datos;
}

//async function to make the call to the API
async function info() {
  const token = await getToken();
  const response = await fetch(
    "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-06-17&adults=1&nonStop=false&max=250",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data2 = await response.json();
  console.log(data2.data);
}

main();

//* the code below doesnt works because its not async code
// const infoVuelo = info();
// let price = infoVuelo.price.total;
// console.log(infoVuelo);
// we have to create an object (promise) line 26
