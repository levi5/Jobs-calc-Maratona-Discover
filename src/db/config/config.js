import  pg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pg

dotenv.config()
const host = process.env.DB_HOST
const user = process.env.DB_USER
const database = process.env.DATABASE
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT


export const DB = new Pool({
    host,
    user,
    database,
    password,
    port
});

DB.on('error', (err, _client) => {
    console.error('Error:', err);
});