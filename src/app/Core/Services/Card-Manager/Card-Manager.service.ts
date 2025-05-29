import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
  // Card di default da usare in caso di errore o dati mancanti
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
  // Lista Amiibo di default (fallback)
  #defaultAmiiboList: Amiibo = {amiibo: [this.#defaultCard]}
  // URL dell'API Amiibo
  #URL = "https://www.amiiboapi.com/api/amiibo/";
  // Signal contenente una lista di card
  #amiiboList = signal<Card[]>([]);
  // HttpClient per chiamate HTTP
  readonly #http = inject(HttpClient);
  // Lista ordinata di card
  amiiboListComp = computed(() =>
    this.#amiiboList().sort(
      (a, b) => a.name.localeCompare(b.name)
    )
  );
  // Numero massimo di card da mostrare
  maxCards: number = 51;
  // Lista dei filtri disponibili per le serie di giochi
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
  // Lista delle card attualmente mostrate (dopo filtri/ricerca)
  #showingAmiibos: Card[] = [];

  // Restituisce una card dato head e tail, oppure la card di default se non trovata
  GetAmiiboFromID(head: string, tail: string):Card{
    console.log("[received] Amiibo head: "+head+" Amiibo tail: "+tail);
    let amiibo: Card = this.#amiiboList().find(p => p.head === head && p.tail === tail) ?? this.#defaultCard;
    console.log("Amiibo name: "+amiibo.name+" Amiibo head: "+amiibo.head+" Amiibo tail: "+amiibo.tail);
    return amiibo;
  }

  // Effettua una chiamata HTTP per ottenere la lista degli Amiibo
  CallGetHTTP():void{
    console.log("Calling Get HTTP");
    this.#http.get<Amiibo>(this.#URL+"?showusage")
    .pipe(
      retry(3), // Riprova fino a 3 volte in caso di errore
      catchError((err)=>{
        console.log(err);
        // In caso di errore restituisce la lista di default
        return of<Amiibo>(this.#defaultAmiiboList);
      })
    )
    .subscribe((amiiboList: Amiibo) => {
      console.log(amiiboList);
      // Aggiorna aggiungendo i nuovi amiibo
      this.#amiiboList.update(() => [...this.#amiiboList(),...amiiboList.amiibo]);
    });
  }

  // --------------------------------

  // Aumenta il numero massimo di card mostrate di 51
  showMoreCards(): void{
    this.maxCards+=51;
  }

  // Ritorna true se sono state mostrate tutte le card disponibili
  reachedMaxCards():boolean{
    console.log("[003] Checking if", this.maxCards, " >= ", this.#showingAmiibos.length - 1);
    let out: boolean = this.maxCards >= this.#showingAmiibos.length -1;
    console.log("[003] reached max cards: ", out);
    return out;
  }

  // Ritorna true se non ci sono card da mostrare
  isEmpty():boolean{
    console.log("[003] Checking if",this.#showingAmiibos.length,"=== 0");
    let out: boolean = this.#showingAmiibos.length === 0;
    console.log("[003] is empty: ", out);
    return out;
  }
  // --------------------------------

  // Applica i filtri e la ricerca, restituisce la lista di card da mostrare (limitata da maxCards)
  showAmiibos(gameName: string, name: string):Card[]{
    this.#showingAmiibos = this.amiiboListComp();
    let cappedMaxCards: number = this.maxCards;

    if(gameName === undefined || gameName === null){
      console.log("[002] Invalid game name");
      gameName = "all";
    }

    // Filtra per serie di gioco
    this.#showingAmiibos = this.FilterByGame(gameName, this.#showingAmiibos);
    // Filtra per nome
    this.#showingAmiibos = this.SearchAmiibo(name, this.#showingAmiibos);

    if(this.#showingAmiibos.length === 0){
      console.log("[002] this.#showingAmiibos is empty");
      return [];
    }

    console.log("[003] Max cards: ",this.maxCards,"\nshowingAmiibo length: ",this.#showingAmiibos.length)
    if(this.maxCards>=this.#showingAmiibos.length){
      cappedMaxCards = this.#showingAmiibos.length;
    }
    // Restituisce solo le prime cappedMaxCards card
    return this.#showingAmiibos.slice(0,cappedMaxCards);
  }

  // Filtra la lista per nome
  SearchAmiibo(name: string, list: Card[]): Card[]{
    console.log("[002] Searching for amiibo with name: ", name);
    return list.filter(card =>
      card.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filtra la lista per serie di gioco
  private FilterByGame(gameName: string, list: Card[]): Card[]{
    console.log("[002] Filtering by game: ", gameName);
    if(gameName.toLowerCase() === "all") return list;
    if(gameName.toLowerCase() === "other"){
      // Mostra solo le card che non appartengono alle serie note
      return list.filter(card =>
        !this.gameList().includes(card.gameSeries.toUpperCase())
      );
    }
    // Filtra per serie specifica
    return list.filter(card =>
      card.gameSeries.toLowerCase() === gameName.toLowerCase()
    );
  }
  // --------------------------------
}
