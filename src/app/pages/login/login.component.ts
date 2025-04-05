import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { InputComponent } from '../../components/input/input.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CoreModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  toggleDialog: boolean = false;

  handleUsernameChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.username = target.value;
    console.log('Username changed:', this.username);
  };

  handlePasswordChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.password = target.value;
    console.log('Password changed:', this.password);
  };

  handleLogin = () => {
    console.log('Logging in with', this.username, this.password);
    if (this.toggleDialog) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
      });
    }
    this.toggleDialog = !this.toggleDialog;
  };
}
