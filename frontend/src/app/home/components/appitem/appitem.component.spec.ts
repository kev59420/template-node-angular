import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppitemComponent } from './appitem.component';

describe('AppitemComponent', () => {
  let component: AppitemComponent;
  let fixture: ComponentFixture<AppitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppitemComponent]
    });
    fixture = TestBed.createComponent(AppitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
