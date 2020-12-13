import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '@modules/login/services/login.service';
import {Player} from '@modules/container/models/player.model';
import {TournamentService} from '@modules/container/services/tournament.service';

@Component({
  selector: 'app-pickem-page',
  templateUrl: './pickem-page.component.html',
  styleUrls: ['./pickem-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickemPageComponent implements OnInit {
  countries: any[];
  groupA: Player[] = [];
  groupB: Player[] = [];
  groupC: Player[] = [];
  groupD: Player[] = [];
  groupE: Player[] = [];
  groupF: Player[] = [];
  selectedPlayerGroupA: Player;
  selectedPlayerGroupB: Player;
  selectedPlayerGroupC: Player;
  selectedPlayerGroupD: Player;
  selectedPlayerGroupE: Player;
  selectedPlayerGroupF: Player;
  images = {};

  selectedCountry: any;
  dialogVisible = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService,
              private tournamentService: TournamentService) {
    this.countries = [
      {name: 'Guillermo Castilla', code: 'AU'},
      {name: 'Antonio Cano', code: 'BR'},
      {name: 'Rubén Yanguas', code: 'CN'},
      {name: 'Álvaro Buedo', code: 'CN'},
    ];
    this.dialogVisible = false;

  }

 async buildGroups(): Promise<void> {
    const tour = await this.tournamentService.getTournamentById(1);
    for (const [key, value] of Object.entries(tour.stages[0].playerGroups)) {
      const playerId = value as unknown as number;
      const player = await this.tournamentService.getPlayerById(playerId);
      if (key.includes('GRUPOS-A')) {
        this.groupA.push(player);
      } else if (key.includes('GRUPOS-B')) {
        this.groupB.push(player);
      } else if (key.includes('GRUPOS-C')) {
        this.groupC.push(player);
      } else if (key.includes('GRUPOS-D')) {
        this.groupD.push(player);
      } else if (key.includes('GRUPOS-E')) {
        this.groupE.push(player);
      } else if (key.includes('GRUPOS-F')) {
        this.groupF.push(player);
      }

      this.createImageFromBlob(await this.tournamentService.getPlayerPic(playerId), playerId);
    }
  }

  ngOnInit(): void {
    // document.getElementById('loading').style.display = 'none';
    this.buildGroups();
    console.log(this.groupA);
  }

  sendPickEm(): void {
    this.dialogVisible = true;

    if (this.isLogged()) {
      this.toastr.success('Hello world!', 'Toastr fun!');
    }
  }

  closeDialog(): void {
    this.dialogVisible = false;
  }

  isLogged(): boolean {
    return this.loginService.isLoggedIn();
  }

  createImageFromBlob(image: Blob, id: number): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.images[id] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
