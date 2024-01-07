import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1
      class="text-3xl mb-5">
      {{ text }}
    </h1>
  `
})
export class TitleComponent {

  @Input ( { required: true } )
  public text!: string;

  @Input ( { transform: booleanAttribute } )
  public withShadow: boolean = false;

}
