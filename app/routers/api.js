const express = require('express');
const router = express.Router();
const storage = require('../middlewares/upload')
const multer = require('multer');
const upload = multer({
  storage: storage
});


const food = require('../controller/food.controller');
const restaurant = require('../controller/restaurant.controller');
const user = require('../controller/user.controller');
const location = require('../controller/location.controller');
const merchant = require('../controller/merchant.controller');
const customer = require('../controller/customer.controller');
const auth = require("../controller/auth.controller");
const order = require("../controller/order.controller");
const orderItems = require("../controller/orderItems.controller");

//goods
router.get('/food/list', food.list);
router.get('/food/detail', food.detail);
router.post('/food/save', food.save);
router.post('/food/update', food.update);
router.get('/food/delete', food.delete);
router.get('/food/type', food.type)
router.post('/food/uploadFiles', upload.single('file'), food.upload);


//restaurant
router.get('/restaurant/list', restaurant.list);
router.get('/restaurant/detail', restaurant.detail);
router.post('/restaurant/save', restaurant.save);
router.post('/restaurant/update', restaurant.update);
router.get('/restaurant/delete', restaurant.delete);
router.get('/restaurant-type/list', restaurant.type);
router.get('/restaurant-food/list', restaurant.item);
router.get('/restaurant-location/list', restaurant.address);
router.get('/restaurant-discount/list', restaurant.discount)
//user
router.get('/user/list', user.list);
router.get('/user/detail', user.detail);
router.post('/user/save', user.save);
router.post('/user/update', user.update);
router.get('/user/delete', user.delete);
//merchant
router.get('/merchant/list', merchant.list);
router.get('/merchant/detail', merchant.detail);
router.post('/merchant/save', merchant.save);
router.post('/merchant/update', merchant.update);
router.get('/merchant/delete', merchant.delete);
//customer
router.get('/customer/list', customer.list);
router.get('/customer/detail', customer.detail);
router.post('/customer/save', customer.save);
router.post('/customer/update', customer.update);
router.get('/customer/delete', customer.delete);

// location
router.get('/location/list', location.list);
router.post('/location/save', location.save);
router.post('/location/update', location.update);
router.get('/location/detail', location.detail);
router.get('/location/delete', location.delete);
router.get('/vie-province/list', location.province);
router.get('/vie-district/list', location.district);
router.get('/vie-ward/list', location.ward);

//register
router.post('/auth/register', auth.register);
//login
router.post('/auth/login', auth.login);

//order
router.get('/order/list', order.list);
router.post('/order/save', order.save);
router.post('/order/update', order.update);



//order-detail
router.get('/order-item/list', orderItems.list);
router.post('/order-item/save', orderItems.save);

module.exports = router;
