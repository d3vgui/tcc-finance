let express = require('express')
let router = express.Router()
const category_controller = require('../controllers/categoryController')

const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/list', category_controller.category_list_get)

router.post('/post', category_controller.category_create_post)

module.exports = router
