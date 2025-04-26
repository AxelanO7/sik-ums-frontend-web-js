import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { InputComponent } from '../../common/components/input/input.component';
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
  };

  handlePasswordChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.password = target.value;
  };

  handleLogin = () => {
    if (this.username === 'admin' && this.password === 'admin') {
      window.location.href = '/dashboard';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
      });
    }
  };
}
