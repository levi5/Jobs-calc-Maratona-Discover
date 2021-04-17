import UserModel from '../../models/User/user.js'
import { comparePassword } from '../../utils/crypto/compare.js';
import { isValidToken, generateAccessToken, getToken } from '../../utils/token/index.js';
import { httpResponse } from '../../helpers/response/http.js';

class SignInController {
  index(req, res) {
    let { error, valid } = req.query;

    if (valid !== 'false') {
      error = ''
      valid = true
    }
    const data = { valid: !(valid === 'false'), error }
    return res.render('sign-in', {data})
  }

  async auth(req, res) {
    try {
      const { email, password } = req.body
      const {valid, user, error } = await UserModel.getByEmail(email)
      let query;
      let statusCode = 401
    
      if (valid) {
      const password_valid  = await comparePassword(password, user.password)
      
      if (email && password &&  password_valid) {
        const { id: userId } = user
        let token = getToken(req, 'jobs-calc-auth')
        
        const { valid } = await isValidToken(token, userId)
        token = valid ? token : await generateAccessToken({ payload: userId })
        
        res.cookie('jobs-calc-auth', token)
        return res.redirect('/dashboard/' + userId)
      }
    }
      const response = httpResponse(statusCode, user, error)
      query = '?error=' + response.error + '&valid=' + response.valid
      return res.redirect("/login/signin" +  query)
    } catch (err) {
      console.log(err.stack)
      return null
    }
  }
}

export default new SignInController()