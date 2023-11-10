import express from 'express';
import { User } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) =>{
  try  {    
  const users = await User.findAll({ order: [["id", 'ASC']] })
  const initState = { users};
  res.render('Layout', initState);
  } catch (error)  {
  console.error(error);
  res.sendStatus(500);
}  
});

export default router;
