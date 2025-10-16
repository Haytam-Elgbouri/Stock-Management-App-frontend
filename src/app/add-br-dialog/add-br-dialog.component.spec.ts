import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrDialogComponent } from './add-br-dialog.component';

describe('AddBrDialogComponent', () => {
  let component: AddBrDialogComponent;
  let fixture: ComponentFixture<AddBrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBrDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
