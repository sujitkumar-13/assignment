import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService, Activity } from '../../../services/activity.service';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.css',
})
export class RecentActivity implements OnInit {
  activities: Activity[] = [];
  loading = true;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.fetchActivities();
  }

  fetchActivities() {
    this.loading = true;
    this.activityService.getRecentActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load recent activities', err);
        this.loading = false;
      }
    });
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }
}
