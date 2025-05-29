import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { UsageTableComponent } from '../../UI/UsageTable/UsageTable.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommentManagerService } from '../../Core/Services/Comment-Manager/Comment-Manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from '../../UI/comment/comment.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagComponent } from '../../UI/tag/tag.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-Dettagli',
  templateUrl: './Dettagli.component.html',
  styleUrls: ['./Dettagli.component.scss'],
  imports: [
    UsageTableComponent,
    ReactiveFormsModule,
    CommentComponent,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TextareaModule,
    FloatLabelModule,
    TagComponent,
    ProgressSpinnerModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DettagliComponent implements OnInit {
  // Servizio per la gestione delle card
  readonly cardMangerSrv = inject(CardManagerService);
  // Servizio per la gestione dei commenti
  readonly commentManagerSrv = inject(CommentManagerService);
  // Router per ottenere i parametri dalla route attiva
  readonly #router = inject(ActivatedRoute);

  // Form per l'inserimento dei commenti
  form!: FormGroup;

  // Identificativi della card
  head: string = '';
  tail: string = '';

  // Nome della card (input dal componente padre)
  readonly name = input<string>();

  // Invia un nuovo commento utilizzando il servizio CommentManagerService
  sendComment(): void {
    let comment = this.form.value;
    console.log('Sending comment: ' + comment.uName);
    this.commentManagerSrv.AddComment(this.head + this.tail, comment);
    this.form.reset();
  }

  // Attiva il pulsante di invio solo se tutti i campi sono compilati
  activateButton(): boolean {
    return (
      this.form.value.uName !== '' &&
      this.form.value.title !== '' &&
      this.form.value.body !== ''
    );
  }

  // Inizializza il componente e il form, recupera i parametri dalla route
  ngOnInit(): void {
    this.#router.paramMap.subscribe((param) => {
      this.head = param.get('head') ?? '-1';
      this.tail = param.get('tail') ?? '-1';
    });

    this.form = new FormGroup({
      uName: new FormControl<string>(''),
      title: new FormControl<string>(''),
      body: new FormControl<string>(''),
    });
  }
}
