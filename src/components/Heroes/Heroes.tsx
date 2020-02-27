import React from 'react'
import './Heroes.scss'
import { Hero } from '../../models/hero';

interface HeroesProps {
  type: string,
  heroes: Hero[]
}

export const Heroes: React.FC<HeroesProps> = ({
  type,
  heroes
}) => {
  const getImage: (hero: Hero, imageType: number) => string = (hero: Hero, imageType: number) => {
    const heroKey = hero.name.replace('npc_dota_hero_', '')
    switch (imageType) {
      case 0: // FULL PORTRAIT
        return `http://cdn.dota2.com/apps/dota2/images/heroes/${heroKey}_full.png`
      case 1: // SMALL PORTRAIT
        return `http://cdn.dota2.com/apps/dota2/images/heroes/${heroKey}_sb.png`
      case 2: // LARGE PORTRAIT
        return `http://cdn.dota2.com/apps/dota2/images/heroes/${heroKey}_lg.png`
      case 3: // VERTICAL PORTRAIT
        return `http://cdn.dota2.com/apps/dota2/images/heroes/${heroKey}_vert.jpg`
      default:
        return ''
    }
  }

  if (!heroes.length) {
    return null
  }

  return (
    <div className="heroes-component">
      <b>{type}</b>
      <div>{
        heroes.map((hero: Hero) => {
          return (
            <div className="heroes-content" key={hero.id} title={hero.localizedName}>
              {hero.isActive ? '' : <div className="heroes-overlay"></div>}
              <img src={getImage(hero, 3)} alt={hero.localizedName} />
            </div>
          )
        })
      }</div>
      <div className="clearFloat" />
    </div>
  )
}
