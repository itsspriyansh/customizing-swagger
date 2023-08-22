const { users } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SIGNATURE, {
        expiresIn: maxAge
    })
}

const signup_post = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const User = await users.create({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
        });
        const token = createToken(User.id);
        res.cookie("jwt", token, { maxAge: maxAge*1000 });
        res.status(201).json({
            id: User.id,
            name,
            email,
            username,
            token: User.token,
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge : 1 })
}

module.exports = { signup_post, logout_get };