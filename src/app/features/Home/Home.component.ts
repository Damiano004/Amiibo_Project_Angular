import { Component, inject } from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { AmiiboCardComponent } from '../../UI/amiibo-card/amiibo-card.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { Card } from '../../Core/Models/Card.model';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [
    AmiiboCardComponent,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule
  ],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent{
  readonly cardManagerService = inject(CardManagerService);
  query: string = "";

  activateButton(): boolean{
    let out = !this.cardManagerService.reachedMaxCards() && !this.cardManagerService.isEmpty();
    console.log("Activate button: ", out);
    return out;
  }



  callSearchForAmiibo(): Card[]{
    console.log("query value: ", this.query);
    return this.cardManagerService.showAmiibos(this.query);
  }
}
