import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'heavy-loaders-fast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="[ 'w-full', cssClass ]">
      <ng-content></ng-content>
    </section>
  `,
})
export class HeavyLoadersFastComponent {

  @Input ( { required: true } )
  public cssClass!: string;

  constructor() {
    console.log ( 'Heavy Loader Fast cargado' );
  }

}
