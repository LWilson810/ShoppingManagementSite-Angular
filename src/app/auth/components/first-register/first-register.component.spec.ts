import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRegisterComponent } from './first-register.component';

describe('FirstRegisterComponent', () => {
  let component: FirstRegisterComponent;
  let fixture: ComponentFixture<FirstRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
