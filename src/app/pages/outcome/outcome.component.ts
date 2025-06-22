import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../common/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

interface OutcomeItem {
  id: string;
  date: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

@Component({
  selector: 'app-outcome',
  standalone: true,
  imports: [AppLayoutComponent, CommonModule, MatIconModule],
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css'],
})
export class OutcomeComponent implements OnInit {
  tableHeaders = ['Tanggal', 'Nama Item', 'Harga', 'Jumlah', 'Total'];
  tableData: OutcomeItem[] = [];

  // URL is now hardcoded as requested
  private backendUrl = 'https://ums-stion-be.vercel.app/api/outcome';

  get totalOutcome(): number {
    return this.tableData.reduce((sum, row) => sum + row.total, 0);
  }

  ngOnInit(): void {
    this.fetchOutcome();
  }

  private fetchOutcome(): void {
    fetch(this.backendUrl)
      .then((res) => res.json())
      .then(
        (data) =>
          (this.tableData = data.sort(
            (a: OutcomeItem, b: OutcomeItem) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          ))
      )
      .catch((err) =>
        Swal.fire('Error', 'Gagal memuat data pengeluaran.', 'error')
      );
  }

  handleAddItem(): void {
    this.showOutcomeForm();
  }

  handleEditItem(item: OutcomeItem): void {
    this.showOutcomeForm(item);
  }

  private showOutcomeForm(item?: OutcomeItem): void {
    Swal.fire({
      title: item ? 'Edit Pengeluaran' : 'Tambah Pengeluaran Baru',
      html: `
        <input id="name" class="swal2-input" placeholder="Nama Item" value="${
          item?.name || ''
        }">
        <input id="price" type="number" class="swal2-input" placeholder="Harga" value="${
          item?.price || ''
        }">
        <input id="quantity" type="number" class="swal2-input" placeholder="Jumlah" value="${
          item?.quantity || ''
        }">
        <input id="date" type="date" class="swal2-input" value="${
          item
            ? new Date(item.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
        }">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement)
          .value;
        const price = parseFloat(
          (document.getElementById('price') as HTMLInputElement).value
        );
        const quantity = parseInt(
          (document.getElementById('quantity') as HTMLInputElement).value
        );
        const date = (document.getElementById('date') as HTMLInputElement)
          .value;

        if (!name || !price || !quantity || !date) {
          Swal.showValidationMessage('Mohon isi semua kolom');
          return false;
        }
        return {
          id: item?.id,
          name,
          price,
          quantity,
          date,
          total: price * quantity,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = result.value;
        const isEditing = !!item;

        const url = isEditing
          ? `${this.backendUrl}/${data.id}`
          : this.backendUrl;
        const method = isEditing ? 'PATCH' : 'POST';

        fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) throw new Error('Gagal menyimpan data!');
            return res.json();
          })
          .then(() => {
            Swal.fire(
              'Berhasil!',
              `Data pengeluaran berhasil ${
                isEditing ? 'diperbarui' : 'disimpan'
              }.`,
              'success'
            );
            this.fetchOutcome();
          })
          .catch((err) => Swal.fire('Error', err.message, 'error'));
      }
    });
  }

  handleDeleteItem(id: string): void {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${this.backendUrl}/${id}`, { method: 'DELETE' })
          .then((res) => {
            if (!res.ok) throw new Error('Gagal menghapus data!');
            Swal.fire(
              'Terhapus!',
              'Data pengeluaran berhasil dihapus.',
              'success'
            );
            this.fetchOutcome();
          })
          .catch((err) => Swal.fire('Error', err.message, 'error'));
      }
    });
  }
}
