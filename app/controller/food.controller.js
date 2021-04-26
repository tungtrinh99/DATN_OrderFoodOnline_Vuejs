const db = require("../config/db.config");
const fs = require("fs");


class FoodController {
  //Lấy danh sách món ăn
  list(req, res, next) {
    db.query("SELECT * FROM food", (err, result, field) => {
      if (!err) {
        res.send({ data: { items: result } });
      } else {
        console.log(err);
      }
    });
  }
  // thêm món ăn
  save(req, res, next) {
    var data = req.body;

    db.query(`INSERT INTO food SET ?  `, data, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  // cập nhật món ăn
  update(req, res, next) {
    var id = req.query.id;
    var data = req.body;
    db.query(
      `UPDATE food SET ? WHERE id = ${id}`,
      data,
      (err, result, field) => {
        if (!err) {
          res.send({ data: { items: result } });
        } else {
          console.log(err);
        }
      }
    );
  }
  //xóa món ăn
  delete(req, res, next) {
    var id = req.query.id;
    db.query(`DELETE FROM food WHERE id = ${id}`, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  //Lấy chi tiết 1 món ăn
  detail(req, res, next) {
    var id = req.query.id;

    db.query(`SELECT * FROM food WHERE id = ${id}`, (err, result, field) => {
      if (!err) {
        res.send({ data: { items: result } });
      } else {
        console.log(err);
      }
    })
  }
  //Lấy danh sách kiểu đồ ăn
  type(req, res, next) {
    db.query(`SELECT * FROM food_type `, (err, result, field) => {
      if (!err) {
        res.send({ data: { items: result } });
      } else {
        console.log(err);
      }
    })
  }
  //thêm ảnh món ăn
  upload(req, res, next) {
    var file = req.file;
    res.send({
      'data': file.filename
    })
  }
}
module.exports = new FoodController();
