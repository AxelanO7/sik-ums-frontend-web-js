import { Component } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { defaultDataIncome } from '../../common/constant/data';

@Component({
  selector: 'app-income',
  imports: [AppLayoutComponent, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent {
  tableHeaders = ['Tanggal', 'Nama Item', 'Harga', 'Jumlah', 'Total'];
  tableData = defaultDataIncome;

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

  ngOnInit(): void {
    this.fetchIncome();
  }

  private fetchIncome(): void {
    fetch('http://localhost:3000/api/income')
      .then((res) => res.json())
      .then((data) => (this.tableData = data));
  }
}
