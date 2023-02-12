import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { PokemonService } from '../shared/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/env';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  offset = 0;
  pokemonList: any[] = [];

  // pokemon: AllPokemonWrapper[] = [];
  nextUrl = environment.apiUrl + 'pokemon';

  searchData = '';

  constructor(
    private mainService: MainService,
    private pokemonService: PokemonService,
    private http: HttpClient,
    // private subscription: Subscription,
  ) {

  }

  ngOnInit(): void {
    this.getPokemonData();
    // this.pokemonService.getAllPokemon(this.offset).subscribe(
    //   data => console.log(data));
    // this.loadMore();
    // this.getPokemonData();
    // this.mainService.getPokemonData('https://pokeapi.co/api/v2/pokemon/491/').subscribe(data => console.log('poke', typeof data, data));
    // this.mainService.getOnePokemon().subscribe(data => console.log('poke', typeof data, data));
  }



  getPokemonData() {
    this.pokemonService.getPokemons(this.offset).subscribe(
      (data: any) => {
        data.results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonData(pokemon.url).subscribe(
            (pokeData: any) => {
              this.pokemonList.push(pokeData);
              // console.log(this.pokemonList);
            }
          )
        });
        this.offset += 50;
      }
    )
  }

  getMoreData(){
    this.getPokemonData();
  }

  searchPokemon() {
    if (this.searchData.length > 0) {
      this.defaultSettings();
      this.pokemonService.searchPokemon(this.searchData).subscribe(
        data => this.pokemonList.push(data)
      )
    }
    
  }

  resetData() {
    this.defaultSettings();
    this.searchData = '';
    this.getPokemonData();
  }

  defaultSettings() {
    this.offset = 0;
    this.pokemonList = [];
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
      this.getMoreData();
    }
  }
}
