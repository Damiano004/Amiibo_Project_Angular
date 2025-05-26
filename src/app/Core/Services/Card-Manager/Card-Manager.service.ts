import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
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

  maxCards: number = 51;
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

  amiiboListComp = computed(() =>
    this.#amiiboList().sort
      ((a, b) => a.name.localeCompare(b.name))
    );

  GetAmiiboFromID(head: string, tail: string):Card{
    console.log("[received] Amiibo head: "+head+" Amiibo tail: "+tail);
    let amiibo: Card = this.#amiiboList().find(p => p.head === head && p.tail === tail) ?? this.#defaultCard;
    console.log("Amiibo name: "+amiibo.name+" Amiibo head: "+amiibo.head+" Amiibo tail: "+amiibo.tail);
    return amiibo;
  }

  showAmiibos(gameName: string, name: string):Card[]{
    let showingAmiibos: Card[] = this.amiiboListComp();
    let cappedMaxCards: number = this.maxCards;

    if(gameName === undefined || gameName === null){
      console.log("Invalid game name");
      gameName = "all";
    }

    showingAmiibos = this.FilterByGame(gameName, showingAmiibos);
    showingAmiibos = this.SearchAmiibo(name, showingAmiibos);

    if(showingAmiibos.length === 0){
      console.log("showingAmiibos is empty");
      return [];
    }

    console.log("Max cards: ",this.maxCards,"\nshowingAmiibo length: ",showingAmiibos.length)
    if(this.maxCards>=showingAmiibos.length){
      cappedMaxCards = showingAmiibos.length;
    }
    return showingAmiibos.slice(0,cappedMaxCards);
  }

  showMoreCards(): void{
    this.maxCards+=51;
  }

  setMaxCards(newMax: number): void{
    this.maxCards = newMax;
  }

  reachedMaxCards():boolean{
    let out: boolean = this.maxCards >= this.amiiboListComp().length -1;
    console.log("reached max cards: ", out);
    return out;
  }

  isEmpty():boolean{
    let out: boolean = this.amiiboListComp().length === 0;
    console.log("is empty: ", out);
    return out;
  }

  SearchAmiibo(name: string, list: Card[]): Card[]{
    return list.filter(card =>
      card.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  private FilterByGame(gameName: string, list: Card[]): Card[]{
    if(gameName.toLowerCase() === "all") return list;
    if(gameName === "other"){
      return list.filter(card =>
        !this.gameList().includes(card.gameSeries.toUpperCase())
      );
    }
    return list.filter(card =>
      card.gameSeries.toLowerCase() === gameName.toLowerCase()
    );
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
}
