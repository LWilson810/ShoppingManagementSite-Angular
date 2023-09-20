import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityManageComponent } from './commodity-manage.component';

describe('CommodityManageComponent', () => {
  let component: CommodityManageComponent;
  let fixture: ComponentFixture<CommodityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
