import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBaseComponent } from './weather-base.component';

describe('WeatherBaseComponent', () => {
  let component: WeatherBaseComponent;
  let fixture: ComponentFixture<WeatherBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
