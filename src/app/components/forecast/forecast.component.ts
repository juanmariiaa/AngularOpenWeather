import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { WeatherBaseComponent } from '../weather-base/weather-base.component';
import { ForecastData } from '../../interfaces/weather.interface';
import { finalize } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule
  ],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent extends WeatherBaseComponent {
  forecastResults: ForecastData[] = [];
  displayedColumns: string[] = ['date', 'temperature', 'description'];

  protected override fetchSingleCity(cityId: number): void {
    this.weatherService.getForecastByCity(cityId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.forecastResults = [data];
        },
        error: (error) => {
          this.handleError(error, 'forecast');
        }
      });
  }
  cityIdArray: string[] = [];

removeCity(cityId: string) {
  this.cityIdArray = this.cityIdArray.filter(id => id !== cityId);
  // Update your form control accordingly
}

  protected override fetchMultipleCities(cityIds: string): void {
    this.weatherService.getForecastByCities(cityIds)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.forecastResults = data;
        },
        error: (error) => {
          this.handleError(error, 'forecast');
        }
      });
  }

  getWeatherIcon(description: string): string {
    description = description.toLowerCase();
    
    if (description.includes('thunderstorm') || description.includes('thunderstorm with light rain')) {
      return 'flash_on';
    } else if (description.includes('light intensity drizzle') || description.includes('drizzle')) {
      return 'grain';
    } else if (description.includes('light rain') || description.includes('rain')) {
      return 'water_drop';
    } else if (description.includes('light snow') || description.includes('snow')) {
      return 'ac_unit';
    } else if (description.includes('mist')) {
      return 'foggy';
    } else if (description.includes('clear sky')) {
      return 'wb_sunny';
    } else if (description.includes('few clouds')) {
      return 'cloud';
    } else if (description.includes('scattered clouds')) {
      return 'cloud_queue';
    } else if (description.includes('broken clouds')) {
      return 'filter_drama';
    } else if (description.includes('overcast clouds')) {
      return 'cloud';
    }
    
    return 'cloud'; // default icon
  }
}