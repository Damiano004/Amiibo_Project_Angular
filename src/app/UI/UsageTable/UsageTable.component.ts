import { Component, input} from '@angular/core';
import { AmiiboUsage } from '../../Core/Models/AmiiboUsage.model';

@Component({
  selector: 'app-UsageTable',
  templateUrl: './UsageTable.component.html',
  styleUrls: ['./UsageTable.component.scss']
})
export class UsageTableComponent {
  readonly tableData = input.required<AmiiboUsage[]>();
  readonly tableName = input.required<string>();
}
