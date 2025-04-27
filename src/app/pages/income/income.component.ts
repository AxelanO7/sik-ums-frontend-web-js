import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-income',
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent {
  tableHeaders = ['Tanggal', 'Nama Item', 'Harga', 'Jumlah', 'Total'];
  tableData = [
    {
      date: '01/01/2022',
      name: 'kertas sidu F4',
      price: 49500,
      quantity: 2,
      total: 99000,
    },
    {
      date: '04/01/2022',
      name: 'pulpen queen c-6000',
      price: 25500,
      quantity: 4,
      total: 102000,
    },
    {
      date: '07/01/2022',
      name: 'pulpen queen c-6000',
      price: 25500,
      quantity: 4,
      total: 102000,
    },
  ];

  get totalIncome(): number {
    return this.tableData.reduce((sum, row) => sum + row.total, 0);
  }

  shownComingSoon() {
    return Swal.fire({
      icon: 'info',
      title: 'Coming Soon',
      text: 'Fitur ini masih dalam tahap pengembangan',
    });
  }
}
