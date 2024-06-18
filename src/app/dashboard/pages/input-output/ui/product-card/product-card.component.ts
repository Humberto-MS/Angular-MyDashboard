import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  public producto = input.required <Product> ();
  public onIncrementQuantity = output <number> ();

  public incrementQuantity(): void {
    this.onIncrementQuantity.emit ( this.producto().quantity + 1 );
  }

  public logInEffect = effect ( () => {
    console.log ( this.producto().name );
  } );
}
