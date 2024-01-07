import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [text]="titleLabel()"/>

    @if ( user() ) {
      <section>
        <img
          [srcset]="user()!.avatar"
          [alt]="user()!.first_name">

        <div>
          <h3> {{ user()?.first_name }} {{ user()?.last_name }} </h3>
          <p> {{ user()?.email }} </p>
        </div>
      </section>
    } @else {
      <p>Cargando Información...</p>
    }
  `
})
export default class UserComponent {

  #route = inject ( ActivatedRoute );
  #usersService = inject ( UsersService )
  // user  = signal <User|undefined> ( undefined );

  user  = toSignal (
    this.#route.params.pipe (
      switchMap ( ( { id } ) => this.#usersService.getUserById ( id ) )
    )
  );

  titleLabel = computed ( () => {
    if ( this.user() ) {
      return `Información del Usuario: ${ this.user()?.first_name } ${ this.user()?.last_name }`;
    } else {
      return 'Aún no hay información del usuario';
    }
  } );

}
