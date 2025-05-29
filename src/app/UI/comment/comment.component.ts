import { Component, input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  imports: [PanelModule, DividerModule]
})
export class CommentComponent {
  // Nome utente che ha scritto il commento
  readonly user = input.required<string>();
  // Titolo del commento
  readonly title = input.required<string>();
  // Corpo del commento
  readonly body = input.required<string>();
}
