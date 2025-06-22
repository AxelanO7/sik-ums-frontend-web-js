import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css'],
})
export class AppSidebarComponent {
  @Input() isOpen = false;

  sidebarItem = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Pemasukan', link: '/income', icon: 'trending_up' },
    { name: 'Pengeluaran', link: '/outcome', icon: 'trending_down' },
    { name: 'Laporan', link: '/report', icon: 'assessment' },
  ];

  constructor(public router: Router) {}

  handleLogout() {
    Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: 'Anda akan diarahkan ke halaman login.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }
}
