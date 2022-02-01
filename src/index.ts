import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
// const bodyParser = require('body-parser')
import { randomUUID } from 'crypto'
// const { randomUUID }  = require('crypto')
import { auth } from './auth/auth'
import cors from 'cors'
// const cors = require('cors')
import jwt from 'jsonwebtoken'
// const jwt = require('jsonwebtoken')

const app = express()
import { db } from './db'
export const secret = 'mySecretKey'

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(4001, ()=> {
    console.log('Server is running on port 4001')
})
app.get('/pokemons', auth, (_: Request, res: Response) => {
    res.statusCode = 200
    res.json(db)
})
app.get('/pokemons/:id', auth, (req: Request, res: Response) => {
    res.statusCode = 200
    res.json(db.pokemons.find(({ id }) => req.params.id == id ))
})
app.post('/pokemons', auth, (req: Request, res: Response) => {
    const { name, type, level } = req.body
    const checkIfExists = db.pokemons.find((poke) => poke.name == name)
    if(checkIfExists) {
        res.statusCode = 400
        res.json({
            error: 'Pokemon already exists'
        })
    } else {
        const newPokemon = {
            id: randomUUID(),
            name,
            type,
            level
        }
        db.pokemons.push(newPokemon)
        res.statusCode = 201
        res.json(newPokemon)
    }
})

app.delete('/pokemons/:name', auth, (req: Request, res: Response) => {
    const { name } = req.params
    const pokeToFindIndex = db.pokemons.findIndex((poke) => poke.name == name)
    console.log("justHere", pokeToFindIndex)
    if(pokeToFindIndex == -1) {
        res.statusCode = 400
        res.json({message: "Pokémon não existe"})
    }
    db.pokemons.splice(pokeToFindIndex, 1)
    res.statusCode = 200
    res.json({message: "Pokemon deletado"})
})
app.get('*', (_: Request, res: Response) => {
    res.statusCode = 404
    res.json({message: "Rota não encontrada"})
})

app.post('/auth', (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = db.users.find(user => user.email == email)
    const isLoginValid = user?.password == password
    if(isLoginValid && user) {
        jwt.sign({
            id: user.id,
            email: user.email,
            password: user.password,
            },
            secret,
            { expiresIn: '1h' },
            (err: any, token: string | undefined) => {
                if(err) {
                    res.statusCode = 400
                    res.json({message: "Falha no login"})
                } else  {
                    res.statusCode = 200
                    res.json({token, expiresIn: '1h'})
                }
            }
        )

    } else {
        res.statusCode = 403
        res.json({message: "Não login"})
    }
})