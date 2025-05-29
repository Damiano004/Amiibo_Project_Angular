import { Injectable } from '@angular/core';
import { TabState } from '../../Models/TabState';

@Injectable({
  providedIn: 'root'
})
export class TabStateManagerService {
  // Stato attuale delle tab (filtri selezionati)
  private state: TabState ={
    gameName: "ALL",
    amiiboName: ""
  }

  // Imposta un nuovo stato per le tab
  setState(newState: TabState): void {
    console.log("[001] Setting new tab state: ", newState);
    this.state = newState;
  }

  // Restituisce lo stato attuale delle tab
  getState(): TabState {
    console.log("Getting saved tab state: ", this.state);
    return this.state;
  }
}
