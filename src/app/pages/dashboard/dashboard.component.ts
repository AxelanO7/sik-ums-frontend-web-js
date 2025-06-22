import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Make sure this component is standalone
  imports: [CommonModule, AppLayoutComponent], // Add CommonModule here
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
    // Using a mock fetch for demonstration
    fetch(`${process.env['BACKEND_URL']}/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        // Example data:
        // { totalIncome: 50000000, totalOutcome: 21500000, totalBalance: 28500000 }
        this.totalIncome = data.totalIncome;
        this.totalOutcome = data.totalOutcome;
        this.totalBalance = data.totalBalance;
      })
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }
}
