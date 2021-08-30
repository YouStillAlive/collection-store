const ApiError = require("../error/ApiError");
const { Item } = require('../models/Model.js');
const { Op } = require('sequelize');

class ItemController {
    async add(req, res, next) {
        try {
            const { name, description, collectionId } = req.body;
            await Item.create({ name, description, collectionId });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }

    async read(req, res, next) {
        try {
            const { id } = req.body;
            const item = await Item.findOne({ where: { id } }, { attributes: ['id', 'name', 'description', 'createdAt'] });
            if (!item) {
                return next(new ApiError(404, "Could not find item!!"));
            }
            return res.json(item);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const items = await Item.findAll({ attributes: ['id', 'name', 'description', 'createdAt'] });
            if (!items) {
                return next(new ApiError(404, "Could not find item!!"));
            }
            return res.json(items);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            await Item.destroy({ where: { id: { [Op.in]: [...id] } } });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, description } = req.body;
            await Item.update({ name: name, description: description }, { where: { id } });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }

    async findById(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ItemController();