import express from 'express';
import axios from 'axios';
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


router.get('/tretyakovgallery', async (req, res) => {
  try {
    const response = await axios.get('https://www.tretyakovgallery.ru');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
