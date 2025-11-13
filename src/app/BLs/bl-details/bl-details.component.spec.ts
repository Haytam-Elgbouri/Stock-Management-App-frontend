import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlDetailsComponent } from './bl-details.component';

describe('BlDetailsComponent', () => {
  let component: BlDetailsComponent;
  let fixture: ComponentFixture<BlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
