const jwt = require('jsonwebtoken')
const { users } = require('../models')

const checkUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            console.log(token)
            jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await users.findOne({ where: { id: decodedToken.id }});
                res.locals.user = user;
                next();
            }})
        } else {
            res.locals.user = null;
            next();
        }
    } catch (err) {
        res.json(err);
    }
}

module.exports = { checkUser }