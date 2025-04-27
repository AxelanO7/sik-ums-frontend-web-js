import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outcome',
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './outcome.component.html',
  styleUrl: './outcome.component.css',
})
export class OutcomeComponent {
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

  get totalOutcome(): number {
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
