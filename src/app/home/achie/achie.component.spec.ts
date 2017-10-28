import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchieComponent } from './achie.component';

describe('AchieComponent', () => {
  let component: AchieComponent;
  let fixture: ComponentFixture<AchieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
