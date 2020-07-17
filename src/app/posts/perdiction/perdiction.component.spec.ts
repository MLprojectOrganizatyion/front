import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdictionComponent } from './perdiction.component';

describe('PerdictionComponent', () => {
  let component: PerdictionComponent;
  let fixture: ComponentFixture<PerdictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
