const db = require('../config/db.config');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  ids
} = require('webpack');
class AuthController {
  // đăng kí người dùng
  register(req, res, next) {
    let {
      username,
      password,
      passwordConfirm,
      avatar_id,

    } = req.body;
    db.query(`select username from user where username = ?`, [username], (err, result, fields) => {
      if (err) {
        res.send({
          message: err
        })
      } else {
        if (result.length > 0) {

          res.send({
            errorCode: 0,
            errorMessage: 'Tên đăng nhập đã tồn tại!'

          })
        } else if (password !== passwordConfirm) {
          res.send({
            errorCode: 0,
            errorMessage: 'Mật khẩu xác nhận phải trùng nhau!'

          })
        } else {
          let hashedPassword = bcrypt.hashSync(password, 8);
          db.query(`insert into user set ?`, {
            username: username,
            password: hashedPassword,
            role: 2,
            avatar_id: avatar_id,
            active : 1
          }, (error, result, fields) => {
            if (!error) {
              res.send({
                errorCode: 1,
                successMessage: 'Đăng ký thành công!'
              })

            } else {
              res.send({
                errorMessage: error
              })
            }
          })
        }


      }

    });
  }
  //đăng nhập
  login(req, res, next) {
    let {
      username,
      password,
      role
    } = req.body;
    if (!username || !password) {
      res.send({
        errorCode: 0,
        errorMessage: 'Tên đăng nhập hoặc mật khẩu không được để trống!'
      })
    } else {
      db.query(`select a.*,b.full_address,b.longitude,b.latitude from user a LEFT JOIN location b ON a.address = b.id where a.username = ? and a.role = ${role} AND a.active = 1`, [username], (err, result, fields) => {
        if(result.length === 0){
          res.send({
            errorCode: 0,
            errorMessage: 'Tài khoản đăng nhập không tồn tại hoặc không còn hiệu lực !',
          })
        }
        else if (!result || !bcrypt.compareSync(password, result[0].password)) {
          res.send({
            errorCode: 0,
            errorMessage: 'Tên đăng nhập hoặc mật khẩu không đúng!',
          })
        } else {
          let id = result[0].id;
          let token = jwt.sign({
            id
          }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          })
          let cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
          res.cookie('jwt', token, cookieOptions);
          res.send({
            errorCode: 1,
            errorMessage: 'Đăng nhập thành công!',
            accessToken: token,
            user: result[0]
          })


        }

      })
    }




  }
}

module.exports = new AuthController;
