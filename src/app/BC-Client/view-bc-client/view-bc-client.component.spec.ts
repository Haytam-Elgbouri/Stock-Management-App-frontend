import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBcClientComponent } from './view-bc-client.component';

describe('ViewBcClientComponent', () => {
  let component: ViewBcClientComponent;
  let fixture: ComponentFixture<ViewBcClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBcClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBcClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
