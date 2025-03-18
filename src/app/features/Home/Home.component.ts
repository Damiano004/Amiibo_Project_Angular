import { Component, inject, OnInit } from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { AmiiboCardComponent } from '../../UI/amiibo-card/amiibo-card.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [AmiiboCardComponent],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent{
  cardManagerService = inject(CardManagerService);
  constructor() { }
}
