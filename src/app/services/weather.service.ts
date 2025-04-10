import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://flaskopenweatherapi.onrender.com/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCity(cityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/city/${cityId}`);
  }

  getWeatherByCities(cityIds: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cities`, { params: { city_ids: cityIds } });
  }

  getForecastByCity(cityId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast/${cityId}`);
  }

  getForecastByCities(cityIds: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast`, { params: { city_ids: cityIds } });
  }

  getWeatherByName(cityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name/${cityName}`);
  }

  getForecastByName(cityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast/name/${cityName}`);
  }

  getWeatherByNames(cityNames: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/names`, { params: { city_names: cityNames } });
  }

  getForecastByNames(cityNames: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast/names`, { params: { city_names: cityNames } });
  }
}
