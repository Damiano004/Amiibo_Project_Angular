import { Component, inject, input } from '@angular/core';
import { AmiiboUsage } from '../../Core/Models/AmiiboUsage.model';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from "../../UI/UsageTable/UsageTable.component";

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.css'],
  imports: [UsageTableComponent]
})
export class DettagliComponent{
  readonly cardMangerSrv = inject(CardManagerService)

  readonly head = input<string>("-1");
  readonly tail = input<string>("-1");

  readonly name = input<string>();
  readonly gameSeries = input<string>();
  readonly image = input<string>();

  readonly gamesSwitch = input<AmiiboUsage[]>();
  readonly gamesWiiU = input<AmiiboUsage[]>();
  readonly games3DS = input<AmiiboUsage[]>();
}
