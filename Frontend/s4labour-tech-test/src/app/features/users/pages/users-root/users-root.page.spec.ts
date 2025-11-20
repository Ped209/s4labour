import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRootPage } from './users-root.page';

describe('UsersRootPage', () => {
  let component: UsersRootPage;
  let fixture: ComponentFixture<UsersRootPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRootPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRootPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
