import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css',
})
export class AppSidebarComponent {
  sidebarItem = [
    {
      name: 'Home',
      link: '/dashboard',
      icon: 'home',
    },
    {
      name: 'Pemasukan',
      link: '/income',
      icon: 'payment',
    },
    {
      name: 'Pengeluaran',
      link: '/outcome',
      icon: 'request_quote',
    },
    {
      name: 'Laporan',
      link: '/report',
      icon: 'description',
    },
  ];

  handleLogout = () => {
    Swal.fire({
      title: 'Anda yakin?',
      text: 'Anda tidak dapat membatalkan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Keluar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Keluar!', 'Anda telah keluar.', 'success');
        window.location.href = '/login';
      }
    });
  };

  constructor(public router: Router) {}
}
