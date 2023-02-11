import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/env';
import { map, Observable, mergeMap } from 'rxjs';
import { AllPokemon, Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private apiUrl = environment.apiUrl;
    private countPokemon = 0;
    private filter = '?limit=';

    constructor(
        private http: HttpClient,
    ) {
    }

    public getAllPokemon(): Observable<Pokemon[]> {
        return this.getCountOfPokemon().pipe(
            mergeMap(resp => {
                const count = resp.count;
                return this.http.get<AllPokemon>(this.apiUrl + 'pokemon' + this.filter + count)
                    .pipe(map(value => this.transformPokemondata(value)));
            })
        );
    }

    public getCountOfPokemon() {
        return this.http.get<AllPokemon>(this.apiUrl + 'pokemon');
    }

    private transformPokemondata(value: any) {
        return value.results;

    }
}