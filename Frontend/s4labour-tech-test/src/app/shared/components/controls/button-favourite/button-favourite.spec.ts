import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFavourite } from './button-favourite';

describe('ButtonFavourite', () => {
  let component: ButtonFavourite;
  let fixture: ComponentFixture<ButtonFavourite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFavourite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFavourite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
