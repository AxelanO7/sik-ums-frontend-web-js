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
  tableData = [
    {
      month: 'Januari',
      income: 49500,
      outcome: 102000,
    },
    {
      month: 'Februari',
      income: 102000,
      outcome: 102000,
    },
    {
      month: 'Maret',
      income: 102000,
      outcome: 102000,
    },
  ];

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
}
