import { Component, inject } from '@angular/core';
import { CardManagerService } from '../../Core/Services/Card-Manager/Card-Manager.service';
import { AmiiboCardComponent } from '../../UI/amiibo-card/amiibo-card.component';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [AmiiboCardComponent, ButtonModule],
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent{
  readonly cardManagerService = inject(CardManagerService);

  activateButton(): boolean{
    let cazzo = !this.cardManagerService.reachedMaxCards() && !this.cardManagerService.isEmpty();
    console.log("reached max cards 2:", !this.cardManagerService.reachedMaxCards());
    console.log("is empty 2", !this.cardManagerService.isEmpty());
    console.log(cazzo);
    return cazzo;
  }
}
