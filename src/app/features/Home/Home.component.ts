import { Component, inject, OnInit } from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { AmiiboCardComponent } from '../../UI/amiibo-card/amiibo-card.component';
import { CommentManagerService } from '../../Core/Services/Comment-Manager/Comment-Manager.service';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [AmiiboCardComponent],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent{
  readonly cardManagerService = inject(CardManagerService);
  readonly commentManagerService = inject(CommentManagerService);
}
