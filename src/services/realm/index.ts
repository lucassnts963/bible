import Realm from 'realm'
import { createRealmContext } from '@realm/react'

import { Verse as MyOwnVerse } from '@/entities'

export class Verse extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  author!: string
  book!: string
  bookType!: string
  chapter!: number
  code!: number
  location!: string
  period!: string
  testament!: string
  text!: string
  time!: number
  verse!: number
  read!: boolean

  static generate(verse: MyOwnVerse) {
    return {
      _id: new Realm.BSON.ObjectId(),
      author: verse.author,
      book: verse.book,
      bookType: verse.bookType,
      chapter: verse.chapter,
      code: verse.code,
      location: verse.location,
      period: verse.period,
      testament: verse.testament,
      text: verse.text,
      time: verse.time,
      verse: verse.verse,
      read: verse.read,
    }
  }

  static schema = {
    name: 'Verse',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      author: 'string',
      book: 'string',
      bookType: 'string',
      chapter: 'int',
      code: 'int',
      location: 'string',
      period: 'string',
      testament: 'string',
      text: 'string',
      time: 'int',
      verse: 'int',
      read: { type: 'bool', default: false },
      createdAt: 'date',
    },
  }
}

const config = {
  schema: [Verse],
}

export const RealmContext = createRealmContext(config)
