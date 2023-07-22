const router = require('express').Router();
const {search} = require('../controllers/search');


router.get('/:collection/:term', search)


module.exports = router;