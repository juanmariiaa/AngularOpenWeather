import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { 
    path: 'weather', 
    loadComponent: () => import('./components/weather/weather.component').then(m => m.WeatherComponent)
  },
  { 
    path: 'forecast', 
    loadComponent: () => import('./components/forecast/forecast.component').then(m => m.ForecastComponent)
  }
];