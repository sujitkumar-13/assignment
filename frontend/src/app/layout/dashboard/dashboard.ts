import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateService } from '../../services/certificate.service';
import { SignedFileService } from '../../services/signed-file.service';
import { RecentActivity } from '../dashboard/recent-activity/recent-activity';
import { CertificateExpiry } from './certficate-expiry/certficate-expiry';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RecentActivity, CertificateExpiry],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  totalCertificates = 0;
  activeCertificates = 0;
  totalFilesSigned = 0;
  systemStatus = 'Operational';
  loading = true;

  constructor(
    private certificateService: CertificateService,
    private signedFileService: SignedFileService
  ) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.loading = true;

    this.certificateService.getCertificates().subscribe({
      next: (certs) => {
        this.totalCertificates = certs.length;
        this.activeCertificates = certs.filter((c: any) => c.status === 'ACTIVE').length;
      },
      error: (err) => console.error('Error fetching certificates', err)
    });

    this.signedFileService.getSignedFiles().subscribe({
      next: (files) => {
        this.totalFilesSigned = files.length;
      },
      error: (err) => console.error('Error fetching signed files', err),
      complete: () => {
        this.loading = false;
      }
    });
  }
}
