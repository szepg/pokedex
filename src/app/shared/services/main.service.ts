import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/env';
import { AllPokemonWrapper, Pokemon, Stats } from '../models/pokemon.model';
import { Observable, map, forkJoin, flatMap, of } from 'rxjs';
// import { Pokemon } from '../models/pokemon-old.model';

// export interface AllPokemonWrapper {
//   next: string,
//   results: Pokemon[]
// }
// export interface Pokemon {
//   id: number,
//   name: string,
//   image: string;
//   stats: Stats[],
//   url: string;
// }

// export interface Stats {
//   base_stat: number,
//   stat: {
//     name: string;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllPokemonBasicData(nextUrl: string) {
    return this.http.get<AllPokemonWrapper>(nextUrl)
      .pipe(map((value) => this.transformData(value)));
  }

  //for testing
  public getOnePokemon() {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/491/')
    .pipe(map(value => this.transformPokemonData(value)))
  }

  public getPokemonData(url: string) {
    return this.http.get<Pokemon>(url).pipe(map(value => this.transformPokemonData(value)));
  }


  public transformData(value: AllPokemonWrapper) {
    // console.log('trData', value);
    return {
      next: value.next,
      results: value.results.map((item) => {
        return {
          name: item.name,
          url: item.url,
        }
      }),
    };
    // return {
    //   next: value.next,
    //   results: value.results.map((item) => this.getPokemonData(item.url).subscribe()),
    // };

    const pokemonDataObservables = value.results.map((poke) => this.getPokemonData(poke.url).subscribe);

    // console.log(forkJoin(pokemonDataObservables).pipe(
    //   map((pokemonData) => {
    //     return {
    //       next: value.next,
    //       results: pokemonData
    //     };
    //   })
    // ));

    // return forkJoin(pokemonDataObservables).pipe(
    //   map((pokemonData) => {
    //     return {
    //       next: value.next,
    //       results: pokemonData
    //     };
    //   })
    // );
  }


  public transformPokemonData(value: any) {
    // console.log('value', value);
    return {
      id: value.id,
      name: value.name,
      image: value.sprites.front_default,
      stats: value.stats,
      url: ''
    }
  }
}
