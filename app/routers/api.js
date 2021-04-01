const express = require('express');
const router = express.Router();
// const multer  = require('multer');
// const upload = multer({ storage : storage });

const goods = require('../controller/goods.controller');
const restaurant = require('../controller/restaurant.controller');


//goods
router.get('/goods/list',goods.list);

//restaurant
router.get('/restaurant/list',restaurant.list);

module.exports = router;

