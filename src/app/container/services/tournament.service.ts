import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '@models/pokemon/pokemon.model';
import {Player} from '@modules/container/models/player.model';
import {Tournament} from '@modules/container/models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getTournamentById(id: number): Promise<Tournament> {
    const url = `/api/public/tournament/${id}`;
    return this.http.get<Tournament>(url).toPromise();
  }

  getPlayerById(id: number): Promise<Player> {
    const url = `/api/public/player/${id}`;
    return this.http.get<Player>(url).toPromise();
  }

  getPlayerPic(id: number): Promise<Blob> {
    const url = `/api/public/player/${id}/picture`;
    return this.http.get<Blob>(url, {responseType: 'blob' as 'json'}).toPromise();
  }

  submitPickem(pickem: any): Promise<any> {
    const url = `/api/pickem`;
    return this.http.post(url, pickem).toPromise();
  }

  getPickemByPlayer(tourId: number, playerId): Promise<any> {
    const url = `/api/pickem?userId=${playerId}&tournamentId=${tourId}`;
    return this.http.get<any>(url).toPromise();
  }
}
