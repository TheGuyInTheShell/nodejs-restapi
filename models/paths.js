const paths = [
    {
        uri: `/api/users`,
        filepath:  ()=> require('../routes/users')
    },
    {
        uri: `/auth`,
        filepath: ()=> require('../routes/auth')
    },
    {
        uri: `/api/categories`,
        filepath: ()=> require('../routes/categories')
    },
    {
        uri: `/api/products`,
        filepath: ()=> require('../routes/products')
    },
    {
        uri: `/api/search`,
        filepath: ()=> require('../routes/search')
    },
    {
        uri: `/api/uploads`,
        filepath: ()=> require('../routes/uploads')
    }
]

module.exports = paths