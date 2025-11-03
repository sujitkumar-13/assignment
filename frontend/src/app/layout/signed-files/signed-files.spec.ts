import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedFiles } from './signed-files';

describe('SignedFiles', () => {
  let component: SignedFiles;
  let fixture: ComponentFixture<SignedFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignedFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
