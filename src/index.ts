import express, { Express, Request, Response } from 'express'
import { Path } from './enum';
import dotenv from 'dotenv'
import cors from 'cors';
import { urlencoded, json } from 'body-parser'

import { usersRoutes } from './routes'

const app: Express = express();

dotenv.config()

const PORT = process.env.PORT


const posts = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet',
  },
];

const hello = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet',
  },
];

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

app.use(Path.Users, usersRoutes)

app.get(Path.Root, (req: Request, res: Response) => {
  res.send(JSON.stringify(hello))
})

app.get(Path.Posts, (req: Request, res: Response) => {
  res.send(posts);
})

app.use((req: Request, res: Response) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})

