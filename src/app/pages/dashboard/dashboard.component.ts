import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AppLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentDate: string = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  totalIncome: number = 0;
  totalOutcome: number = 0;
  totalBalance: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.fetchTotal();
  }

  private fetchTotal() {
    // URL is now hardcoded as requested
    const backendUrl = 'https://ums-stion-be.vercel.app/api';
    fetch(`${backendUrl}/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        this.totalIncome = data.totalIncome;
        this.totalOutcome = data.totalOutcome;
        this.totalBalance = data.totalBalance;
      })
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }
}
