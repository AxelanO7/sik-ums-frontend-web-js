import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  defaultClass =
    'font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105';
  @Input() customClass: string = '';
  @Input() bgColor: string = 'bg-blue-400';
  @Input() textColor: string = 'text-white';
  @Input() handleOnClick: () => void = () => {};
}
