const {Role} = require('../../models/models');

const validateRoleDB = (required = true)=> 
    async (rol)=>{
        const existRole = await Role.findOne({rol})
        if (required && !rol) {
            throw new Error('Role is required')
        }
        if(!existRole){ 
            throw new Error('Role is not valid')
        }
    }

module.exports = validateRoleDB