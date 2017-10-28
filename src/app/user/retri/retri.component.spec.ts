import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetriComponent } from './retri.component';

describe('RetriComponent', () => {
  let component: RetriComponent;
  let fixture: ComponentFixture<RetriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
