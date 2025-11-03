import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-signing-form',
  imports: [LucideAngularModule],
  templateUrl: './signing-form.html',
  styleUrl: './signing-form.css',
})
export class SigningForm {

  private handleClickOutside!: (event: MouseEvent) => void;

  ngAfterViewInit() {
    const select = document.querySelector('.custom-select') as HTMLElement;
    const selected = select.querySelector('.selected') as HTMLElement;
    const options = select.querySelectorAll('.option');

    selected.addEventListener('click', (e) => {
      e.stopPropagation();
      select.classList.toggle('active');
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        selected.innerHTML = option.innerHTML;
        select.classList.remove('active');
      });
    });

    this.handleClickOutside = (event: MouseEvent) => {
      if (!select.contains(event.target as Node)) {
        select.classList.remove('active');
      }
    };

    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
