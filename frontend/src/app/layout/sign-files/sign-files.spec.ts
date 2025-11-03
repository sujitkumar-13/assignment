import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFiles } from './sign-files';

describe('SignFiles', () => {
  let component: SignFiles;
  let fixture: ComponentFixture<SignFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
