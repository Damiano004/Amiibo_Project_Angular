import { AmiiboUsage } from "./AmiiboUsage.model"

export interface Card{
  head: string,
  tail: string,
  name: string,
  gameSeries: string,
  image: string //URL of the image
  games3DS: AmiiboUsage[],
  gamesSwitch: AmiiboUsage[],
  gamesWiiU: AmiiboUsage[]
}

