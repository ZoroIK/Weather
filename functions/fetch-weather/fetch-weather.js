
const axios = require('axios');
const handler = async (event) => {
  
  console.log('runs')
  const{city} = event.queryStringParameters//fetches the city query

  const API = process.env.WEATHER_API//access the weather api from env file
  const url=`http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=no`
  
  try{
    const {data} =await axios.get(url)

    return{
      statusCode: 200,
      body: JSON.stringify(data)
    }

  }catch(error){
    const{status,statusText,headers,data} = error.response;
    return{
      statusCode: status,
      body: JSON.stringify({status,statusText,headers,data})
    }
  }
  
}

module.exports = { handler }
