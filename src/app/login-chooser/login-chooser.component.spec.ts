import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChooserComponent } from './login-chooser.component';

describe('LoginChooserComponent', () => {
  let component: LoginChooserComponent;
  let fixture: ComponentFixture<LoginChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
