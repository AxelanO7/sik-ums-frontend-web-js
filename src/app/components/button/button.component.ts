import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  constructor() {
    console.log('ButtonComponent created');
  }

  onClick() {
    console.log('Button clicked');
  }
}
