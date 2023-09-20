import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSortComponent } from './staff-sort.component';

describe('StaffSortComponent', () => {
  let component: StaffSortComponent;
  let fixture: ComponentFixture<StaffSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
