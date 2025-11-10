import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcClientDetailsComponent } from './bc-client-details.component';

describe('BcClientDetailsComponent', () => {
  let component: BcClientDetailsComponent;
  let fixture: ComponentFixture<BcClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BcClientDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
