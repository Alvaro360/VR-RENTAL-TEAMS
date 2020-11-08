import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '@models/pokemon/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonByName(name: string): Promise<Pokemon> {
    const url = `/api/pokemon/${name}`;
    return this.http.get<Pokemon>(url).toPromise();
  }
}
