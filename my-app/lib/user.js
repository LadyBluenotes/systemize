
import { v4 as uuidv4 } from 'uuid'

export async function findUser(req, res) {
  const { username } = req.body
    const user = await User.findOne({username})
    if(!user){
        return res.json({status:'Not able to find the user'})
    }
    else{
        res.redirect('/')
    }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
