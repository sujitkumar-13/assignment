import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateService } from '../../../services/certificate.service';

@Component({
  selector: 'app-certficate-expiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certficate-expiry.html',
  styleUrls: ['./certficate-expiry.css']
})
export class CertificateExpiry implements OnInit {
  certificates: any[] = [];
  loading = true;

  // ✅ Dynamic counters
  expiringSoonCount = 0;
  activeCount = 0;
  expiredCount = 0;

  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    this.loadCertificates();
  }

  loadCertificates() {
    this.loading = true;
    const now = new Date();

    this.certificateService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data.map((cert: any) => {
          const validTo = new Date(cert.validTo);
          const diffMs = validTo.getTime() - now.getTime();
          const diffDays = diffMs / (1000 * 60 * 60 * 24);

          if (diffMs <= 0) {
            cert.status = 'EXPIRED';
          } else if (diffDays <= 30) {
            cert.status = 'EXPIRING SOON';
          } else {
            cert.status = 'ACTIVE';
          }

          return cert;
        });

        // ✅ Calculate counts dynamically
        this.expiringSoonCount = this.certificates.filter(c => c.status === 'EXPIRING SOON').length;
        this.activeCount = this.certificates.filter(c => c.status === 'ACTIVE').length;
        this.expiredCount = this.certificates.filter(c => c.status === 'EXPIRED').length;

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching certificates:', err);
        this.loading = false;
      }
    });
  }
}
