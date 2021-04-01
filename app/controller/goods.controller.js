const db = require('../config/db.config');
class GoodsController {
    list(req,res,next){
        db.query('select * from dish',(err, result, field)=>{
            if (!err) {
                res.send({'data':{'items' : result}});
        
              } else {
                console.log(err);
              }
        })
    }
}
module.exports = new GoodsController;