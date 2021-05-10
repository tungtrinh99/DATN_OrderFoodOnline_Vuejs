const db = require('../config/db.config');
const fs = require("fs");

class RestaurantController {
  // Lấy danh sách nhà hàng
  list(req, res, next) {
    const textSearch = req.body.textSearch || "";
    db.query(`
              select a.*,b.full_address ,c.fullname as name_of_user_id , d.title as name_of_restaurant_type_id from 
              restaurant a join location b on a.location_id = b.id join user c on a.user_id = c.id join restaurant_type d on a.type_id = d.id
              where a.title like "%${textSearch}%" or b.full_address like "%${textSearch}%"`,
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
    const id = req.body.id;
    const textSearch = req.body.textSearch  ||"";
    db.query(`
              select b.* , a.restaurant_id , a.combo_id , a.cost , a.discount , a.content from restaurant_food as a join food as b on a.food_id = b.id 
              where a.restaurant_id = ${id} and b.title like "%${textSearch}%"`,
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
  // thêm  nhà hàng
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
  // cập nhật  nhà hàng
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
  //xóa nhà hàng
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
  // xóa món ăn nhà hảng
  deleteItem(req, res, next) {
    const restaurantId = req.body.restaurant_id;
    const foodId = req.body.food_id;
    db.query(`
            DELETE FROM restaurant_food WHERE food_id = ${foodId} AND restaurant_id = ${restaurantId}`,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  //Thêm món ăn nhà hàng
  saveItem(req, res, next) {
    const data = req.body;

    db.query(`
            INSERT INTO restaurant_food SET ?  `, data,
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
