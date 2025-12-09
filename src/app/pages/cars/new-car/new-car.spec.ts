import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCar } from './new-car';

describe('NewCar', () => {
  let component: NewCar;
  let fixture: ComponentFixture<NewCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
