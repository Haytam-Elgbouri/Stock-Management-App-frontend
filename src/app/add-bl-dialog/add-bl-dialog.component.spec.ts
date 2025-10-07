import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlDialogComponent } from './add-bl-dialog.component';

describe('AddBlDialogComponent', () => {
  let component: AddBlDialogComponent;
  let fixture: ComponentFixture<AddBlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBlDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
