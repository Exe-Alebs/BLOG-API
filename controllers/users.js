const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const createUser = async (req, res, next) => {
  try {
    // grab details from the request
    const { firstName, lastName, username, email, password } = req.body
    // create user object
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    })
    // save to database
    const createdUser = await newUser.save()
    // return response
    return res.status(201).json({
      status: 'success',
      data: createdUser,
    })
  } catch (err) {
    next(err)
  }
}  
async function LoginUser(req, res, next){
    try {
      // grab username and password from request
      const { username, password } = req.body
      // check database for user
      const user = await User.findOne({ username })
      const passwordIsValid = user === null ? false : await user.passwordIsValid(password)
  
      if (!(user && passwordIsValid)) {
        return res.status(403).json({
          message: 'Username/password is incorrect',
        })
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      const validityPeriod = '1h'
      const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: validityPeriod })
  
      res.json({ token, username: user.username, name: user.firstName })
    } catch (e) {
      next(e)
    }
  }


module.exports = {
  createUser,
  LoginUser,
}