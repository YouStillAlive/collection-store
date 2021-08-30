const ApiError = require("../error/ApiError");
const { Collection } = require('../models/Model.js');
const { Op } = require('sequelize');

class CollectionController {

    async add(req, res, next) {
        try {
            const { name, description, userId } = req.body;
            await Collection.create({ name, description, userId });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }

    async read(req, res, next) {
        try {
            const { id } = req.body;
            const collection = await Collection.findOne({ where: { id } }, { attributes: ['id', 'name', 'description', 'createdAt'] });
            if (!collection) {
                return next(new ApiError(404, "Could not find collection!!"));
            }
            return res.json(collection.dataValues);
        } catch (e) {
            console.log(e);
        }
    }

    async getByUserId(req, res, next) {
        try {
            const { id } = req.body;
            const collection = await Collection.findAll({ where: { userId: id } }, { attributes: ['id', 'name', 'description', 'createdAt'] });
            if (!collection) {
                return next(new ApiError(404, "Could not find collection!!"));
            }
            return res.json(collection);
        } catch (e) {
            console.log(e);
        }
    }


    async getAll(req, res, next) {
        try {
            const collections = await Collection.findAll({ attributes: ['id', 'name', 'description', 'createdAt'] });
            if (!collections) {
                return next(new ApiError(404, "Could not find collection!!"));
            }
            return res.json(collections);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            console.log(id + '\n\n');

            await Collection.destroy({ where: { id: id } });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, description } = req.body;
            console.log(JSON.stringify(req.body));
            await Collection.update({ name: name, description: description }, { where: { id } });
            return res.status(200).json({ "message": "Ok!" });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new CollectionController();