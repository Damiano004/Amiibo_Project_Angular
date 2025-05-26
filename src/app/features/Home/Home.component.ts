import { TabStateManagerService } from './../../Core/Services/Tab-State-Manager/Tab-State-Manager.service';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { TabViewModule } from 'primeng/tabview';


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
    SelectModule,
    TabViewModule
  ],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly cardManagerService = inject(CardManagerService);
  readonly TabStateManagerService = inject(TabStateManagerService);

  amiiboName = signal<string>("");
  gameIndex = signal<number>(0);

  ngOnInit(): void {
    this.restoreTabState();
  }

  restoreTabState(): void {
    let state = this.TabStateManagerService.getState();

    console.log("Restoring tab state: ", state);
    this.gameIndex.set(state.gameIndex);
    this.amiiboName.set(state.amiiboName);

  }

  activateButton(): boolean{
    let out = !this.cardManagerService.reachedMaxCards() && !this.cardManagerService.isEmpty();
    console.log("Activate button: ", out);
    return out;
  }

  setNewGameFilter(event: any): void {
    console.log("Evend index: ",event.index);
    this.gameIndex.set(event.index);
    console.log("resetting maxCards to 51");
    this.cardManagerService.maxCards = 51;
    }

  callSearchForAmiibo(): Card[]{
    console.log("amiiboName: ", this.amiiboName(), "gameIndex: ", this.gameIndex());
    return this.cardManagerService.showAmiibos(this.gameIndex(),this.amiiboName());
  }
}
