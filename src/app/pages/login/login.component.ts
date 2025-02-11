import { Component } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: 'app-login',
  imports: [CoreModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor() {}

  tapLogin() {
    console.log('Login tapped');
  }
}
