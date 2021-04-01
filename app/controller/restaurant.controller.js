const db = require('../config/db.config');

class RestaurantController {
    list(req,res,next){
        db.query('select * from restaurant',(err, result, field)=>{
            if (!err) {
                res.send({'data':{'items' : result}});
        
              } else {
                console.log(err);
              }
        })
    }
}

module.exports = new RestaurantController;
