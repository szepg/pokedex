import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/env';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public getPokemons(offset: number) {
    return this.http.get(this.apiUrl + 'pokemon?limit=50&offset=' + offset)
  }

  public getPokemonData(url: string) {
    return this.http.get(url);
  }

  public searchPokemon(input: string|number) {
    return this.http.get(this.apiUrl + 'pokemon/' + input);
  }

}
