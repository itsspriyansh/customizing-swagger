const { users, statuses } = require('../models')

const statuses_get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await users.findAll({
            where: { id: id },
            attributes: ['username'],
            include: [{
                model: statuses,
                attributes: ['content'],
            }]
        })
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

const statuses_post = async (req, res) => {
    try {
        const id = res.locals?.user?.id;
        const { page } = req.query;
        const { content } = req.body;
        if (id) {
            const status = await statuses.create({ userId: id, content: content });
            res.status(201).json(status);
        } else {
            res.status(401).json({ message: 'unauthorized' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { statuses_get, statuses_post };