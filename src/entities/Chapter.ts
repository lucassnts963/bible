import { Verse } from './Verse'

export interface Chapter {
  read?: boolean
  code: number
  verses: Verse[]
}
