const db = require('../config/db.config');
const fs = require("fs");

class DiscountController {
  
  // danh sach ma giam gia
  list(req, res, next) {
    query = `SELECT * from discount_code`
    db.query(query,
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
  // them ma giam gia
  save(req, res, next) {
    const data = req.body;
    db.query(`
            INSERT INTO discount_code SET ?  `, data,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  // xoa ma giam gia
  delete(req, res, next) {
    const discount_id = req.query.id;
    db.query(`
            DELETE FROM discount_code WHERE id = ${discount_id}`,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  // cap nhat ma giam gia
  update(req, res, next) {
    var discount_id = req.query.id;
    let data = req.body;
    db.query(
      `UPDATE discount_code SET ? WHERE id = ${discount_id}`,
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
  // chi tiet ma giam gia
  detail(req, res, next) {
    const discount_id = req.query.id;
    const query = `SELECT * FROM discount_code WHERE id = ${discount_id}`;

    db.query(query,
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

module.exports = new DiscountController;
