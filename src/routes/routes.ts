import { Request, Response, Router } from 'express';
import { Path } from './../enum';
import { addUser, getUsers } from './../repository';

export const usersRoutes = Router();

usersRoutes.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

usersRoutes.get(Path.Root, async (req: Request, res: Response) => {
  const users = await getUsers()
  res.send(users)
})

usersRoutes.get(Path.UserId, async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const users = await getUsers()
  const user = users.find(({ id }) => userId === id)

  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

usersRoutes.post(Path.Root, async (req: Request, res: Response) => {
  console.log(req.body.name)
  await addUser(req.body.name)
  res.send({ success: true })
})



