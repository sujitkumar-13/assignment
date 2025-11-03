import { Component } from '@angular/core';
import { SigningForm } from './signing-form/signing-form';

@Component({
  selector: 'app-sign-files',
  standalone: true,
  imports: [SigningForm],
  templateUrl: './sign-files.html',
  styleUrl: './sign-files.css',
})
export class SignFiles {

}
