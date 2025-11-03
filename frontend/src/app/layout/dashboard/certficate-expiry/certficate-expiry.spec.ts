import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertficateExpiry } from './certficate-expiry';

describe('CertficateExpiry', () => {
  let component: CertficateExpiry;
  let fixture: ComponentFixture<CertficateExpiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertficateExpiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertficateExpiry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
