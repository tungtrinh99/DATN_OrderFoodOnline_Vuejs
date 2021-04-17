const db = require('../config/db.config');
const fs = require("fs");

class RestaurantController {
  // Lấy danh sách nhà hàng
  list(req, res, next) {
    const keyword = req.query.keyword;

    db.query(`select a.id , a.title , a.opentime , a.closetime ,a.restaurant_manage_id , a.phone_number,a.avatar_id,a.type_id,a.slug,b.full_address from restaurant a join location b on a.id = b.restaurant_id where a.title like "%${keyword}%"`, (err, result, field) => {
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
    db.query(`select b.id , b.title , b.type , b.avatar_id , a.combo_id , a.cost , a.discount , a.content from restaurant_dish as a join dish as b on a.dish_id = b.id where a.restaurant_id = ${id} and b.title like "%${keyword}%"`, (err, result, field) => {
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

    db.query(`INSERT INTO restaurant SET ?  `, data, (err, result, fields) => {
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
    db.query(`DELETE FROM restaurant WHERE id = ${id}`, (err, result, fields) => {
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

    db.query(`SELECT * FROM restaurant WHERE id = ${id}`, (err, result, field) => {
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
  //Lấy danh sách loại nhà hàng
  type(req, res, next) {
    db.query(`SELECT * FROM restaurant_type`, (err, result, field) => {
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
    db.query(`SELECT * FROM location WHERE restaurant_id = ${id}`, (err, result, field) => {
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
}

module.exports = new RestaurantController;
