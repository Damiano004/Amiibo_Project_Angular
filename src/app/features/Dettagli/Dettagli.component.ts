import { ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from "../../UI/UsageTable/UsageTable.component";
import { ActivatedRoute } from '@angular/router';
import { CommentManagerService } from '../../Core/Services/Comment-Manager/Comment-Manager.service';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommentComponent } from "../../UI/comment/comment.component";
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagComponent } from "../../UI/tag/tag.component";

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.scss'],
  imports: [UsageTableComponent, ReactiveFormsModule, CommentComponent, ButtonModule, InputGroupModule, InputGroupAddonModule, TextareaModule, FloatLabelModule, TagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DettagliComponent implements OnInit{
  readonly cardMangerSrv = inject(CardManagerService);
  readonly commentManagerSrv = inject(CommentManagerService);
  readonly #router = inject(ActivatedRoute);


  form!: FormGroup;

  head: string = "";
  tail: string = "";

  readonly name = input<string>();

  sendComment(): void{
    let comment =this.form.value;
    console.log("Sending comment: "+ comment.uName);
    this.commentManagerSrv.AddComment(this.head+this.tail, comment);
    this.form.reset();
  }

  activateButton(): boolean{
    return(
      this.form.value.uName !== "" &&
      this.form.value.title !== "" &&
      this.form.value.body !== "");
  }

  ngOnInit(): void {
    this.#router.paramMap.subscribe(param=> {
      this.head = param.get("head") ?? "-1";
      this.tail = param.get("tail") ?? "-1";
    })

    this.form = new FormGroup(  {
      uName: new FormControl<string>(''),
      title: new FormControl<string>(''),
      body: new FormControl<string>('')
    })
  }
}
