import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertKeywordComponent } from './insert-keyword.component';

describe('InsertKeywordComponent', () => {
  let component: InsertKeywordComponent;
  let fixture: ComponentFixture<InsertKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertKeywordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
