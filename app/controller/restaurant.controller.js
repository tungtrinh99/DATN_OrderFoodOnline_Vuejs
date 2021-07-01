const db = require('../config/db.config');
const fs = require("fs");
const {
  log
} = require('console');
const {
  forbidden
} = require('joi');

class RestaurantController {
  // Lấy danh sách nhà hàng
  list(req, res, next) {
    const textSearch = req.body.textSearch || "";
    const typeRestaurant = req.body.type;
    let query = `
    select a.*,b.full_address,b.longitude,b.latitude , c.fullname as name_of_user_id , d.title as name_of_restaurant_type_id from 
    restaurant a join location b on a.location_id = b.id join user c on a.user_id = c.id join restaurant_type d on a.type_id = d.id
    where (a.title like "%${textSearch}%" or b.full_address like "%${textSearch}%")`;
    if (typeRestaurant) {
      query = query + " " + `and a.type_id = ${typeRestaurant}`
    }
    db.query(query,
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
    const textSearch = req.body.textSearch || "";
    db.query(`
              select b.* , a.restaurant_id , a.cost , a.discount , a.content ,a.id as restaurant_food_id, c.title AS name_of_food_type from restaurant_food as a join food as b on a.food_id = b.id JOIN food_type AS c ON b.type = c.id 
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
    const restaurantId = req.query.restaurant_id;
    const foodId = req.query.id;
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
  //Cập nhật món ăn nhà hàng
  updateItem(req, res, next) {
    var id = req.query.id;
    var data = req.body;
    db.query(
      `UPDATE restaurant_food SET ? WHERE food_id = ${id}`,
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
  //Lấy chi tiết 1 nhà hàng
  detail(req, res, next) {
    const id = req.query.id;
    const userId = req.query.userId;
    if (userId) {
      var query = `SELECT a.* , b.longitude , b.latitude , b.full_address ,c.title as name_of_restaurant_type_id FROM restaurant a JOIN location b ON a.location_id = b.id JOIN restaurant_type c ON a.type_id = c.id WHERE a.user_id = ${userId}`
    } else {
      query = `
      SELECT a.* , b.longitude , b.latitude , b.full_address ,c.title as name_of_restaurant_type_id FROM restaurant a JOIN location b ON a.location_id = b.id JOIN restaurant_type c ON a.type_id = c.id WHERE a.id = ${id}`
    }
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
  //xoa 
  detailItem(req, res, next) {
    const id = req.query.id;
    const restaurant_id = req.query.restaurant_id;
    const query = `SELECT * FROM restaurant_food WHERE food_id = ${id} AND restaurant_id=${restaurant_id}`;

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
  // lay danh sach ma giam gia nha hang
  discount(req, res, next) {
    const restaurantId = req.body.id;
    var query = `select b.* from restaurant_discount_code a join discount_code as b on a.discount_code_id = b.id where a.restaurant_id = ${restaurantId}`;
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
  // them ma giam gia nhà hàng
  saveDiscount(req, res, next) {
    const data = req.body;
    db.query(`
            INSERT INTO restaurant_discount_code SET ?  `, data,
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
  deleteDiscount(req, res, next) {
    const discount_id = req.query.id;
    db.query(`
            DELETE FROM restaurant_discount_code WHERE id = ${discount_id}`,
      (err, result, fields) => {
        if (!err) res.send({
          data: {
            items: result
          }
        });
        else console.log(err);
      });
  }
  // lấy danh sách combo của nhà hàng
  comboList(req, res, next) {
    let restaurantId = req.body.id;
    let query = `select a.* , c.title as name_of_restaurant_id from combo a join restaurant c on a.restaurant_id = c.id`;
    if (restaurantId) {
      query = query + ' ' + `where a.restaurant_id = ${restaurantId}`;
    }
    db.query(query, (err, result, fields) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        })
      } else {
        console.log(err)
      }
    })
  }
  // thêm mới combo nhà hàng
  saveCombo(req, res, next) {
    let data = req.body;
    let query = `insert into combo set ?`;
    db.query(query, data, (err, result, fields) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        })
      } else console.log(err)
    })
  }
  //xóa combo nhà hàng
  deleteCombo(req, res, next) {
    let comboId = req.query.id;
    let query = `delete from combo where id = ${comboId}`;
    db.query(query, (err, result, fields) => {
      if (!err) {
        res.send(result)
      } else console.log(err)
    })
  }
  // chi tiết combo nhà hàng
  detailCombo(req, res, next) {
    let comboId = req.query.id;
    let query = `select a.* , c.title as name_of_restaurant_id from combo a join restaurant c on a.restaurant_id = c.id where a.id = ${comboId}`;
    db.query(query, (err, result, fields) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else console.log(err)
    })
  }
  // cập nhật combo nhà hàng
  updateCombo(req, res, next) {
    let comboId = req.query.id;
    let combo = req.body;
    let query = `update combo set ? where id = ${comboId}`;
    db.query(query, combo, (err, result, fields) => {
      if (!err) {
        res.send({
          data: {
            items: result
          }
        });
      } else console.log(err)
    })
  }
  // thêm món ăn vào combo 
  saveFoodCombo(req, res, next) {
    let comboId = req.body.id;
    let foods = req.body.foods;
    let query = `insert into combo_food (combo_id,food_id) value ?`;
    foods = foods.map((food) => {
        let arr = [];
        arr.push(comboId,food.id);
        return arr;
      }
    )
    db.query(query, [foods], (err, result, fields) => {
      if (!err) res.send(result)
      else res.send(err);
    })
  }
  // danh sách món ăn combo
  listFoodCombo(req, res, next) {
    let comboId = req.query.id;
    let query = `select a.*, c.title  from combo_food a join restaurant_food b on a.food_id = b.id join food c on b.food_id = c.id where combo_id = ${comboId}`;
    db.query(query, (err, result, fields) => {
      if (!err) res.send({
        data: {
          items: result
        }
      });
      else console.log(err)
    })
  }
  // xoa danh sach mon an combo
  deleteComboFood(req,res,next){
    let comboId = req.query.id;
    let query = `delete from combo_food where combo_id = ${comboId}`;
    db.query(query,(err,result,fields)=>{
      if(!err) res.send(result);
      else res.send(err); 
    })
  }
}

module.exports = new RestaurantController;
