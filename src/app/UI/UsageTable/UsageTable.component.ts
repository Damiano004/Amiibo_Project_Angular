import { Component, input} from '@angular/core';
import { AmiiboUsage } from '../../Core/Models/AmiiboUsage.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-UsageTable',
  templateUrl: './UsageTable.component.html',
  styleUrls: ['./UsageTable.component.scss'],
  imports: [TableModule]
})
export class UsageTableComponent {
  readonly tableData = input.required<AmiiboUsage[]>();
  readonly tableName = input.required<string>();
}
