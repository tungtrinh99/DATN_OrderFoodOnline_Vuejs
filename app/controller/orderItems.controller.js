const db = require('../config/db.config');
const fs = require("fs");

class OrderItemsController {
  // Lấy danh sách chi tiết đơn hàng
  list(req, res, next) {

    let id = req.query.id
    db.query(`select * from order_item where order_id = ${id}`, (err, result, field) => {
      if (!err) {
        res.send({
          'data': {
            'items': result
          }
        });

      } else {
        console.log(err);
      }
    })
  }
  // lưu chi tiet don
  save(req, res, next) {

    let data = req.body;

    db.query(`INSERT INTO order_item SET ?  `, data, (err, result, fields) => {
      if (!err) {
        res.send({
          'errorCode': 1,
          'data': {
            'items': result
          }
        });

      } else {
        res.send({
          'errorCode': 0,
          'message': err
        });

      }
    });
  }
}

module.exports = new OrderItemsController;