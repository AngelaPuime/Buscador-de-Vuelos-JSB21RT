//We are testing how to use the API

const apiKey = "Ae0VxGIgwo77Mo2DYPAs24Of1jt3Uhua";
const apiSecret = "CEMm5mDrVXY9aGcL";

// Set the endpoint URL
const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

// Set the request parameters
const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", apiKey);
data.append("client_secret", apiSecret);

//async funtion to get the access_token
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
export async function info () {
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
  return data2.data
};

//* the code below doesnt works because its not async code
const infoVuelo = info();
let price = infoVuelo.price.total 
console.log(infoVuelo);
// we have to create an object (promise) line 26