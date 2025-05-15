import { Component, input, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  imports: [PanelModule]
})
export class CommentComponent {
  readonly user = input.required<string>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
}
