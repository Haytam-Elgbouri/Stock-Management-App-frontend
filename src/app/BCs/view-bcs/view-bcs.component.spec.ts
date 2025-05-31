import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBCsComponent } from './view-bcs.component';

describe('ViewBCsComponent', () => {
  let component: ViewBCsComponent;
  let fixture: ComponentFixture<ViewBCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBCsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
