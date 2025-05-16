import { routes } from './../../app.routes';
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
export class AmiiboCardComponent {
  readonly card = input.required<Card>();
  readonly router = inject(Router);


  goToDetails(head: string, tail: string){
    console.log("[sending] Head: "+head+" tail: "+tail);
    this.router.navigate(['/dettagli',head,tail]);
  }
}
