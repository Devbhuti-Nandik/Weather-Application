window.addEventListener("load", ()=>{
    let lat;
    let long;
    let currentTemp=document.querySelector(".temp-current");
    let messageTemp=document.querySelector(".temp-message");
    let locationTimeZone=document.querySelector(".location-timezone");
    let locationIcon=document.querySelector(".weather-image");
    let tempReading=document.querySelector(".temp");
    let tempSpan=document.querySelector(".temp span");
    //let tempDegree=document.querySelector(".temp-reading");
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition( position=>{
            lat=position.coords.latitude;
            long=position.coords.longitude;
        
            const api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ce811ff318b11fbdb7d7ee311d171e43`;

            fetch(api)
                .then(response=>{
                      return response.json();
                 })
                .then(data=>{
                       console.log(data);
                       currentTemp.textContent=Math.floor((data.main.temp-273.15)*9/5+32);
                       messageTemp.textContent=data.weather[0].description;
                       locationTimeZone.textContent=data.name;
                       locationIcon.src =`animated/${data.weather[0].icon}.svg`;

                       //changing the temperature degree reading
                       let fahrenheit= currentTemp.textContent; 
                       let  celsius = (currentTemp.textContent-32)*(5/9); 
                        
                       temperatureReading(tempReading,celsius,fahrenheit);
                });
                
                
            
        });
        
    }
    else
        window.alert("Please give access to your location for the app to work!!!");
    
    
    function temperatureReading(tempReading,celsius,fahrenheit)
    {
        
        tempReading.addEventListener("click", ()=>{
            if(tempSpan.textContent==="F")
            {
                currentTemp.textContent=Math.floor(celsius);
                tempSpan.textContent="C";
            }            
            else
            {
                currentTemp.textContent=Math.floor(fahrenheit);
                tempSpan.textContent="F";
            }
        })
    }

})