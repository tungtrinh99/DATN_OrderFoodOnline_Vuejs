const db = require('../config/db.config');
const fs = require("fs");

class UserController {
  // Lấy danh sách người dùng
    list(req,res,next){
      
        const role = req.query.id;
        db.query(`select * from user where role = ${role}`,(err, result, field)=>{
            if (!err) {
                res.send({'data':{'items' : result}});
        
              } else {
                console.log(err);
              }
        })
    }
    // thêm  người dùng
  save(req, res, next) {
    var data = req.body;

    db.query(`INSERT INTO user SET ?  `, data, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  // cập nhật  người dùng
  update(req, res, next) {
    var id = req.query.id;
    var data = req.body;
    db.query(
      `UPDATE user SET ? WHERE id = ${id}`,
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
  //xóa   người dùng
  delete(req, res, next) {
    var id = req.query.id;
    db.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
      if (!err) res.send({ data: { items: result } });
      else console.log(err);
    });
  }
  //Lấy chi tiết 1 người dùng
  detail(req, res, next) {
    var id = req.query.id;

    db.query(`SELECT a.* , b.full_address, b.longitude,b.latitude FROM user a JOIN location b ON a.address = b.id WHERE a.id = ${id} `, (err, result, field) => {
      if (!err) {
        res.send({ data: { items: result } });
      } else {
        console.log(err);
      }
    })
  }
  //thêm ảnh người dùng
  upload(req, res, next) {
    var file = req.file;
    res.send({
      'data': file.filename
    })
  }
 
}

module.exports = new UserController;
