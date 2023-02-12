import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  offset = 0;
  pokemonList: any[] = [];
  searchData = '';

  constructor(
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.getPokemonData();
  }

  getPokemonData() {
    this.pokemonService.getPokemons(this.offset).subscribe(
      (data: any) => {
        data.results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonData(pokemon.url).subscribe(
            (pokeData: any) => {
              this.pokemonList.push(pokeData);
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
