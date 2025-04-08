import { Component, inject, input, OnInit} from '@angular/core';
import { AmiiboUsage } from '../../Core/Models/AmiiboUsage.model';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from "../../UI/UsageTable/UsageTable.component";
import { ActivatedRoute } from '@angular/router';
import { CommentManagerService } from '../../Core/Services/Comment-Manager/Comment-Manager.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../Core/Models/Card.model';

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.css'],
  imports: [UsageTableComponent, ReactiveFormsModule]
})
export class DettagliComponent implements OnInit{
  readonly cardMangerSrv = inject(CardManagerService);
  readonly commentManagerSrv = inject(CommentManagerService);
  amiiboDetail: Card| undefined;

  head: string = "";
  tail: string = "";

  uName = new FormControl<string>('', [Validators.required]);
  title = new FormControl<string>('', [Validators.required]);
  body  = new FormControl<string>('', [Validators.required]);

  readonly router = inject(ActivatedRoute);

  readonly name = input<string>();
  readonly gameSeries = input<string>();
  readonly image = input<string>();

  readonly gamesSwitch = input<AmiiboUsage[]>();
  readonly gamesWiiU = input<AmiiboUsage[]>();
  readonly games3DS = input<AmiiboUsage[]>();

  sendComment(): void{
    let comment ={
      user: this.uName.value ?? '',
      title: this.title.value ?? '',
      body: this.body.value ?? ''
    };
    this.commentManagerSrv.AddComment(this.head+this.tail, comment);
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param=> {

      console.log(param.get("head"))
      this.head = param.get("head") ?? "-1";
      this.tail = param.get("tail") ?? "-1";
      this.amiiboDetail = this.cardMangerSrv.GetAmiiboFromID(this.head,this.tail);
    })
  }
}
