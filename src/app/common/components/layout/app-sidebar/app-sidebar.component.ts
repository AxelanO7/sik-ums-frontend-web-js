import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css',
})
export class AppSidebarComponent {
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
}
