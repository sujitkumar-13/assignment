import { Component } from '@angular/core';
import { RecentActivity } from './recent-activity/recent-activity';
import { CertficateExpiry } from './certficate-expiry/certficate-expiry';

@Component({
  selector: 'app-dashboard',
  standalone: true,
   imports: [RecentActivity, CertficateExpiry],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
