import jwt from 'jsonwebtoken'

import { secret } from "../index"

export const auth = (req?: any, res?: any, next?:any) => {
    const authToken = req.headers['authorization']
    if(authToken) {
        const token = authToken.split(' ')[1]
        jwt.verify(token, secret, (err: any, data: any) => {
            if(err) {
               res.status(400)
               res.json({message: "Token invalido"}) 
            } else {
                const { email, password } = data
                req.authenticatedUser = {
                    email,
                    password,
                    token

                }
                next()
            }
        })         
    } else {
        res.status(400)
        res.json({message: "Token inválido"})
    }
}