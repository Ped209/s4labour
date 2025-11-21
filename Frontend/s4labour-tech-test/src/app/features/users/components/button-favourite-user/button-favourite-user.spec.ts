import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFavouriteUser } from './button-favourite-user';

describe('ButtonFavouriteUser', () => {
  let component: ButtonFavouriteUser;
  let fixture: ComponentFixture<ButtonFavouriteUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFavouriteUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFavouriteUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
