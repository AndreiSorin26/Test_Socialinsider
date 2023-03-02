import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsStatisticsComponent } from './brands-statistics.component';

describe('BrandsStatisticsComponent', () => {
  let component: BrandsStatisticsComponent;
  let fixture: ComponentFixture<BrandsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
