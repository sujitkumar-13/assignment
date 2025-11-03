import { Routes } from '@angular/router';
import { Dashboard } from './layout/dashboard/dashboard';
import { Certificates } from './layout/certificates/certificates';
import { SignFiles } from './layout/sign-files/sign-files';
import { SignedFiles } from './layout/signed-files/signed-files';


export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'certificates', component: Certificates },
  { path: 'sign-files', component: SignFiles },
  { path: 'signed-files', component: SignedFiles },
];
