import dotenv from 'dotenv'
dotenv.config()

const url = process.env.BASE_URL
const port = process.env.PORT

export const userValues = {
	generate() {
		return {
			avatar: url + ':' + port + '/images/default-user.svg',
			monthly_budget: 3000,
			days_per_week: 5,
			hours_per_day: 5,
			vacation_per_year: 4,
			value_hour: 40,
		}
	}
}

