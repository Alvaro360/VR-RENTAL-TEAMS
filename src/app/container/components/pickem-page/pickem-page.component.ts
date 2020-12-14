import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '@modules/login/services/login.service';
import {Player} from '@modules/container/models/player.model';
import {TournamentService} from '@modules/container/services/tournament.service';
import {VRSession} from '@modules/login/models/vr-session.model';
import {ToastService} from '@services/toast.service';

@Component({
  selector: 'app-pickem-page',
  templateUrl: './pickem-page.component.html',
  styleUrls: ['./pickem-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickemPageComponent implements OnInit {
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
  isDataAvailable = false;
  dialogVisible = false;
  userSession: VRSession;

  constructor(private router: Router,
              private toast: ToastService,
              private loginService: LoginService,
              private tournamentService: TournamentService) {

    this.userSession = this.loginService.getLoggedUser();
    this.dialogVisible = false;
    this.isDataAvailable = false;
    this.buildGroups().then(() => this.isDataAvailable = true);
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

   let pickem;
   try {
     pickem = await this.tournamentService.getPickemByPlayer(parseInt(tour.id, 10), this.userSession.id);
     for (const [key, value] of Object.entries(pickem.stages[0].selections)) {
       const playerId = value as unknown as number;
       switch (key) {
         case 'GRUPOS-A-1':
           this.selectedPlayerGroupA = await this.tournamentService.getPlayerById(playerId);
           break;
         case 'GRUPOS-B-1':
           this.selectedPlayerGroupB = await this.tournamentService.getPlayerById(playerId);
           break;
         case 'GRUPOS-C-1':
           this.selectedPlayerGroupC = await this.tournamentService.getPlayerById(playerId);
           break;
         case 'GRUPOS-D-1':
           this.selectedPlayerGroupD = await this.tournamentService.getPlayerById(playerId);
           break;
         case 'GRUPOS-E-1':
           this.selectedPlayerGroupE = await this.tournamentService.getPlayerById(playerId);
           break;
         default:
           this.selectedPlayerGroupF = await this.tournamentService.getPlayerById(playerId);
           break;
       }
     }
   } catch (e) {
     this.selectedPlayerGroupA = null;
     this.selectedPlayerGroupB = null;
     this.selectedPlayerGroupC = null;
     this.selectedPlayerGroupD = null;
     this.selectedPlayerGroupE = null;
     this.selectedPlayerGroupF = null;
   }

  }

  ngOnInit(): void {

  }

  async sendPickEm(): Promise<void> {
    if (this.isLogged() && (!this.selectedPlayerGroupA || !this.selectedPlayerGroupB || !this.selectedPlayerGroupC || !this.selectedPlayerGroupD || !this.selectedPlayerGroupF || !this.selectedPlayerGroupE)) {
      this.toast.error('VR_PLAYERS_MISSING');
     return;
    }

    this.dialogVisible = true;
    if (this.isLogged()) {
      const pickem = {};
      pickem['owner'] = this.userSession.id;
      pickem['tournamentId'] = 1;
      const stages = [{
        'selections' : {
          'GRUPOS-A-1': this.selectedPlayerGroupA.id,
          'GRUPOS-B-1': this.selectedPlayerGroupB.id,
          'GRUPOS-C-1': this.selectedPlayerGroupC.id,
          'GRUPOS-D-1': this.selectedPlayerGroupD.id,
          'GRUPOS-E-1': this.selectedPlayerGroupE.id,
          'GRUPOS-F-1': this.selectedPlayerGroupF.id,
        },
        'stageName': 'GRUPOS'
      }];
      pickem['stages'] = stages;
      this.tournamentService.submitPickem(pickem);
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
