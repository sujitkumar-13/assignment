import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class Certificates implements OnInit {
  certificates: any[] = [];
  paginatedCertificates: any[] = [];
  loading = true;
  showForm = false;

  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  certificate = {
    certificateName: '',
    issuerName: '',
    validFrom: '',
    validTo: '',
    status: 'ACTIVE'
  };

  constructor(private certificateService: CertificateService) { }

  ngOnInit() {
    this.loadCertificates();
    setInterval(() => {
    this.loadCertificates();
  }, 60000);
  }

 loadCertificates() {
  this.loading = true;
  this.certificateService.getCertificates().subscribe({
    next: (data) => {
      const now = new Date();

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
      }).sort((a: any, b: any) =>
        new Date(b.validFrom).getTime() - new Date(a.validFrom).getTime()
      );

      this.totalPages = Math.ceil(this.certificates.length / this.itemsPerPage);
      this.setPage(1);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching certificates:', err);
      this.loading = false;
    }
  });
}


  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCertificates = this.certificates.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.setPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 1) this.setPage(this.currentPage - 1);
  }

  openForm() {
    const now = new Date();

    const formatForInput = (d: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const yyyy = d.getFullYear();
      const mm = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const hh = pad(d.getHours());
      const min = pad(d.getMinutes());
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    };

    const validFrom = formatForInput(now);
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + 397);
    const validTo = formatForInput(expiry);

    this.certificate.validFrom = validFrom;
    this.certificate.validTo = validTo;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  onBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeForm();
    }
  }

  createCertificate() {
    const toUTC = (localDateTime: string) => {
      const localDate = new Date(localDateTime);
      const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
      return utcDate.toISOString();
    };

    const certificateToSend = {
      ...this.certificate,
      validFrom: toUTC(this.certificate.validFrom),
      validTo: toUTC(this.certificate.validTo)
    };

    this.certificateService.createCertificate(certificateToSend).subscribe({
      next: (newCert) => {
        alert('Certificate created successfully!');

        this.certificates.unshift(newCert);
        this.totalPages = Math.ceil(this.certificates.length / this.itemsPerPage);
        this.setPage(1);

        this.certificate = {
          certificateName: '',
          issuerName: '',
          validFrom: '',
          validTo: '',
          status: 'ACTIVE'
        };
        this.closeForm();
      },
      error: (err) => {
        alert(' Failed to create certificate');
        console.error(err);
      }
    });
  }
}
