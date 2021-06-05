const db = require('../config/db.config');
const fs = require("fs");

class VehicleController {
  // Lấy danh sách xe
   // Lấy danh sách người dùng
   list(req,res,next){
      
    db.query(`select vehicle.*,user.fullname as name_of_driver from vehicle join user on vehicle.driver_id = user.id `,(err, result, field)=>{
        if (!err) {
            res.send({'data':{'items' : result}});
    
          } else {
            console.log(err);
          }
    })
}
}

module.exports = new VehicleController;
