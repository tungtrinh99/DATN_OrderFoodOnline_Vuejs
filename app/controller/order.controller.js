const db = require('../config/db.config');
const fs = require("fs");

class OrderController {
  // Lấy danh sách đơn hàng
  list(req, res, next) {
    let status = req.body.status;
    let textSearch = req.body.textSearch || "";
    let restaurant_id = req.body.id;
    let customer_id = req.body.customer_id;
    let not_status = req.body.not_status;
    let from_date = req.body.from_date;
    let to_date = req.body.to_date;
    var query = `SELECT a.*,b.title as name_of_restaurant_id,b.avatar_id as avatar_of_restaurant,c.fullname as name_of_customer_id FROM orders a JOIN restaurant b ON a.restaurant_id = b.id JOIN user c ON a.customer_id = c.id WHERE a.order_code LIKE "%${textSearch}%"`;
    if (status) {
      query = query + ' ' + `AND a.status = ${status}`
    }
    if (restaurant_id) {
      query = query + " " + `AND a.restaurant_id = ${restaurant_id}`
    }
    if (customer_id) {
      query = query + " " + `AND a.customer_id = ${customer_id}`
    }
    if (not_status) {
      query = query + " " + `AND a.status not in (4,5)`
    }
    if(from_date && to_date){
      query = query + " "+ `AND a.create_at BETWEEN '${from_date}' and '${to_date}'`
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
      `SELECT a.*,b.fullname as name_of_customer,b.phone_number as customer_phone , b.avatar_id as customer_avatar , b.user_code, c.title as name_of_restaurant ,c.avatar_id as avatar_of_restaurant, d.longitude,d.latitude FROM  orders a JOIN user b ON a.customer_id = b.id join restaurant c ON a.restaurant_id = c.id join location d on c.location_id = d.id WHERE a.id = ${id}`,
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
  report(req, res, next) {
    let restaurant_id = req.body.restaurantId;
    let start = req.body.startDate;
    let end = req.body.endDate;
    var query = ``;
    if(restaurant_id){
      query = `SELECT b.title , sum(a.grand_total) as revenue , count(a.id) as order_quantity , sum(a.shipping) as ship_fee from orders a join restaurant b on a.restaurant_id = b.id where create_at BETWEEN '${start}' and '${end}' and a.restaurant_id = ${restaurant_id} and a.status not in(1,5) GROUP BY restaurant_id`
    }else {
      query = `SELECT b.title , sum(a.grand_total) as revenue , count(a.id) as order_quantity , sum(a.shipping) as ship_fee from orders a join restaurant b on a.restaurant_id = b.id where create_at BETWEEN '${start}' and '${end}' and a.status not in(1,5) GROUP BY restaurant_id`;
    }
    db.query(query,(err,result,field)=>{
      if(!err){
        res.send({
          data : {
            items : result
          }
        })
      }else {
        res.send(err)
      }
    })
  }
}

module.exports = new OrderController;
