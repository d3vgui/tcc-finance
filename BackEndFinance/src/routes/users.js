let express = require('express')
let router = express.Router()
const user_controller = require('../controllers/userController')

// MIDDLEWARES
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.get('/list', authMiddleware, adminMiddleware, user_controller.user_create_list);

router.post('/signup', user_controller.user_create_post);

router.post('/login', user_controller.user_login_post);

router.get('/me', authMiddleware, user_controller.user_profile_get);

router.post('/logout', user_controller.user_logout_post);

module.exports = router;
