const {validationResult} = require('express-validator')

const validateFinal = (req, res, next)=>{
    const err = validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).send({
            error: err
        })
    }
    next()
}

module.exports = validateFinal