import { Component, OnInit } from '@angular/core';
import {PokemonService} from '@services/pokemon.service';
import {LoginService} from '@modules/login/services/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService: LoginService,
              private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.login();
    this.getPokemon();
  }

 async login(): Promise<void> {
    await this.loginService.login('AlvaroTestAdmin', '12345');
 }

 async getPokemon(): Promise<void> {
    console.log(await this.pokemonService.getPokemonByName('Raichu'));
 }
}
