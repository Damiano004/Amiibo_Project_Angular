import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent{
  // Nome del tag da visualizzare
  readonly tag_name = input.required<string>();
  // Testo del tag
  readonly tag_body = input.required<string>();
}
