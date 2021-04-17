import dotenv from 'dotenv'
import UserModel from "../../models/User/user.js";
import { generateAccessToken } from "../../utils/token/index.js";
import { userValues } from '../../utils/generate-values.js'
import { hashPassword } from '../../utils/crypto/index.js';
import { httpResponse } from '../../helpers/response/http.js';

dotenv.config()

class SignUpController {

  async index(req, res) {
    let { error, valid } = req.query;

    if (valid !== 'false') {
      error = ''
      valid = true
    }
    const data = {
      valid: !(valid === 'false'),
      error
    }
    return res.render('sign-up', { data })
  }

  async save(req, res) {
    const { name, email, password } = req.body;
    let query = ""
    let statusCode = 401

    if (name !== '' && email !== '' && password !== '') {

      const password_hash =  await hashPassword(password)
      const defaultValues = userValues.generate()
      const newUser = {
        name,
        email,
        password: password_hash,
        ...defaultValues
      }
    
      const {valid, user, error}   = await UserModel.create(newUser)
      if (valid ) {
        const { id:userId } = user
        const token = await generateAccessToken({payload:userId })
        
        res.cookie('jobs-calc-auth', token)
        return res.redirect('/dashboard/' + userId)
      }
      let response = httpResponse(statusCode, user, error)
      query = '?error=' + response.error + '&valid=' + response.valid
    }
    return res.redirect("/login/signup" + query)
  }
}

export default new SignUpController()