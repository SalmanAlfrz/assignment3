const { Photo, User } = require('../models');

class PhotoController {
    static getAllPhotos(req, res) {
        Photo.findAll({
            include: User
        })
            .then(photos => {
                res.status(200).json(photos);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    static getPhotoById(req, res) {
        let id = req.params.id;
        Photo.findByPk(id)
            .then(photo => {
                res.status(200).json(photo);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static createPhoto(req, res) {
        const { title, caption, image_url } = req.body;
        const user = res.locals.user;
        Photo.create({
            title,
            caption,
            image_url,
            UserId: user.id
        })
            .then(photo => {
                res.status(200).json(photo);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static updatePhotoById(req, res) {
        let id = +req.params.id;
        const { title, caption, image_url } = req.body;
        let data = {
            title,
            caption,
            image_url
        }
        Photo.update(
            data,
            {
                where: {
                    id
                },
                returning: true
            })
            .then(photo => {
                res.status(200).json(photo);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static deletePhotoById(req, res) {
        let id = +req.params.id;
        Photo.destroy({
            where: {
                id
            }
        })
            .then(photo => {
                res.status(200).json(photo);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}

module.exports = PhotoController;