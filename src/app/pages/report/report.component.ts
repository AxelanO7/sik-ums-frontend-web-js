import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
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

  ngOnInit(): void {
    this.fetchReport();
  }

  private fetchReport(): void {
    // URL is now hardcoded as requested
    const backendUrl = 'https://ums-stion-be.vercel.app/api';
    fetch(`${backendUrl}/report`)
      .then((res) => res.json())
      .then((data) => (this.tableData = data))
      .catch((err) =>
        Swal.fire('Error', 'Gagal memuat data laporan.', 'error')
      );
  }
}
