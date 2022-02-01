const { randomUUID }  = require('crypto')
interface Pokemons {
    pokemons: Pokemon[]
    users: User[]
}
interface User {
    email: string,
    password: string,
    id: string
}
interface Pokemon {
    id: string
    name: string
    type: string
    level: number
}

export let db: Pokemons = {
    pokemons: [
        {
            id: randomUUID(),
            name: 'Pikachu',
            type: 'electric',
            level: 1,
        },
        {
            id: randomUUID(),
            name: 'Bulbasaur',
            type: 'grass',
            level: 1,

        },
        {
            id: randomUUID(),
            name: 'Charmander',
            type: 'fire',
            level: 1,
            
        },
        {
            id: randomUUID(),
            name: 'Squirtle',
            type: 'water',
            level: 1,
            
        }
    ],
    users: [
        {
            id: randomUUID(),
            email: "asd@asd.com",
            password: "tryitnow"
        },
        {
            id: randomUUID(),
            email: "bbb@asd.com",
            password: "tryiteow"
        }
    ]
}
