import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteUsersPage } from './favourite-users.page';

describe('FavouriteUsersPage', () => {
  let component: FavouriteUsersPage;
  let fixture: ComponentFixture<FavouriteUsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteUsersPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteUsersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
