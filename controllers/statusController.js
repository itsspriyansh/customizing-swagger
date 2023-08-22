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

module.exports = { statuses_get };