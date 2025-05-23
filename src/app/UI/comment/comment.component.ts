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
  readonly user = input.required<string>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
}
