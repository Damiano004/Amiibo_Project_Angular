import { ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from "../../UI/UsageTable/UsageTable.component";
import { ActivatedRoute } from '@angular/router';
import { CommentManagerService } from '../../Core/Services/Comment-Manager/Comment-Manager.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.css'],
  imports: [UsageTableComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DettagliComponent implements OnInit{
  readonly cardMangerSrv = inject(CardManagerService);
  readonly commentManagerSrv = inject(CommentManagerService);
  readonly #router = inject(ActivatedRoute);

  form!: FormGroup;

  head: string = "";
  tail: string = "";

  uName = new FormControl<string>('');
  title = new FormControl<string>('');
  body  = new FormControl<string>('');

  readonly name = input<string>();

  sendComment(): void{
    let result = this.form.value;
    console.log(result)
    let comment =this.form.value;
    this.commentManagerSrv.AddComment(this.head+this.tail, comment);
  }

  ngOnInit(): void {
    this.#router.paramMap.subscribe(param=> {
      this.head = param.get("head") ?? "-1";
      this.tail = param.get("tail") ?? "-1";

    })

    this.form = new FormGroup(  {
      user: new FormControl(''),
      title: new FormControl(''),
      body: new FormControl('')
    })
  }
}
