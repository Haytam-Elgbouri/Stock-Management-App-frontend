import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectArticleDialogComponent } from './select-article-dialog.component';

describe('SelectArticleDialogComponent', () => {
  let component: SelectArticleDialogComponent;
  let fixture: ComponentFixture<SelectArticleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectArticleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
