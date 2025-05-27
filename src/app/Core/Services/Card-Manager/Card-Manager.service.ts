import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
  // dati base
  readonly #defaultCard: Card = {
    head: "-1",
    tail: "-1",
    name: "AmiiboNotFound, please wait...",
    image: "",
    gameSeries: "",
    games3DS: [],
    gamesSwitch: [],
    gamesWiiU: []
  }
  #defaultAmiiboList: Amiibo = {amiibo: [this.#defaultCard]}
  #URL = "https://www.amiiboapi.com/api/amiibo/";
  #amiiboList = signal<Card[]>([]);
  readonly #http = inject(HttpClient);
  amiiboListComp = computed(() =>
  this.#amiiboList().sort
    ((a, b) => a.name.localeCompare(b.name))
  );
  // dati gestione visualizzazione cards
  maxCards: number = 51;
  // dati gestione filtri
  readonly gameList = signal<string[]>([
    "ALL",
    "SUPER MARIO",
    "ANIMAL CROSSING",
    "FIRE EMBLEM",
    "THE LEGEND OF ZELDA",
    "MARIO SPORTS SUPERSTARS",
    "MONSTER HUNTER",
    "SPLATOON",
    "POKEMON",
    "OTHER"
  ]);
  #showingAmiibos: Card[] = [];

  // funzioni base
  GetAmiiboFromID(head: string, tail: string):Card{
    console.log("[received] Amiibo head: "+head+" Amiibo tail: "+tail);
    let amiibo: Card = this.#amiiboList().find(p => p.head === head && p.tail === tail) ?? this.#defaultCard;
    console.log("Amiibo name: "+amiibo.name+" Amiibo head: "+amiibo.head+" Amiibo tail: "+amiibo.tail);
    return amiibo;
  }

  CallGetHTTP():void{
    console.log("Calling Get HTTP");
    this.#http.get<Amiibo>(this.#URL+"?showusage")
    .pipe(
      retry(3),
      catchError((err)=>{
        console.log(err);
        return of<Amiibo>(this.#defaultAmiiboList);
      })
    )
    .subscribe((amiiboList: Amiibo) => {
      console.log(amiiboList);
      this.#amiiboList.update(() => [...this.#amiiboList(),...amiiboList.amiibo]);
    });
  }
  // --------------------------------

  // funzioni gestione visualizzazione cards
    showMoreCards(): void{
    this.maxCards+=51;
  }

  setMaxCards(newMax: number): void{
    this.maxCards = newMax;
  }

  reachedMaxCards():boolean{
    console.log("[003] Checking if", this.maxCards, " >= ", this.#showingAmiibos.length - 1);
    let out: boolean = this.maxCards >= this.#showingAmiibos.length -1;
    console.log("[003] reached max cards: ", out);
    return out;
  }

  isEmpty():boolean{
    console.log("[003] Checking if",this.#showingAmiibos.length,"=== 0");
    let out: boolean = this.#showingAmiibos.length === 0;
    console.log("[003] is empty: ", out);
    return out;
  }
  // --------------------------------

  // funzioni gestione filtri
  showAmiibos(gameName: string, name: string):Card[]{
    this.#showingAmiibos = this.amiiboListComp();
    let cappedMaxCards: number = this.maxCards;

    if(gameName === undefined || gameName === null){
      console.log("[002] Invalid game name");
      gameName = "all";
    }

    this.#showingAmiibos = this.FilterByGame(gameName, this.#showingAmiibos);
    this.#showingAmiibos = this.SearchAmiibo(name, this.#showingAmiibos);

    if(this.#showingAmiibos.length === 0){
      console.log("[002] this.#showingAmiibos is empty");
      return [];
    }

    console.log("[003] Max cards: ",this.maxCards,"\nshowingAmiibo length: ",this.#showingAmiibos.length)
    if(this.maxCards>=this.#showingAmiibos.length){
      cappedMaxCards = this.#showingAmiibos.length;
    }
    return this.#showingAmiibos.slice(0,cappedMaxCards);
  }

  SearchAmiibo(name: string, list: Card[]): Card[]{
    console.log("[002] Searching for amiibo with name: ", name);
    return list.filter(card =>
      card.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  private FilterByGame(gameName: string, list: Card[]): Card[]{
    console.log("[002] Filtering by game: ", gameName);
    if(gameName.toLowerCase() === "all") return list;
    if(gameName.toLowerCase() === "other"){
      return list.filter(card =>
        !this.gameList().includes(card.gameSeries.toUpperCase())
      );
    }
    return list.filter(card =>
      card.gameSeries.toLowerCase() === gameName.toLowerCase()
    );
  }
  // --------------------------------
}
