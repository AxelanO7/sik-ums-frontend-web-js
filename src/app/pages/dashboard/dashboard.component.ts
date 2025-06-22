import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';

@Component({
  selector: 'app-dashboard',
  imports: [AppLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentDate: string = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  totalIncome: number = 0;
  totalOutcome: number = 0;
  totalBalance: number = 0;

  constructor() {
    this.fetchTotal();
  }

  private fetchTotal() {
    const backendUrl =
      process.env['APP_ENV'] === 'production'
        ? process.env['PROD_BACKEND_URL']
        : process.env['LOCAL_BACKEND_URL'];
    fetch(`${backendUrl}/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        this.totalIncome = data.totalIncome;
        this.totalOutcome = data.totalOutcome;
        this.totalBalance = data.totalBalance;
      });
  }
}
