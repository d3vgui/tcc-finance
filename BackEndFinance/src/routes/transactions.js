let express = require('express')
let router = express.Router()
const transaction_controller = require('../controllers/transactionsController')

const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/list', transaction_controller.transaction_list_get)

router.post('/post', transaction_controller.transaction_create_post)

module.exports = router;
