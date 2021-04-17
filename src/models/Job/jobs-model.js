import { v4 } from 'uuid'
import QuerySchema from '../../sql/schema-sql.js'

class JobsModel {
  async get(id) {
    const response = await new QuerySchema('job').findOne([{ user_id: Number(id) }])
    const jobs     = this.#convertArrayToObject(response)
   
    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      createdAt: job.created_at
    }))
  }
  async create(newJob) {
    const attr = 'id, name, daily_hours, total_hours,  user_id'
    const values = {
      id: v4(),
      name: newJob.name,
      daily_hours: Number(newJob['daily-hours']),
      total_hours: Number(newJob['total-hours']),
      user_id: Number(newJob.user_id)
    }
    const response  = await new QuerySchema('job').insertOne(values, attr)
    const user       = this.#convertArrayToObject(response)
  }
  async update(updatedJob, id, userId) {
    const attr = 'name, daily_hours, total_hours'
    const values = {
      name: updatedJob.name,
      daily_hours: Number(updatedJob['daily-hours']),
      total_hours: Number(updatedJob['total-hours'])
    }
    await new QuerySchema('job').update(attr, values, [{id}, {user_id: Number(userId)}])
  }
  async delete(id, user_id) {
    await new QuerySchema('job').delete([{id}, {user_id: Number(user_id)}])
    return
  }
  #convertArrayToObject(response) {
    const { rows: jobs } = response
    return jobs
  }
}
export default new JobsModel()