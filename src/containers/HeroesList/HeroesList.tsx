import React, { useEffect } from 'react'
import { message, Select } from 'antd'
import * as dotaAPI from '../../api/dota'
import { Hero } from '../../models/hero'
import { Heroes } from '../../components/Heroes'

const { Option } = Select

export const HeroesList: React.FC = () => {
  const [heroes, setHeroes] = React.useState<Hero[]>([])
  const [strHeroes, setStrHeroes] = React.useState<Hero[]>([])
  const [agiHeroes, setAgiHeroes] = React.useState<Hero[]>([])
  const [intHeroes, setIntHeroes] = React.useState<Hero[]>([])
  const [role, setRole] = React.useState<string>('')
  const [attackType, setAttackType] = React.useState<string>('')

  const filterHeroesArray = (heroes: Hero[]) => {
    heroes.map(function (hero: Hero) {
      if (
        (role === '' || hero.roles.includes(role))
        && (attackType === '' || hero.attackType === attackType)
      ) {
        hero.isActive = true
      } else {
        hero.isActive = false
      }
      return hero
    })
  }

  const filterHeroes = () => {
    const strengthHeroes = heroes.filter((hero: Hero) => hero.primaryAttr === 'str')
    filterHeroesArray(strengthHeroes)
    setStrHeroes(strengthHeroes)

    filterHeroesArray(agiHeroes)
    filterHeroesArray(intHeroes)
  }

  useEffect(() => {
    dotaAPI.getHeroes().then(function (heroes) {
      heroes.map(function (hero: Hero) {
        hero.isActive = true
        return hero
      })

      setHeroes(heroes)
      const strengthHeroes = heroes.filter((hero: Hero) => hero.primaryAttr === 'str')
      setStrHeroes(strengthHeroes)
      const agiHeroes = heroes.filter((hero: Hero) => hero.primaryAttr === 'agi')
      setAgiHeroes(agiHeroes)
      const intHeroes = heroes.filter((hero: Hero) => hero.primaryAttr === 'int')
      setIntHeroes(intHeroes)
    }).catch((error) => {
      message.error(error.message)
    })
  }, [])

  useEffect(() => {
    filterHeroes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, attackType])

  function onRoleChange(value: string) {
    setRole(value)
  }

  function onAttackTypeChange(value: string) {
    setAttackType(value)
  }

  return (
    <div style={{ padding: '20px 8px 0 8px' }}>
      Role &nbsp;
      <Select defaultValue={role} style={{ width: 120 }} onChange={onRoleChange}>
        <Option value="">All </Option>
        <Option value="Carry">Carry</Option>
        <Option value="Disabler">Disabler</Option>
        <Option value="Durable">Durable</Option>
        <Option value="Escape">Escape</Option>
        <Option value="Initiator">Initiator</Option>
        <Option value="Jungler">Jungler</Option>
        <Option value="Nuker">Nuker</Option>
        <Option value="Pusher">Pusher</Option>
        <Option value="Support">Support</Option>
      </Select>
      &nbsp; Attack Type &nbsp;
      <Select defaultValue={attackType} style={{ width: 120 }} onChange={onAttackTypeChange}>
        <Option value="">All</Option>
        <Option value="Melee">Melee</Option>
        <Option value="Ranged">Ranged</Option>
      </Select>
      <Heroes type='Strength' heroes={strHeroes} />
      <Heroes type='Agility' heroes={agiHeroes} />
      <Heroes type='Intelligence' heroes={intHeroes} />
    </div>
  )
}