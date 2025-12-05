import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNoAuth } from './navbar-no-auth';

describe('NavbarNoAuth', () => {
  let component: NavbarNoAuth;
  let fixture: ComponentFixture<NavbarNoAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarNoAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarNoAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
