import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { WeatherBaseComponent } from '../weather-base/weather-base.component';
import { WeatherData } from '../../interfaces/weather.interface';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent extends WeatherBaseComponent {
  weatherResults: WeatherData[] = [];
  cityInputValue: string = '';


  addCity(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value.trim();

    if (value) {
      this.fetchSingleCity(parseInt(value)); 
    }

    input.value = '';
  }


  protected override fetchSingleCity(cityId: number): void {
    this.weatherService.getWeatherByCity(cityId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.weatherResults = [data];
        },
        error: (error) => {
          this.handleError(error, 'weather');
        }
      });
  }


  protected override fetchMultipleCities(cityIds: string): void {
    this.weatherService.getWeatherByCities(cityIds)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.weatherResults = data;
        },
        error: (error) => {
          this.handleError(error, 'weather');
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
    
    return 'cloud';
  }
}
