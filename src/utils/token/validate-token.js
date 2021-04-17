import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function isValidToken(token, value) {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    return await decodeToken(token, value)
  } catch (error) {
    return {
      id: -1,
      valid: false
    }
  }

}

export async function decodeToken(token, value) {
  try {
    const { id } = jwt.decode(token)
    const valid = id === value ? true : false
    return {
      id,
      valid
    }
  } catch (error) {
    return {
      id: -1,
      valid: false
    }
  }
}