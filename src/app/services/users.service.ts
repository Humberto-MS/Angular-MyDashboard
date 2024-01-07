import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { User, UserResponse, UsersResponse } from '@interfaces/req-response.interface';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  #http = inject ( HttpClient );
  url = 'https://reqres.in/api/users';

  // # hace que la variable/propiedad sea privada pero al hacer la transpilación de ts a js
  // sigue siendo privada y no se puede usar por fuera

  // private tambien la hace privada pero al hacer la transpilación de ts a js
  // se puede usar aun asi como si fuera pública
  #state = signal <State> ({
    loading: true,
    users: []
  });

  users = computed ( () => this.#state().users );
  loading = computed ( () => this.#state().loading );

  constructor() {
    this.#http.get <UsersResponse> ( this.url )
      .pipe ( delay ( 1500 ) )
      .subscribe ( resp => {
        this.#state.set ({
          loading: false,
          users: resp.data
        });
      } );
  }

  getUserById ( id: string ) {
    return this.#http.get <UserResponse> ( `${ this.url }/${ id }` )
      .pipe (
        delay ( 1500 ),
        map ( resp => resp.data )
      );
  }
}
