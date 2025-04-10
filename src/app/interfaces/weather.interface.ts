export interface WeatherData {
    city_id: number;
    city_name: string;
    temperature: number;
    description: string;
    timestamp: string;
  }
  
  export interface ForecastEntry {
    date: string;
    temperature: number;
    description: string;
  }
  
  export interface ForecastData {
    city_id: number;
    city_name: string;
    forecast: ForecastEntry[];
  }