export interface City {
  id?: string;
  name: string;
  lat: number;
  long: number;
  country?: string;
}

export interface Weather {
  city: {
    name: string;
    sunrise: number;
    sunset: number;
  };
  list: WeatherObject[];
}

export interface WeatherObject {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: mainObject[];
}

export interface mainObject {
  main: string;
  description: string;
  icon: string;
}
