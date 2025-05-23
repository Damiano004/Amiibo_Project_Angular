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
import { SelectModule } from 'primeng/select';


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
    InputIconModule,
    SelectModule
  ],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent{
  readonly cardManagerService = inject(CardManagerService);
  amiiboName: string = "";
  gameName: string = "All";
  games: string[] = ["All", "Super Mario", "Animal Crossing", "Fire Emblem"];

  activateButton(): boolean{
    let out = !this.cardManagerService.reachedMaxCards() && !this.cardManagerService.isEmpty();
    console.log("Activate button: ", out);
    return out;
  }

  callSearchForAmiibo(): Card[]{
    console.log("amiiboName: ", this.amiiboName, "gameName: ", this.gameName);
    return this.cardManagerService.showAmiibos(this.gameName,this.amiiboName);
  }
}
