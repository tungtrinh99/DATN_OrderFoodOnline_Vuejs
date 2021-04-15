const express = require('express');
const router = express.Router();
const storage = require('../middlewares/upload')
const multer  = require('multer');
const upload = multer({ storage : storage });


const food = require('../controller/food.controller');
const restaurant = require('../controller/restaurant.controller');
const user = require('../controller/user.controller');


//goods
router.get('/food/list',food.list);
router.get('/food/detail',food.detail);
router.post('/food/save',food.save);
router.post('/food/update',food.update);
router.get('/food/delete',food.delete);
router.post('/food/uploadFiles',upload.single('file'),food.upload);



//restaurant
router.get('/restaurant/list',restaurant.list);
router.get('/restaurant/detail',restaurant.detail);
router.post('/restaurant/save',restaurant.save);
router.post('/restaurant/update',restaurant.update);
router.get('/restaurant/delete',restaurant.delete);
router.get('/restaurant/type',restaurant.type);
router.get('/restaurant-food/list',restaurant.item)
//user
router.get('/user/list',user.list);
router.get('/user/detail',user.detail);
router.post('/user/save',user.save);
router.post('/user/update',user.update);
router.get('/user/delete',user.delete);

module.exports = router;

