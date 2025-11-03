import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateExpiry } from './certficate-expiry';

// import { CertficateEx/piry } from './certficate-expiry';

describe('CertificateExpiry', () => {
  let component: CertificateExpiry;
  let fixture: ComponentFixture<CertificateExpiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateExpiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateExpiry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
