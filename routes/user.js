const router = require('express').Router()
const { createUser, LoginUser } = require('../controllers/users')

router.route('/').post(createUser)
router.route('/').post(LoginUser)

module.exports = router


