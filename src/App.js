import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather-component';
import Form from './components/form-component';

// Api Call- api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "a7b206af4624fddd60d3e008b178801b";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    
  

  this.weathericon = {
     Thunderstorm: "wi-thunderstorm",
     Drizzle: "wi-sleet",
     Rain: "wi-storm-showers",
     Snow: "wi-snow",
     Atmosphere: "wi-fog",
     Clear: "wi-day-sunny",
     Clouds: "wi-day-fog"
   };
  }

  calCelsius(temp) {
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeatherIcon(icons, range) {
    switch(true) {
      case range>=200 && range<=232: 
      this.setState({icon: this.weathericon.Thunderstorm});
      break;
      case range>=300 && range<=321: 
      this.setState({icon: this.weathericon.Drizzle});
      break;
      case range>=500 && range<=531: 
      this.setState({icon: this.weathericon.Rain});
      break;
      case range>=600 && range<=622: 
      this.setState({icon: this.weathericon.Snow});
      break;
      case range>=701 && range<=781: 
      this.setState({icon: this.weathericon.Atmosphere});
      break;
      case range === 800:
      this.setState({icon: this.weathericon.clear});
      break;
      case range>=801 && range<=804: 
      this.setState({icon: this.weathericon.Clouds});
      break;
      default: 
      this.setState({icon: this.weathericon.Clouds});
      break;
    }
  }

getWeather = async (e) => {

e.preventDefault();

const city = e.target.elements.city.value;
const country = e.target.elements.city.value;


if (city && country) {
  const api_call = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );

  const response = await api_call.json();
  console.log(response);

  this.setState({
    city: `${response.name},${response.sys.country}`,
    celsius: this.calCelsius(response.main.temp),
    temp_max: this.calCelsius(response.main.temp_max),
    temp_min: this.calCelsius(response.main.temp_min),
    description: response.weather[0].description,
    error: false
  });

  this.getWeatherIcon(this.weathericon, response.weather[0].id)
} else {
  this.setState({error: true});
}
};

render() {
  return(
    <div className="App">
    <Form loadweather={this.getWeather}
    error={this.state.error} />
    < Weather 
    city={this.state.city}
    country={this.state.country}
    temp_celsius={this.state.celsius}
    temp_max={this.state.temp_max}
    temp_min={this.state.temp_min}
    description={this.state.description}
    weathericon={this.state.icon}
     />
  </div>
  );
}
}

export default App

