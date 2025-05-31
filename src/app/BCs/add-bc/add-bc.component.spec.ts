import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBCComponent } from './add-bc.component';

describe('AddBCComponent', () => {
  let component: AddBCComponent;
  let fixture: ComponentFixture<AddBCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
