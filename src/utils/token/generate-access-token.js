import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function generateAccessToken({ payload }) {
    const token = jwt.sign({id: payload}, process.env.TOKEN_SECRET, { 
      expiresIn: process.env.TOKEN_EXPIRES_IN
    })
    return token
  }