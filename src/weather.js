document.addEventListener('DOMContentLoaded',() => {
    //creates search and location buttons
    const searchButton = document.getElementById('search-button');
    const locationButton = document.getElementById('location-button');

    //event listener if search button is clicked
    searchButton.addEventListener('click',() =>{
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value;
        displayResult(city);// passess the input value/ city to display result
    });

    //function to display the weather status
    function displayResult(city){
        //declares varaibles for each field
        const nameCity= document.getElementById('city-name');
        const weatherDescription = document.getElementById('weather-description');
        const temperature = document.getElementById('temperature');
        const humidity = document.getElementById('humidity');
        const windSpeed= document.getElementById('wind-speed');
        const imageElement = document.createElement("img");
        const image = document.getElementById("image-field");

        //fetches the information from fetch-weather netlify function
        fetch(`/.netlify/functions/fetch-weather?city=${city}`).then(res => res.json()).then(data =>{
            //adds the data to each varaibles
            nameCity.textContent = `Weather in : ${data.location.name} `;
            weatherDescription.textContent = `Weather: ${data.current.condition.text}`;
            temperature.textContent = `Temperature: ${data.current.temp_c}°C / ${data.current.temp_f} F`;
            humidity.textContent = `Humidity: ${data.current.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} m/s`
            imageElement.src = `https:${data.current.condition.icon}`;
            image.innerHTML = '';//removes prev stored img
            image.appendChild(imageElement);
            
        })
        //catches any error
        .catch(error => {
            console.error('Error fetching weather data:', error);
            nameCity.textContent = 'City not found';
            weatherDescription.textContent = '';
            temperature.textContent = '';
            humidity.textContent = '';
            windSpeed.textContent = '';
            image.innerHTML='';
        });
    }
    

    //event listener if location button is clicked
    locationButton.addEventListener('click',() =>{
        //successCallback function if the geo lication succefully gets the postion of the user
        const successCallback = (position) =>{
            //calls cityName funvtion to extract the city name form given postion
            cityName(position);
            
        };

        //errorCallback function if the geo location gets an error
        const errorCallback = (error) =>{
            console.error(error);
        }

        //geo location api to access users position
        navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
    });

    //cityName function to extract the users city from the given postion
    function cityName(position){
        //extracts the longitude and latitude value form the position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        //fetches the information from fetch-city netlify function
        fetch(`/.netlify/functions/fetch-city?Latitude=${latitude}&Longitude=${longitude}`).then(res => res.json()).then(data =>{
            //calls displayResult function to display the weather data for that city
            displayResult(`${data.location.name}`);
           
           
       })
       //catches any errors
       .catch(error => {
           console.error('Error fetching weather data:', error);
       });

    }
});