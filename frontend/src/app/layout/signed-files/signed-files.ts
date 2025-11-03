import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Add this
import { SignedFileService } from '../../services/signed-file.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-signed-file',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './signed-files.html',
  styleUrls: ['./signed-files.css'],
})
export class SignedFiles implements OnInit {
  signedFiles: any[] = [];
  filteredFiles: any[] = [];
  loading = true;
  searchTerm: string = '';

  constructor(private signedFileService: SignedFileService) {}

  ngOnInit() {
    this.loadSignedFiles();
  }

  loadSignedFiles() {
    this.loading = true;
    this.signedFileService.getSignedFiles().subscribe({
      next: (data) => {
        this.signedFiles = data.sort(
          (a: any, b: any) =>
            new Date(b.signedDate).getTime() - new Date(a.signedDate).getTime()
        );

        this.filteredFiles = [...this.signedFiles];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading signed files:', err);
        this.loading = false;
      },
    });
  }

  filterFiles() {
    const term = this.searchTerm.toLowerCase();

    this.filteredFiles = this.signedFiles.filter((file) =>
      file.fileName.toLowerCase().includes(term) ||
      file.certificateName.toLowerCase().includes(term)
    );
  }

  downloadFile(file: any) {
    if (!file.downloadUrl) {
      alert('Download link not available.');
      return;
    }

    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.fileName;
    link.click();
  }
}
