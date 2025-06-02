import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  tableHeaders = ['Bulan', 'Pemasukan', 'Pengeluaran'];
  tableData: {
    month: string;
    income: number;
    outcome: number;
  }[] = [];

  get totalPemasukan(): number {
    return this.tableData.reduce((sum, row) => sum + row.income, 0);
  }

  get totalPengeluaran(): number {
    return this.tableData.reduce((sum, row) => sum + row.outcome, 0);
  }

  shownComingSoon() {
    return Swal.fire({
      icon: 'info',
      title: 'Coming Soon',
      text: 'Fitur ini masih dalam tahap pengembangan',
    });
  }

  ngOnInit(): void {
    // this.fetchReport();
  }

  private fetchReport(): void {
    fetch('http://localhost:3000/api/report')
      .then((res) => res.json())
      .then((data) => (this.tableData = data));
  }
}
