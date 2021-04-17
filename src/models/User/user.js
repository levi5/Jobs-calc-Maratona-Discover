import QuerySchema from '../../sql/schema-sql.js'
import { fieldError } from '../../helpers/error/index.js'

class UserModel {

  async get(id) {
    try {
      const userId = Number(id)
      const response = await new QuerySchema('users').findOne([{ id: userId }])
      const user = this.#convertArrayToObject(response)

      if (user) {
        return {
          name: user.name,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          "monthly-budget": user.monthly_budget,
          "days-per-week": user.days_per_week,
          "hours-per-day": user.hours_per_day,
          "vacation-per-year": user.vacation_per_year,
          "value-hour": user.value_hour,
        }
      }
      return null
    } catch (err) {
      console.log(err.stack);
      return err
    }
  }
  async getByEmail(email) {
    try {
      const response  = await new QuerySchema('users').findOne([{ email }])
      let user        = this.#convertArrayToObject(response)
      const valid = user ? true : false
      const error = valid ? "" : fieldError.invalid("Email ou password invalido!!!")

      return {
        valid,
        user,
        error
      }
    } catch (err) {
      console.log(err.stack);
      return err
    }
  }
  async create(newUser) {
    try {
      let user;
      let response = await new QuerySchema('users').findOne([{ email: newUser.email }])
      const valid = this.#convertArrayToObject(response) ? false : true
      
      if (valid) {
        const values = 'name, email, password, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour'
        const response = await new QuerySchema('users').insertOne(newUser, values)
        user = this.#convertArrayToObject(response)
      }
      const error = valid ? "" : fieldError.invalid("Email invalido!!!")
      return {
        user,
        valid,
        error
      }
    } catch (err) {
      console.log(err.stack)
      return err
    }
  }
  async update(newData, userId) {
    try {
      const attr = "name, avatar, monthly_budget, days_per_week, hours_per_day,vacation_per_year,value_hour"
      const values = {
        name: newData.name,
        avatar: newData.avatar,
        monthly_budget:     Number(newData['monthly-budget']),
        days_per_week:      Number(newData['days-per-week']),
        hours_per_day:      Number(newData['hours-per-day']),
        vacation_per_year:  Number(newData['vacation-per-year']),
        value_hour:         Number(newData['value-hour'])
      }
      await new QuerySchema('users').update(attr, values, [{id: userId}])
    } catch (err) {
      console.log(err.stack);
      return null
    }
  }
  async delete(id) {
    try {
      const response = await new QuerySchema('users').delete([{id: Number(id)}])
      const user = this.#convertArrayToObject(response)
      return user
    } catch (error) {
      console.log(error.stack)
      return null
    }
  }

  #convertArrayToObject(response) {
    const { rows: users } = response
    return users[0]
  }
}
export default new UserModel()