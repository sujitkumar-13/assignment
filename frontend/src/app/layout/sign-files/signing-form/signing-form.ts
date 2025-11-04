import { Component, OnInit, OnDestroy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FileSigningService } from '../../../services/file-signing.service';
import { CertificateService } from '../../../services/certificate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signing-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './signing-form.html',
  styleUrl: './signing-form.css',
})
export class SigningForm implements OnInit, OnDestroy {
  certificates: any[] = [];
  selectedCertificate: string | null = null;
  selectedFile: File | null = null;
  dropdownOpen = false;

  private handleClickOutside!: (event: MouseEvent) => void;

  constructor(
    private fileSigningService: FileSigningService,
    private certificateService: CertificateService
  ) {}

  ngOnInit() {
    this.loadCertificates();

    this.handleClickOutside = (event: MouseEvent) => {
      const select = document.querySelector('.custom-select') as HTMLElement;
      if (this.dropdownOpen && select && !select.contains(event.target as Node)) {
        this.dropdownOpen = false;
      }
    };
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  loadCertificates() {
    this.certificateService.getCertificates().subscribe({
      next: (data) => (this.certificates = data.filter((c) => c.status === 'ACTIVE')),
      error: (err) => console.error('Error fetching certificates', err),
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCertificate(certName: string, event: MouseEvent) {
    event.stopPropagation();
    this.selectedCertificate = certName;
    this.dropdownOpen = false;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  signFile() {
    if (!this.selectedFile || !this.selectedCertificate) {
      alert('Please select both a file and a certificate');
      return;
    }

    const payload = {
      fileName: this.selectedFile.name,
      certificateName: this.selectedCertificate,
    };

    this.fileSigningService.signFile(payload).subscribe({
      next: () => {
        alert('✅ File signed successfully!');
        this.selectedFile = null;
        this.selectedCertificate = null;
        (document.getElementById('file') as HTMLInputElement).value = '';
      },
      error: (err) => {
        console.error('Signing failed', err);
        alert('❌ Failed to sign file');
      },
    });
  }
}
