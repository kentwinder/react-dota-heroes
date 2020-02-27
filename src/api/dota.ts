import axios from 'axios'
import { Hero } from '../models/hero'

function toCamel(s: string) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

function keysToCamel(o: any): any {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n: any = {}
    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k])
      })
    return n
  } else if (Array.isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i)
    })
  }
  return o
}

export const getHeroes: () => Promise<[Hero]> = async () => {
  let requestURL = 'https://api.opendota.com/api/heroes'
  try {
    const { data } = await axios.get(requestURL, { headers: { 'Content-Type': 'application/json' } })
    const heroes: [Hero] = keysToCamel(data)
    return heroes
  } catch (error) {
    return Promise.reject(error.message || 'Internal error blah blah blah')
  }
}
