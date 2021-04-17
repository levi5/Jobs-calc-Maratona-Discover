import JobsModel from "../../models/Job/jobs-model.js"
import UserModel from "../../models/User/user.js"
import { calculateBudget, remainingDays } from '../../utils/job/calcDate.js'
import { isValidToken, getToken } from '../../utils/token/index.js';


class DashboardController {

  async index(req, res) {
    let { userId }  = req.params;
    const { valid } = await isValidToken(getToken(req, 'jobs-calc-auth'), Number(userId))

    if (valid) {
      const user = await UserModel.get(userId)

      if (user) {
        const jobs = await JobsModel.get(userId)
        let statusCont = {
          progress: 0,
          done: 0,
          total: jobs.length
        }

        let jobTotalHours = 0
        const updatedJobs = jobs.map((job) => {

          const remaining = remainingDays(job)
          const status = remaining <= 0 ? "done" : "progress"
          const valueHour = user["value-hour"]
          const budget = calculateBudget(job, valueHour)
          statusCont[status] += 1

          jobTotalHours = status === "progress" ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours

          return {
            ...job,
            remaining,
            status,
            budget
          }
        })
        const freeHours = Number(user["hours-per-day"]) - jobTotalHours
        return res.render('dashboard', { jobs: updatedJobs, user, statusCont, freeHours, userId })
      }
    }
    return res.redirect("/")
  }
}
export default new DashboardController()