export interface Hero {
  id: number
  name: string
  localizedName: string
  primaryAttr: string
  attackType: string
  roles: [string]
  legs: number
  isActive: boolean
}

/* Example data from API
{
  "id": 1,
  "name": "npc_dota_hero_antimage",
  "localized_name": "Anti-Mage",
  "primary_attr": "agi",
  "attack_type": "Melee",
  "roles": [
    "Carry",
    "Escape",
    "Nuker"
  ],
  "legs": 2
}
*/