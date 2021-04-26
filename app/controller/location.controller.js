const db = require("../config/db.config");
const fs = require("fs");
class LocationController {
  //lấy danh sách địa điểm
  list(req, res, next) {
    db.query("SELECT a.*,b.title as 'province_title',c.title as 'district_title',d.title as 'ward_title' FROM location a left join vie_province b on a.province_id = b.province_id LEFT JOIN vie_district c on a.district_id = c.district_id LEFT JOIN vie_ward d on a.ward_id = d.ward_id  ", (err, result, field) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else {
        console.log(err);
      }
    });
  }
  //Xem chi tiết một địa điểm 
  detail(req, res, next) {
    const id = req.query.id;
    db.query("SELECT a.*,b.title as 'province_title',c.title as 'district_title',d.title as 'ward_title' FROM location a left join vie_province b on a.province_id = b.province_id LEFT JOIN vie_district c on a.district_id = c.district_id LEFT JOIN vie_ward d on a.ward_id = d.ward_id where a.id = ? ", id, (err, result, field) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else {
        console.log(err);
      }
    });
  }
  // lưu địa điểm
  save(req, res, next) {
    const data = req.body;

    db.query(`
            INSERT INTO location SET ?  `, data,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  //cap nhat dia diem
  update(req, res, next) {
    var id = req.query.id;
    var data = req.body;
    db.query(
      `UPDATE location SET ? WHERE id = ${id}`,
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
  //xoa dia diem
  delete(req, res, next) {
    var id = req.query.id;
    db.query(`DELETE FROM location WHERE id = ${id}`, (err, result, fields) => {
      if (!err) res.send({
        data: {
          items: result
        }
      });
      else console.log(err);
    });
  }
  //danh sách tỉnh VN
  province(req, res, next) {
    db.query("SELECT * FROM vie_province", (err, result, field) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else {
        console.log(err);
      }
    });
  }
  //danh sách huyện VN

  district(req, res, next) {
    const province_id = req.query.id;
    db.query("SELECT * FROM vie_district where province_id = ?", province_id, (err, result, field) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else {
        console.log(err);
      }
    });
  }
  //danh sách xã VN

  ward(req, res, next) {
    const district_id = req.query.id;
    db.query("SELECT * FROM vie_ward where district_id = ?", district_id, (err, result, field) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else {
        console.log(err);
      }
    });
  }
}
module.exports = new LocationController();
