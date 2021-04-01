const db = require('../config/db.config');
const fs = require("fs");

class RestaurantController {
  // Lấy danh sách nhà hàng
    list(req,res,next){
        db.query('select * from restaurant',(err, result, field)=>{
            if (!err) {
                res.send({'data':{'items' : result}});
        
              } else {
                console.log(err);
              }
        })
    }
    // thêm món nhà hàng
  save(req, res, next) {
    var data = req.body;

    db.query(`INSERT INTO restaurant SET ?  `, data, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  // cập nhật món nhà hàng
  update(req, res, next) {
    var id = req.query.id;
    var data = req.body;
    db.query(
      `UPDATE restaurant SET ? WHERE id = ${id}`,
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
  //xóa món nhà hàng
  delete(req, res, next) {
    var id = req.query.id;
    db.query(`DELETE FROM restaurant WHERE id = ${id}`, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  //Lấy chi tiết 1 nhà hàng
  detail(req, res, next) {
    var id = req.query.id;

    db.query(`SELECT * FROM restaurant WHERE id = ${id}`, (err, result, field) => {
      if (!err) {
        res.send({ data: { items: result } });
      } else {
        console.log(err);
      }
    })
  }
  //thêm ảnh nhà hàng
  upload(req, res, next) {
    var file = req.file;
    res.send({
      'data': file.filename
    })
  }
}

module.exports = new RestaurantController;
