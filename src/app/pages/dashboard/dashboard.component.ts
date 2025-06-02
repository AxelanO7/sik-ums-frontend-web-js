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
    fetch('http://localhost:3000/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        this.totalIncome = data.totalIncome;
        this.totalOutcome = data.totalOutcome;
        this.totalBalance = data.totalBalance;
      });
  }
}
