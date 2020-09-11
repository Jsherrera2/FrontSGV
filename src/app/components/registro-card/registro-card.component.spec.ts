import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCardComponent } from './registro-card.component';

describe('RegistroCardComponent', () => {
  let component: RegistroCardComponent;
  let fixture: ComponentFixture<RegistroCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
