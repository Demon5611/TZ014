import express from 'express';
import { Post } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  const initState = { posts };
  res.render('Layout', initState);
});

export default router;
