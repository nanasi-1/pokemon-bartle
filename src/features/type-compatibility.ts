type TypeName = "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" | "fairy"

export interface PokemonType {
  name: TypeName
  localizedName: string,
  damage_relations: {
    double_damage_from: string[] // nameを入れる
    double_damage_to: string[]
    half_damage_from: string[]
    half_damage_to: string[]
    no_damage_from: string[]
    no_damage_to: string[]
  }
  // NOTE sprite=アイコンはなし（本家にもアイコンはない & PokeAPIの画像が英語）
  // 代わりにポケモン図鑑を使用 https://zukan.pokemon.co.jp/?type
}

// tmp.jsonファイルに結果を書き込む
// @ts-ignore 普段は使わない
async function seed() {
  const TYPE_COUNT = 18 // ステラは除く
  const POKEAPI_ENDPOINT = 'https://pokeapi.co/api/v2/type'

  const ids = Array<number>(TYPE_COUNT).fill(0).map((_, index) => index + 1) // 1スタート
  const responses = await Promise.all(ids.map(async id => {
    const res = await fetch(`${POKEAPI_ENDPOINT}/${id}`)
    if (!res.ok) {
      throw new Error(`リクエストに失敗しました id:${id} status: ${res.status}`)
    }

    const text = await res.json()
    return text
  }))

  const result: PokemonType[] = responses.map(json => {
    const damage_relations: any = Object.fromEntries(
      Object.entries<{ name: string, url: string }[]>(json.damage_relations)
        .map(([key, array]) => [key, array.map(obj => obj.name)] as const)
    )

    return {
      name: json.name,
      localizedName: json.names.find((obj: any) => obj.language.name === 'ja')!.name,
      damage_relations
    }
  })
  console.log('Request OK')

  // @ts-expect-error
  const file = Bun.file(import.meta.dirname + '/tmp.json')
  // @ts-expect-error
  await Bun.write(file, JSON.stringify(result))
}

export function getTypeByName(name: PokemonType['name']): PokemonType {
  // @ts-ignore
  const result = POKEMON_TYPES.find(type => type.name === name)
  if (!result) throw new Error(`タイプ${name}が見つかりませんでした`)
  return result
}

export const POKEMON_TYPES: readonly PokemonType[] = [
  {
    "name": "normal",
    "localizedName": "ノーマル",
    "damage_relations": {
      "double_damage_from": [
        "fighting"
      ],
      "double_damage_to": [],
      "half_damage_from": [],
      "half_damage_to": [
        "rock",
        "steel"
      ],
      "no_damage_from": [
        "ghost"
      ],
      "no_damage_to": [
        "ghost"
      ]
    }
  },
  {
    "name": "fighting",
    "localizedName": "かくとう",
    "damage_relations": {
      "double_damage_from": [
        "flying",
        "psychic",
        "fairy"
      ],
      "double_damage_to": [
        "normal",
        "rock",
        "steel",
        "ice",
        "dark"
      ],
      "half_damage_from": [
        "rock",
        "bug",
        "dark"
      ],
      "half_damage_to": [
        "flying",
        "poison",
        "bug",
        "psychic",
        "fairy"
      ],
      "no_damage_from": [],
      "no_damage_to": [
        "ghost"
      ]
    }
  },
  {
    "name": "flying",
    "localizedName": "ひこう",
    "damage_relations": {
      "double_damage_from": [
        "rock",
        "electric",
        "ice"
      ],
      "double_damage_to": [
        "fighting",
        "bug",
        "grass"
      ],
      "half_damage_from": [
        "fighting",
        "bug",
        "grass"
      ],
      "half_damage_to": [
        "rock",
        "steel",
        "electric"
      ],
      "no_damage_from": [
        "ground"
      ],
      "no_damage_to": []
    }
  },
  {
    "name": "poison",
    "localizedName": "どく",
    "damage_relations": {
      "double_damage_from": [
        "ground",
        "psychic"
      ],
      "double_damage_to": [
        "grass",
        "fairy"
      ],
      "half_damage_from": [
        "fighting",
        "poison",
        "bug",
        "grass",
        "fairy"
      ],
      "half_damage_to": [
        "poison",
        "ground",
        "rock",
        "ghost"
      ],
      "no_damage_from": [],
      "no_damage_to": [
        "steel"
      ]
    }
  },
  {
    "name": "ground",
    "localizedName": "じめん",
    "damage_relations": {
      "double_damage_from": [
        "water",
        "grass",
        "ice"
      ],
      "double_damage_to": [
        "poison",
        "rock",
        "steel",
        "fire",
        "electric"
      ],
      "half_damage_from": [
        "poison",
        "rock"
      ],
      "half_damage_to": [
        "bug",
        "grass"
      ],
      "no_damage_from": [
        "electric"
      ],
      "no_damage_to": [
        "flying"
      ]
    }
  },
  {
    "name": "rock",
    "localizedName": "いわ",
    "damage_relations": {
      "double_damage_from": [
        "fighting",
        "ground",
        "steel",
        "water",
        "grass"
      ],
      "double_damage_to": [
        "flying",
        "bug",
        "fire",
        "ice"
      ],
      "half_damage_from": [
        "normal",
        "flying",
        "poison",
        "fire"
      ],
      "half_damage_to": [
        "fighting",
        "ground",
        "steel"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "bug",
    "localizedName": "むし",
    "damage_relations": {
      "double_damage_from": [
        "flying",
        "rock",
        "fire"
      ],
      "double_damage_to": [
        "grass",
        "psychic",
        "dark"
      ],
      "half_damage_from": [
        "fighting",
        "ground",
        "grass"
      ],
      "half_damage_to": [
        "fighting",
        "flying",
        "poison",
        "ghost",
        "steel",
        "fire",
        "fairy"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "ghost",
    "localizedName": "ゴースト",
    "damage_relations": {
      "double_damage_from": [
        "ghost",
        "dark"
      ],
      "double_damage_to": [
        "ghost",
        "psychic"
      ],
      "half_damage_from": [
        "poison",
        "bug"
      ],
      "half_damage_to": [
        "dark"
      ],
      "no_damage_from": [
        "normal",
        "fighting"
      ],
      "no_damage_to": [
        "normal"
      ]
    }
  },
  {
    "name": "steel",
    "localizedName": "はがね",
    "damage_relations": {
      "double_damage_from": [
        "fighting",
        "ground",
        "fire"
      ],
      "double_damage_to": [
        "rock",
        "ice",
        "fairy"
      ],
      "half_damage_from": [
        "normal",
        "flying",
        "rock",
        "bug",
        "steel",
        "grass",
        "psychic",
        "ice",
        "dragon",
        "fairy"
      ],
      "half_damage_to": [
        "steel",
        "fire",
        "water",
        "electric"
      ],
      "no_damage_from": [
        "poison"
      ],
      "no_damage_to": []
    }
  },
  {
    "name": "fire",
    "localizedName": "ほのお",
    "damage_relations": {
      "double_damage_from": [
        "ground",
        "rock",
        "water"
      ],
      "double_damage_to": [
        "bug",
        "steel",
        "grass",
        "ice"
      ],
      "half_damage_from": [
        "bug",
        "steel",
        "fire",
        "grass",
        "ice",
        "fairy"
      ],
      "half_damage_to": [
        "rock",
        "fire",
        "water",
        "dragon"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "water",
    "localizedName": "みず",
    "damage_relations": {
      "double_damage_from": [
        "grass",
        "electric"
      ],
      "double_damage_to": [
        "ground",
        "rock",
        "fire"
      ],
      "half_damage_from": [
        "steel",
        "fire",
        "water",
        "ice"
      ],
      "half_damage_to": [
        "water",
        "grass",
        "dragon"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "grass",
    "localizedName": "くさ",
    "damage_relations": {
      "double_damage_from": [
        "flying",
        "poison",
        "bug",
        "fire",
        "ice"
      ],
      "double_damage_to": [
        "ground",
        "rock",
        "water"
      ],
      "half_damage_from": [
        "ground",
        "water",
        "grass",
        "electric"
      ],
      "half_damage_to": [
        "flying",
        "poison",
        "bug",
        "steel",
        "fire",
        "grass",
        "dragon"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "electric",
    "localizedName": "でんき",
    "damage_relations": {
      "double_damage_from": [
        "ground"
      ],
      "double_damage_to": [
        "flying",
        "water"
      ],
      "half_damage_from": [
        "flying",
        "steel",
        "electric"
      ],
      "half_damage_to": [
        "grass",
        "electric",
        "dragon"
      ],
      "no_damage_from": [],
      "no_damage_to": [
        "ground"
      ]
    }
  },
  {
    "name": "psychic",
    "localizedName": "エスパー",
    "damage_relations": {
      "double_damage_from": [
        "bug",
        "ghost",
        "dark"
      ],
      "double_damage_to": [
        "fighting",
        "poison"
      ],
      "half_damage_from": [
        "fighting",
        "psychic"
      ],
      "half_damage_to": [
        "steel",
        "psychic"
      ],
      "no_damage_from": [],
      "no_damage_to": [
        "dark"
      ]
    }
  },
  {
    "name": "ice",
    "localizedName": "こおり",
    "damage_relations": {
      "double_damage_from": [
        "fighting",
        "rock",
        "steel",
        "fire"
      ],
      "double_damage_to": [
        "flying",
        "ground",
        "grass",
        "dragon"
      ],
      "half_damage_from": [
        "ice"
      ],
      "half_damage_to": [
        "steel",
        "fire",
        "water",
        "ice"
      ],
      "no_damage_from": [],
      "no_damage_to": []
    }
  },
  {
    "name": "dragon",
    "localizedName": "ドラゴン",
    "damage_relations": {
      "double_damage_from": [
        "ice",
        "dragon",
        "fairy"
      ],
      "double_damage_to": [
        "dragon"
      ],
      "half_damage_from": [
        "fire",
        "water",
        "grass",
        "electric"
      ],
      "half_damage_to": [
        "steel"
      ],
      "no_damage_from": [],
      "no_damage_to": [
        "fairy"
      ]
    }
  },
  {
    "name": "dark",
    "localizedName": "あく",
    "damage_relations": {
      "double_damage_from": [
        "fighting",
        "bug",
        "fairy"
      ],
      "double_damage_to": [
        "ghost",
        "psychic"
      ],
      "half_damage_from": [
        "ghost",
        "dark"
      ],
      "half_damage_to": [
        "fighting",
        "dark",
        "fairy"
      ],
      "no_damage_from": [
        "psychic"
      ],
      "no_damage_to": []
    }
  },
  {
    "name": "fairy",
    "localizedName": "フェアリー",
    "damage_relations": {
      "double_damage_from": [
        "poison",
        "steel"
      ],
      "double_damage_to": [
        "fighting",
        "dragon",
        "dark"
      ],
      "half_damage_from": [
        "fighting",
        "bug",
        "dark"
      ],
      "half_damage_to": [
        "poison",
        "steel",
        "fire"
      ],
      "no_damage_from": [
        "dragon"
      ],
      "no_damage_to": []
    }
  }
]
