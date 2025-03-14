import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardManagerService } from './Services/Card-Manage/Card-Manager.service';
import { AmiiboCardComponent } from "./UI/amiibo-card/amiibo-card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AmiiboCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cardManagerService = inject(CardManagerService)
}
