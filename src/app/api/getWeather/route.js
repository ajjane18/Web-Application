// Exporting an asynchronous GET function to handle requests for fetching weather data
export async function GET(req, res) {
  // Logging a message to indicate the function is running
  console.log("in the weather api page");

  // Making a request to the Weather API to get the current weather for Dublin
  const res2 = await fetch('http://api.weatherapi.com/v1/current.json?key=a3f50086c1fd41a3932220448242410&q=Dublin&aqi=no');

  // Parsing the JSON response from the Weather API
  const data = await res2.json();

  // Logging the current temperature in Celsius to the console
  console.log(data.current.temp_c);

  // Storing the current temperature in a variable
  let currentTemp = data.current.temp_c;

  // Returning the current temperature as a JSON response
  return Response.json({ "temp": currentTemp });
}
