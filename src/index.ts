import express, { Express, Request, Response } from "express";
import { Path } from "./enum";
import dotenv from "dotenv";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import { connect } from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_DB;

main().catch(err => console.log(err));

async function main() {
	await connect("mongodb://" + MONGO_DB + "myUsers");
}

import { usersRoutes } from "./routes";

const app: Express = express();

const posts = [
	{
		title: "Lorem ipsum",
		content: "Dolor sit amet",
	},
];

const hello = [
	{
		title: "Lorem ipsum",
		content: "Dolor sit amet",
	},
];

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(Path.Users, usersRoutes);

app.get(Path.Root, (req: Request, res: Response) => {
	res.send(JSON.stringify(hello));
});

app.get(Path.Posts, (req: Request, res: Response) => {
	res.send(posts);
});

app.use((req: Request, res: Response) => {
	res.sendStatus(404);
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${ PORT }`);
});

