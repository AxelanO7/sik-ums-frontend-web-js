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
  tableData: {
    date: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[] = [];

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

  ngOnInit(): void {
    this.fetchOutcome();
  }

  private fetchOutcome(): void {
    fetch('http://localhost:3000/outcome')
      .then((res) => res.json())
      .then((data) => (this.tableData = data));
  }
}
