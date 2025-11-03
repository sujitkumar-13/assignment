import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningForm } from './signing-form';

describe('SigningForm', () => {
  let component: SigningForm;
  let fixture: ComponentFixture<SigningForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigningForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigningForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
