import { Component, inject, Input, input, OnInit } from '@angular/core';
import { AmiiboUsage } from '../../Core/Models/AmiiboUsage.model';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from "../../UI/UsageTable/UsageTable.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.css'],
  imports: [UsageTableComponent]
})
export class DettagliComponent implements OnInit{
  readonly cardMangerSrv = inject(CardManagerService)

  head: string = "";
  tail: string = "";

  readonly router = inject(ActivatedRoute)

  readonly name = input<string>();
  readonly gameSeries = input<string>();
  readonly image = input<string>();

  readonly gamesSwitch = input<AmiiboUsage[]>();
  readonly gamesWiiU = input<AmiiboUsage[]>();
  readonly games3DS = input<AmiiboUsage[]>();

  ngOnInit(): void {
    this.router.paramMap.subscribe(param=> {
      this.head = param.get("head") ?? "-1";
      this.tail = param.get("tail") ?? "-1";
    })
  }
}
