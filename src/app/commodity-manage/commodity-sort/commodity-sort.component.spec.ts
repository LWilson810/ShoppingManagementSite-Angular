import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditySortComponent } from './commodity-sort.component';

describe('CommoditySortComponent', () => {
  let component: CommoditySortComponent;
  let fixture: ComponentFixture<CommoditySortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditySortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
