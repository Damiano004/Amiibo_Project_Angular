import { Component, input} from '@angular/core';
import { Card } from '../../Core/Model';

@Component({
  selector: 'app-amiibo-card',
  templateUrl: './amiibo-card.component.html',
  styleUrls: ['./amiibo-card.component.scss']
})
export class AmiiboCardComponent {
  card = input.required<Card>();
}
