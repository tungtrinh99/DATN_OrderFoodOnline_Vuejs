const db = require('../config/db.config');
const fs = require("fs");

class OrderController {
  // Lấy danh sách đơn hàng
  list(req, res, next) {
    let status = req.body.status;
    let textSearch = req.body.textSearch || "";
    let restaurant_id = req.body.id;
    var query = `SELECT a.*,b.title as name_of_restaurant_id,c.fullname as name_of_customer_id FROM orders a JOIN restaurant b ON a.restaurant_id = b.id JOIN user c ON a.customer_id = c.id WHERE a.order_code LIKE "%${textSearch}%"`;
    if(status){
      query = query +' '+`AND a.status = ${status}`
    }
    if(restaurant_id){
      query = query +" "+`AND a.restaurant_id = ${restaurant_id}`
    }
    db.query(query, (err, result, field) => {
      if (!err) {
        res.send({
          'errorCode': 1,
          'total_order': result.length,
          'data': {
            'items': result
          },

         
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

    db.query('INSERT INTO `orders` SET ?  ', data, (err, result, fields) => {
      if (!err) {
        res.send({
          'errorCode': 1,
          'data': result

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
      `UPDATE orders SET ? WHERE id = ${id}`,
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
  detail(req, res, next) {
    let id = req.query.id;
    db.query(
      `SELECT a.*,b.fullname as name_of_customer,b.phone_number as customer_phone , b.avatar_id as customer_avatar , b.user_code, c.title as name_of_restaurant FROM  orders a JOIN user b ON a.customer_id = b.id join restaurant c ON a.restaurant_id = c.id WHERE a.id = ${id}`,
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
