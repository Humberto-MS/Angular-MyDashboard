import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems = routes
    .map ( route => route.children ?? [] )
    .flat()
    .filter ( route => route && !route.path?.includes ( '**' ) )
    .filter ( route => !route.path!.includes ( ':' ) );

}
