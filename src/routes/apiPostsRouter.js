import express from 'express';
import { Post } from '../../db/models';

const router = express.Router();

router.post('/addPost', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.json(newPost);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



export default router;
