import express from 'express';
import { User } from '../../db/models';

const apiTableRouter = express.Router();

apiTableRouter.post('/new', async (req, res) => {
  const { soname, name, secondname } = req.body;

  try {
    const newUser = await User.create({
      name,
      soname,
      secondname,
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiTableRouter.delete('/user/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
  window.location.href = '/';
});

export default apiTableRouter;
