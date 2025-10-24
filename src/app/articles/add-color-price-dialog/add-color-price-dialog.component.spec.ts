import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorPriceDialogComponent } from './add-color-price-dialog.component';

describe('AddColorPriceDialogComponent', () => {
  let component: AddColorPriceDialogComponent;
  let fixture: ComponentFixture<AddColorPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddColorPriceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColorPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
