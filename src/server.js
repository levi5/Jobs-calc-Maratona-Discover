import express from 'express'
import cors from 'cors'
import { join, resolve } from 'path'
import dotenv from 'dotenv'
import route from "./router/routes.js"

import './db/init.js'

dotenv.config()
const __dirname = resolve()

const baseUrl = process.env.BASE_URL || "http://localhost"
const port = process.env.PORT || 3000

const address = {
    baseUrl,
    port
}

const server = express()



server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'src/views'))
server.use(express.static(resolve(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(route)

const emojisTime = ['⚪', '⚫', '🔴', '🔵', '🟤', '🟣', '🟢', '🟡', '🟠']


const obj = {
    count: 0,
    print: () => {
        console.clear()
        console.log(`✅ Server is running at ${address.baseUrl}:${address.port} 🚀🤖 ${emojisTime[obj.count]} `)
        setInterval(() => {
            console.clear()
            console.log(`✅ Server is running at ${address.baseUrl}:${address.port} 🚀🤖 ${emojisTime[obj.count]} `)
            obj.count = obj.count + 1 >= emojisTime.length ? 0 : obj.count = obj.count + 1
        }, 60000);
    }
}

server.listen(address.port, obj.print())
