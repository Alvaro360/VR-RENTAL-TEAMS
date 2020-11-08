import { Component, OnInit } from '@angular/core';
import {LoginService} from '@services/login.service';
import {PokemonService} from '@services/pokemon.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService: LoginService,
              private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

 async signUp(): Promise<void> {
    await this.loginService.signUp();
 }

 async getPokemon(): Promise<void> {
    console.log(await this.pokemonService.getPokemonByName('Raichu'));
 }
}
