const router = require('express').Router()
const blogcontroller = require('../controllers/blog')
const { UserToken , attachedUser } = require('../authentication/auth')
const {pagination} = require('../middlewares/pages')


router.route('/blogs')
  .get(pagination, blogcontroller.getBlogs)
  .post(UserToken, blogcontroller.createBlog)

router.route('/p')
  .get(pagination, blogcontroller.getBlogs)

router.route('/:id')
.get(attachedUser, blogcontroller.getBlog)
  .patch(UserToken, blogcontroller.updateBlogState)
  .put(UserToken, blogcontroller.updateBlog)
  .delete(UserToken, blogcontroller.deleteBlog)

module.exports = router