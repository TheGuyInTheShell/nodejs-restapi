const {Router} = require('express');
const router = Router();
const {getUsers, postUsers, deleteUsers, putUsers} = require('../controllers/users');

router.get('/', getUsers)

router.post('/', postUsers)

router.delete('/:id', deleteUsers)

router.put('/', putUsers)


module.exports = router;