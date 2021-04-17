import { v4 } from 'uuid'
import JobsModel from '../../models/Job/jobs-model.js'
import UserModel from '../../models/User/user.js'
import { calculateBudget } from "../../utils/job/calcDate.js"
import { isValidToken, getToken } from '../../utils/token/index.js'

class JobsController {

  async create(req, res) {
    const job = req.body
    const { userId } = req.params

    if (job) {
      await JobsModel.create({
        id: v4(),
        ...job,
        createdAt: Date.now(),
        user_id: Number(userId)
      })
      return res.redirect("/dashboard/" + userId)
    }
    return res.redirect("/job" + userId)
  }

  async save(req, res) {
    const { userId } = req.params
    let { valid, id } = await isValidToken(getToken(req, 'jobs-calc-auth'), Number(userId))
    if (valid) {
      return res.render('job', { userId })
    }
    return res.redirect('/dashboard/' + id)
  }

  async edit(req, res) {
    const { id, userId } = req.params
    const user = await UserModel.get(userId)
    const jobs = await JobsModel.get(userId)
    const job  = jobs.find(job => job.id === id)

    if (!job)
      return res.send("Job not found!!")

    const valueHour = user["value-hour"]
    job.budget = calculateBudget(job, valueHour)
    return res.render('job-edit', { job, userId })
  }

  async update(req, res) {
    const { id, userId } = req.params
    const { name, "total-hours": totalHours, "daily-hours": dailyHours } = req.body

    const updatedJob = {
      name,
      "total-hours": totalHours,
      "daily-hours": dailyHours
    }
    await JobsModel.update(updatedJob, id, userId)
    res.redirect("/" + userId + "/job/edit/" + id)
  }

  async delete(req, res) {
    const { id, userId } = req.params
    await JobsModel.delete(id, userId)
    return res.redirect("/dashboard/" + userId)
  }
}

export default new JobsController()