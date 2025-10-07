import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlsComponent } from './view-bls.component';

describe('ViewBlsComponent', () => {
  let component: ViewBlsComponent;
  let fixture: ComponentFixture<ViewBlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
