import { Component, OnInit } from '@angular/core';
import {PokemonService} from '@services/pokemon.service';
import {LoginService} from '@modules/login/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService: LoginService,
              private pokemonService: PokemonService,
              private router: Router) { }

  ngOnInit(): void {
    // this.login();
    // this.getPokemon();
    this.router.navigate(['./main/pickem']);
  }

 async login(): Promise<void> {
    await this.loginService.login('AlvaroTestAdmin', '12345');
 }

 async getPokemon(): Promise<void> {
    console.log(await this.pokemonService.getPokemonByName('Raichu'));
 }
}
