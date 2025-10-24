import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorDialogComponent } from './add-color-dialog.component';

describe('AddColorDialogComponent', () => {
  let component: AddColorDialogComponent;
  let fixture: ComponentFixture<AddColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddColorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
