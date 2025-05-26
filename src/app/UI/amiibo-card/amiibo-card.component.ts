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
  readonly card = input.required<Card>();
  readonly amiiboName = input.required<string>();
  readonly gameIndex = input.required<number>();
  readonly router = inject(Router);
  readonly tabStateManagerService = inject(TabStateManagerService);

  saveState():void{
    let state = {
      gameIndex: this.gameIndex(),
      amiiboName: this.amiiboName()
    }
    this.tabStateManagerService.setState(state);
  }

  goToDetails(head: string, tail: string){
    console.log("[sending] Head: "+head+" tail: "+tail);
    this.saveState();
    this.router.navigate(['/dettagli',head,tail]);
  }
}
