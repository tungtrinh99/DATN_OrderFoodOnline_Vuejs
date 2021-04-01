const express = require('express');
const router = express.Router();
// const multer  = require('multer');
// const upload = multer({ storage : storage });

const goods = require('../controller/goods.controller');
const restaurant = require('../controller/restaurant.controller');
const user = require('../controller/user.controller');


//goods
router.get('/goods/list',goods.list);
router.get('/goods/detail',goods.detail);
router.post('/goods/save',goods.save);
router.post('/goods/update',goods.update);
router.get('/goods/delete',goods.delete);


//restaurant
router.get('/restaurant/list',restaurant.list);
router.get('/restaurant/detail',restaurant.detail);
router.post('/restaurant/save',restaurant.save);
router.post('/restaurant/update',restaurant.update);
router.get('/restaurant/delete',restaurant.delete);

//user
router.get('/user/list',user.list);
router.get('/user/detail',user.detail);
router.post('/user/save',user.save);
router.post('/user/update',user.update);
router.get('/user/delete',user.delete);

module.exports = router;

