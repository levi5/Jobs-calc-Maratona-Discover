
const remainingDays = (job) =>{
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
  
    const createdDate = new Date(job.createdAt)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)
    const timeDiffInMs = dueDateInMs - Date.now()
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
      return dayDiff
  
  }
  const calculateBudget = (job, valueHour) => job["total-hours"] * valueHour
  export {remainingDays, calculateBudget}