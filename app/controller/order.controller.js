const db = require('../config/db.config');
const fs = require("fs");

class OrderController {
  // Lấy danh sách đơn hàng
  list(req, res, next) {


    db.query(`select * from order`, (err, result, field) => {
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
    })
  }
  // lưu đơn mới
  save(req, res, next) {


    let data = req.body;

    db.query('INSERT INTO `order` SET ?  ', data, (err, result, fields) => {
      if (!err) {
        res.send({
          'errorCode': 1,
          'data':  result
          
        });

      } else {
        res.send({
          'errorCode': 0,
          'message': err
        });

      }
    });
  }
  //cập nhật đơn
  update(req, res, next) {
    let id = req.query.id;
    let data = req.body;
    db.query(
      `UPDATE order SET ? WHERE id = ${id}`,
      data,
      (err, result, field) => {
        if (!err) {
          res.send({
            data: {
              items: result
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  }
}

module.exports = new OrderController;
