const path = require("path");

const fs = require('fs');

const deleteFile = (collection = '', img = '')=> {
    const pathImage = path.join(__dirname, '../uploads', collection, img)
    if(fs.existsSync( pathImage )){
        fs.unlink(pathImage)
    }
}

module.exports = deleteFile