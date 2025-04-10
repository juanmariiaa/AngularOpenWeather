import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../../services/weather.service';
import { finalize } from 'rxjs';

@Component({ template: '' })
export abstract class WeatherBaseComponent {
  protected form: FormGroup;
  loading = false;
  protected results: any[] = [];

  protected fb = inject(FormBuilder);
  protected weatherService = inject(WeatherService);
  protected snackBar = inject(MatSnackBar);

  constructor() {
    this.form = this.fb.group({
      cityIds: ['', Validators.required]
    });
  }

  protected abstract fetchSingleCity(cityId: number): void;
  protected abstract fetchMultipleCities(cityIds: string): void;

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const cityIds = this.form.get('cityIds')?.value;

      if (cityIds.includes(',')) {
        this.fetchMultipleCities(cityIds);
      } else {
        this.fetchSingleCity(parseInt(cityIds));
      }
    }
  }

  protected handleError(error: any, type: 'weather' | 'forecast') {
    let message = `An error occurred while fetching ${type} data`;
    if (error.status === 404) {
      message = 'City not found';
    }
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}