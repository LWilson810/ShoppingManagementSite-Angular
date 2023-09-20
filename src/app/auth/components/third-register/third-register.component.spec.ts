import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdRegisterComponent } from './third-register.component';

describe('ThirdRegisterComponent', () => {
  let component: ThirdRegisterComponent;
  let fixture: ComponentFixture<ThirdRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
