import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotes } from './user-notes';

describe('UserNotes', () => {
  let component: UserNotes;
  let fixture: ComponentFixture<UserNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
