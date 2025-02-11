import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';

@NgModule({
  imports: [CommonModule, ButtonComponent],
  exports: [ButtonComponent],
  declarations: [],
  providers: [],
  bootstrap: [],
})
export class CoreModule {}
