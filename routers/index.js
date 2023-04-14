const router = require('express').Router();
const PhotoController = require('../controllers/photoController');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.use(authentication);

router.get('/photos', PhotoController.getAllPhotos);
router.get('/photos/:id', PhotoController.getPhotoById);
router.post('/photos', PhotoController.createPhoto);

router.use('/photos/:id',authorization);

router.put('/photos/:id', PhotoController.updatePhotoById);
router.delete('/photos/:id', PhotoController.deletePhotoById);

module.exports = router;