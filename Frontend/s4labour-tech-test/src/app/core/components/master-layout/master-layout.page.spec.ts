import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLayoutPage } from './master-layout.page';

describe('MasterLayoutPage', () => {
  let component: MasterLayoutPage;
  let fixture: ComponentFixture<MasterLayoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterLayoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterLayoutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
