require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {
    constructor(app) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = `/api/users`
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app?.use( cors() )
        this.app?.use( express.static('public') )
        this.app?.use( express.json() )
    }

    routes(){
        this.app?.use('/api/users', require('../routes/users'))
    }
    listen(){
        this.app?.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;