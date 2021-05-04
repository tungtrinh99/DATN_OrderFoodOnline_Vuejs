const db = require('../config/db.config');
const fs = require("fs");

class RestaurantController {
  // Lấy danh sách nhà hàng
  list(req, res, next) {
    const keyword = req.query.keyword;
    db.query(`
              select a.*,b.full_address ,c.fullname as name_of_user_id from 
              restaurant a join location b on a.location_id = b.id join user c on a.user_id = c.id
              where a.title like "%${keyword}%" or b.full_address like "%${keyword}%"`,
      (err, result, field) => {
        if (!err) {
          res.send({
            'data': {
              'items': result
            }
          });
        } else {
          res.send(err)
        }
      })



  }
  // Lấy danh sách món ăn nhà hàng
  item(req, res, next) {
    const id = req.query.id;
    const keyword = req.query.keyword;
    db.query(`
              select b.* , a.combo_id , a.cost , a.discount , a.content from restaurant_food as a join food as b on a.food_id = b.id 
              where a.restaurant_id = ${id} and b.title like "%${keyword}%"`,
      (err, result, field) => {
        if (!err) {
          res.send({
            'data': {
              'items': result
            }
          });

        } else {
          res.send(err)
        }
      })



  }
  // thêm món nhà hàng
  save(req, res, next) {
    const data = req.body;

    db.query(`
            INSERT INTO restaurant SET ?  `, data,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  // cập nhật món nhà hàng
  update(req, res, next) {
    const id = req.query.id;
    const data = req.body;
    db.query(
      `UPDATE restaurant SET ? WHERE id = ${id}`,
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
  //xóa món nhà hàng
  delete(req, res, next) {
    const id = req.query.id;
    db.query(`
            DELETE FROM restaurant WHERE id = ${id}`,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  //Lấy chi tiết 1 nhà hàng
  detail(req, res, next) {
    const id = req.query.id;

    db.query(`
            SELECT a.* , b.full_address FROM restaurant a join location b on a.location_id = b.id  
            WHERE a.id = ${id}`,
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
      })
  }
  //Lấy danh sách loại nhà hàng
  type(req, res, next) {
    db.query(`
            SELECT * FROM restaurant_type`,
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
      })

  }
  //Lấy danh sách địa điểm
  address(req, res, next) {
    const id = req.query.id;
    db.query(`
              SELECT * FROM location WHERE restaurant_id = ${id}`,
      (err, result, field) => {
        if (!err) {
          res.send({
            data: {
              item: result
            }
          });
        } else {
          console.log(err);
        }
      })
  }
  //thêm ảnh nhà hàng
  upload(req, res, next) {
    const file = req.file;
    res.send({
      'data': file.filename
    })
  }
  // lay danh sach ma giam gia
  discount(req, res, next) {
    const id = req.query.id;
    db.query(`
              SELECT c.*,b.title FROM restaurant_discount_code a
              JOIN restaurant b ON a.restaurant_id = b.id 
              JOIN discount_code c ON a.discount_code_id = c.id 
              WHERE a.restaurant_id = ${id}`,
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
      })
  }
}

module.exports = new RestaurantController;
