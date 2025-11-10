import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBcClientComponent } from './add-bc-client.component';

describe('AddBcClientComponent', () => {
  let component: AddBcClientComponent;
  let fixture: ComponentFixture<AddBcClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBcClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBcClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
