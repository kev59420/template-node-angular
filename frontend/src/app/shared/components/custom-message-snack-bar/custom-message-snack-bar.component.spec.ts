import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageSnackBarComponent } from './custom-message-snack-bar.component';

describe('CustomMessageSnackBarComponent', () => {
  let component: CustomMessageSnackBarComponent;
  let fixture: ComponentFixture<CustomMessageSnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomMessageSnackBarComponent]
    });
    fixture = TestBed.createComponent(CustomMessageSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
