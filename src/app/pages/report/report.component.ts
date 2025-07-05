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
  loading = false; // Tambahkan state loading
  tableHeaders = ['Bulan', 'Pemasukan', 'Pengeluaran', 'Laba Rugi'];
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

  get totalLabaRugi(): number {
    return this.totalPemasukan - this.totalPengeluaran;
  }

  ngOnInit(): void {
    this.fetchReport();
  }

  private fetchReport(): void {
    this.loading = true; // Mulai loading
    const backendUrl = 'https://ums-stion-be.vercel.app/api';
    fetch(`${backendUrl}/report/by-year/2025`)
      .then((res) => res.json())
      .then((data) => {
        this.tableData = data.month.reduce(
          (
            result: {
              month: string;
              income: number;
              outcome: number;
            }[],
            monthData: {
              month: number;
              income: { date: string; type: 'income'; total: number }[];
              outcome: { date: string; type: 'outcome'; total: number }[];
            }
          ) => {
            result.push({
              month: new Date(
                `2025-${
                  monthData.month < 10 ? '0' + monthData.month : monthData.month
                }`
              ).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
              }),
              income: monthData.income.reduce(
                (sum, item) => sum + item.total,
                0
              ),
              outcome: monthData.outcome.reduce(
                (sum, item) => sum + item.total,
                0
              ),
            });
            return result;
          },
          []
        );
        this.loading = false; // Selesai loading
      })
      .catch((err) => {
        this.loading = false; // Selesai loading (jika gagal)
        Swal.fire('Error', 'Gagal memuat data laporan.', 'error');
      });
  }

  printReport(): void {
    window.print();
  }
}