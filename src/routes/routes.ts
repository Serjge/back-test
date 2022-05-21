import { Request, Response, Router } from "express";
import { Path } from "../enum";
import { addUser, deleteUser, getUser, getUsers, renameUser } from "../repository";

export const usersRoutes = Router();

usersRoutes.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

usersRoutes.get(Path.Root, async (req: Request, res: Response) => {
	const users = await getUsers();
	res.send(users);
});

type GetBodyType = {
  userId: string,
}

usersRoutes.get(Path.UserId, async (req: Request, res: Response) => {
	const { userId } = req.params as GetBodyType;
	const user = await getUser(userId);

	if (user) {
		res.send(user);
		console.log("users ok");
	} else {
		res.sendStatus(404);
		console.log("users error");
	}
});

type PostBodyType = {
  name: string
}

usersRoutes.post(Path.Root, async (req: Request, res: Response) => {
	const { name } = req.body as PostBodyType;
	await addUser(name);
	res.send({ success: true });
});

type DeleteBodyType = {
  userId: string
}

usersRoutes.delete("", async (req: Request, res: Response) => {
	const { userId } = req.query as DeleteBodyType;
	await deleteUser(userId);
	res.send({ success: true });
});

type PutBodyType = {
  name: string,
  id: string,
}

usersRoutes.put(Path.Root, async (req: Request, res: Response) => {
	const { name, id } = req.body as PutBodyType;

	try {
		await renameUser(id, name);
		res.status(200).send({ success: true });
	} catch (error) {
		const {message} = error as Error;
		res.status(500).send({ error: message });

	}
});

