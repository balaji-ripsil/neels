import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Promotion1Component } from './promotion1.component';

describe('Promotion1Component', () => {
  let component: Promotion1Component;
  let fixture: ComponentFixture<Promotion1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Promotion1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Promotion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
