const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const validateAuth = require('../middlewares/auth/validatePost');

const router = Router();

//router.get('/')

router.post('/login', validateAuth, login)

router.post('/google',  googleSignIn)

// router.delete('/logout')

// router.put('/:id')


module.exports = router;