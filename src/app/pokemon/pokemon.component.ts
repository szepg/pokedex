import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/models/pokemon.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon[] = [];

  constructor(
    private mainService: MainService,
  ) {

  }
  ngOnInit(): void {
    this.mainService.getAllPokemon().subscribe(data => this.pokemon = data);
  }
}
