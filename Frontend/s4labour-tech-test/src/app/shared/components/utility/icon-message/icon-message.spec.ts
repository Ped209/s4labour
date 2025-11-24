import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMessage } from './icon-message';

describe('IconMessage', () => {
  let component: IconMessage;
  let fixture: ComponentFixture<IconMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
