const db = require('../config/db.config');
const fs = require("fs");

class OrderItemsController {
  // Lấy danh sách chi tiết đơn hàng
  list(req, res, next) {
    let id = req.query.id;
    db.query(`select b.avatar_id as food_avatar,b.title as name_of_food,c.title as name_of_combo , c.avatar_id as combo_avatar , a.* from order_item a left JOIN food b ON a.food_id = b.id left join combo c on c.id = a.combo_id  where order_id = ${id}`, (err, result, field) => {
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
