import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcDetailsComponent } from './bc-details.component';

describe('BcDetailsComponent', () => {
  let component: BcDetailsComponent;
  let fixture: ComponentFixture<BcDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BcDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
