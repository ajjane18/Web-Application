
export async function GET(req, res) {

    console.log("in the weather api page")


    const res2 = await fetch('http://api.weatherapi.com/v1/current.json?key=a3f50086c1fd41a3932220448242410&q=Dublin&aqi=no')

    const data = await res2.json()

    console.log(data.current.temp_c)

    let currentTemp = data.current.temp_c

    return Response.json({"temp": currentTemp})


  }
  