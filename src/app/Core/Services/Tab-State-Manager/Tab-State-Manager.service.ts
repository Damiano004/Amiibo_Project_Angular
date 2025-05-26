import { Injectable } from '@angular/core';
import { TabState } from '../../Models/TabState';

@Injectable({
  providedIn: 'root'
})
export class TabStateManagerService {
  private state: TabState ={
    gameIndex: 0,
    amiiboName: "",
    maxCards: 51
  }

  setState(newState: TabState): void {
    console.log("Setting new tab state: ", newState);
    this.state = newState;
  }

  getState(): TabState {
    console.log("Getting saved tab state: ", this.state);
    return this.state;
  }
}
