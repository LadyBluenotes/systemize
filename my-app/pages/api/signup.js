import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
import User from '../../model/schema'

export default async function signup(req, res) {
    try {
    
      const saltRounds = 10;
      const hash = bcrypt.hashSync(req.body.password, saltRounds)

      const user = await new User({
        id: uuidv4(),
        createdAt: Date.now(),
        username: req.body.username,
        hash: hash,
      });

      console.log(user)
      res.redirect('/')
      return user;

  } catch (error) {
      res.status(400).json({status:'Not able to create a new user.'})
  }

}
