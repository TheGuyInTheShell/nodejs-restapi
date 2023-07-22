
const {User} = require('../../models/models');

const validateEmailDB = (requireNotExits = true)=> 
    async (email = '') => {

        const emailExist = await User.findOne({ email });
        if (requireNotExits) {
            if (emailExist) {
                throw new Error(`The email ${email} is already registered`);
            }
        }
        if (!requireNotExits) {
            if (!emailExist) {
                throw new Error(`The email ${email} not exists`);
            }
        }
    }


module.exports = validateEmailDB
