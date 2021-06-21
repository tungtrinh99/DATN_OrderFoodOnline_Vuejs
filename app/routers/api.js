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
const vehicle = require("../controller/vehicle.controller");
const discount = require("../controller/discount.controller");


//goods
router.post('/food/list', food.list);
router.get('/food/detail', food.detail);
router.post('/food/save', food.save);
router.post('/food/update', food.update);
router.get('/food/delete', food.delete);
router.get('/food/type', food.type)
router.post('/food/uploadFiles', upload.single('file'), food.upload);


//restaurant
router.post('/restaurant/list', restaurant.list);
router.get('/restaurant/detail', restaurant.detail);
router.post('/restaurant/save', restaurant.save);
router.post('/restaurant/update', restaurant.update);
router.get('/restaurant/delete', restaurant.delete);
router.get('/restaurant-type/list', restaurant.type);
router.post('/restaurant-food/list', restaurant.item);
router.get('/restaurant-food/detail', restaurant.detailItem);
router.post('/restaurant-food/update', restaurant.updateItem);
router.post('/restaurant-food/delete', restaurant.deleteItem);
router.post('/restaurant-food/save', restaurant.saveItem);

router.get('/restaurant-location/list', restaurant.address);
router.post('/restaurant-discount/list', restaurant.discount);
router.post('/restaurant-discount/save', restaurant.saveDiscount);
router.get('/restaurant-discount/delete', restaurant.deleteDiscount);

// discount
router.post('/discount/list', discount.list);
router.post('/discount/save', discount.save);
router.get('/discount/delete', discount.delete);
router.post('/discount/update', discount.update);
router.get('/discount/detail', discount.detail);
//user
router.get('/user/list', user.list);
router.get('/user/detail', user.detail);
router.post('/user/save', user.save);
router.post('/user/update', user.update);
router.get('/user/delete', user.delete);
//merchant
router.post('/merchant/list', merchant.list);
router.get('/merchant/detail', merchant.detail);
router.post('/merchant/save', merchant.save);
router.post('/merchant/update', merchant.update);
router.get('/merchant/delete', merchant.delete);
//customer
router.post('/customer/list', customer.list);
router.get('/customer/detail', customer.detail);
router.post('/customer/save', customer.save);
router.post('/customer/update', customer.update);
router.get('/customer/delete', customer.delete);

// location
router.post('/location/list', location.list);
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
router.post('/orders/list', order.list);
router.post('/orders/save', order.save);
router.post('/orders/update', order.update);
router.get('/order/detail',order.detail)


//order-detail
router.get('/order-item/list', orderItems.list);
router.post('/order-item/save', orderItems.save);

//danh sách tài xế
router.get('/driver/list',vehicle.list);
router.post('/driver/update',vehicle.update);

// Báo cáo 
router.post('/report-revenue/report',order.report)

module.exports = router;

