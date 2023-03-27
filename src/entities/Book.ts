import { Chapter } from './Chapter'

export interface Book {
  read?: boolean
  title: string
  chapters: Chapter[]
}
