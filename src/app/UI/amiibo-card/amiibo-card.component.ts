import { TabStateManagerService } from './../../Core/Services/Tab-State-Manager/Tab-State-Manager.service';
import { Component, inject, input} from '@angular/core';
import { Card } from '../../Core/Models/Card.model';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-amiibo-card',
  templateUrl: './amiibo-card.component.html',
  styleUrls: ['./amiibo-card.component.scss'],
  imports: [CardModule]
})
export class AmiiboCardComponent{
  // Input: dati della card
  readonly card = input.required<Card>();
  // Input: nome dell'amiibo
  readonly amiiboName = input.required<string>();
  // Input: nome del gioco
  readonly gameName = input.required<string>();
  // Router per la navigazione
  readonly router = inject(Router);
  // Servizio per la gestione dello stato delle tab
  readonly tabStateManagerService = inject(TabStateManagerService);

  // Salva lo stato corrente (filtri selezionati) tramite il servizio
  saveState():void{
    let state = {
      gameName: this.gameName(),
      amiiboName: this.amiiboName()
    }
    this.tabStateManagerService.setState(state);
  }

  // Naviga alla pagina dei dettagli della card, salvando prima lo stato
  goToDetails(head: string, tail: string){
    console.log("[sending] Head: "+head+" tail: "+tail);
    this.saveState();
    this.router.navigate(['/dettagli',head,tail]);
  }
}
