import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrsComponent } from './view-brs.component';

describe('ViewBrsComponent', () => {
  let component: ViewBrsComponent;
  let fixture: ComponentFixture<ViewBrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
