import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent{
  readonly tag_name = input.required<string>();
  readonly tag_body = input.required<string>();
}
