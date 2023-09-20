import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagination1Component } from './pagination1.component';

describe('Pagination1Component', () => {
  let component: Pagination1Component;
  let fixture: ComponentFixture<Pagination1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pagination1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pagination1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
