import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../Models/Card.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';
import { Amiibo } from '../../Models/Amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
  maxCards: number = 51;
  //readonly showingAmiibos = signal<Amiibo>;

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

  amiiboListComp = computed(() => this.#amiiboList());

  GetAmiiboFromID(head: string, tail: string):Card{
    this.#amiiboList().forEach((amiibo)  =>{
      let amiiboId;
      amiiboId = amiibo.head + amiibo.tail;
    })
    console.log("[received] Amiibo head: "+head+" Amiibo tail: "+tail);
    let amiibo: Card = this.#amiiboList().find(p => p.head === head && p.tail === tail) ?? this.#defaultCard;
    console.log("Amiibo name: "+amiibo.name+" Amiibo head: "+amiibo.head+" Amiibo tail: "+amiibo.tail);
    return amiibo;
  }

  showAmiibos(name: string):Card[]{
    let showingAmiibos: Card[] = this.SearchAmiibo(name);
    let cappedMaxCards: number = this.maxCards;

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

  SearchAmiibo(name: string): Card[]{
    return this.amiiboListComp().filter(card =>
      card.name.toLowerCase().includes(name.toLowerCase())
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
