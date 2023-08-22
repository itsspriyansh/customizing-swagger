const { users } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SIGNATURE, {
        expiresIn: maxAge
    })
}

const user_get = async (req, res) => {
    try {
        const id = res.locals?.user?.id
        if (id) {
            const user = await users.findOne({
                where: { id: id },
                attributes: { exclude: ['password'] }
              });              
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'unauthorized' });
        }
    } catch(err) {
        res.status(400).json(err);
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ where: { email: email } });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user.id);
                res.cookie("jwt", token, { maxAge : maxAge * 1000 });
                res.status(200).json({ userId : user.id, token: token});
            } else {
                res.status(401).json({ message: 'incorrect password' });
            }
        } else {
            res.status(401).json({ message: 'incorrect email' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

const signup_post = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await users.create({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
        });
        const token = createToken(user.id);
        res.cookie("jwt", token, { maxAge: maxAge*1000 });
        res.status(201).json({
            id: user.id,
            name,
            email,
            username,
            token,
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge : 1 })
    res.send("logged out");
}

module.exports = { signup_post, login_post, logout_get, user_get };