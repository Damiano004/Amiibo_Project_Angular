import { TabStateManagerService } from './../../Core/Services/Tab-State-Manager/Tab-State-Manager.service';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
import { TabsModule } from 'primeng/tabs';

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
    TabsModule
  ],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
  // Servizio per la gestione delle card
  readonly cardManagerService = inject(CardManagerService);
  // Servizio per la gestione dello stato delle tab
  readonly TabStateManagerService = inject(TabStateManagerService);

  // Signal per il nome dell'amiibo
  amiiboName = signal<string>("");
  // Signal per il filtro del gioco
  gameName = signal<string>("ALL");

  // Al caricamento del componente, ripristina lo stato delle tab
  ngOnInit(): void {
    this.restoreTabState();
  }

  // Funzione per ilripristino dello stato delle tab
  restoreTabState(): void {
    let state = this.TabStateManagerService.getState();

    console.log("Restoring tab state: ", state);
    this.amiiboName.set(state.amiiboName);
    this.gameName.set(state.gameName);
  }

  // Attiva il pulsante solo se non sono state raggiunte le card massime e la lista non è vuota
  activateButton(): boolean{
    let out = !this.cardManagerService.reachedMaxCards() && !this.cardManagerService.isEmpty();
    return out;
  }

  // Imposta un nuovo filtro di gioco e resetta il numero massimo di card
  setNewGameFilter(event: any): void {
    this.gameName.set(event);
    console.log("[003] resetting maxCards to 51");
    this.cardManagerService.maxCards = 51;
  }

  // Esegue la ricerca degli amiibo in base ai filtri selezionati
  callSearchForAmiibo(): Card[]{
    console.log("amiiboName: ", this.amiiboName(), "gameName: ", this.gameName());
    return this.cardManagerService.showAmiibos(this.gameName(),this.amiiboName());
  }

  // Listener per lo scroll della finestra: se si raggiunge il fondo, mostra più card
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight && this.activateButton()) {
      console.log("[003] Reached bottom of the page, showing more cards");
      this.cardManagerService.showMoreCards();
    }
  }
}
