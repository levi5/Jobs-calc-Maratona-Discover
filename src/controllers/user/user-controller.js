import UserModel from "../../models/User/user.js"

class UserController {
  async index(req, res) {
    const { userId } = req.params
    const profile = await UserModel.get(userId)
    return res.render('profile', { profile, userId })
  }

  async update(req, res) {
    const data = req.body
    const { userId } = req.params
    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
    const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]
    const monthlyTotalHours = weeksPerMonth * weeksTotalHours

    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
    const profile = await UserModel.get(userId)

    await UserModel.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    }, Number(userId))
    res.redirect(`/profile/${userId}`)
  }
  async delete(req, res) {
    const { userId } = req.params
    const error = await UserModel.delete(Number(userId))
    if (!error)
      return res.redirect("/")
    return res.redirect("/profile/" + userId)
  }
}
export default new UserController()