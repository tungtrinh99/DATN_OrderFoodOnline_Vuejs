const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()+path.extname(file.originalname) ;
    cb(null, 'images' + '-' + uniqueSuffix)
  }
})
module.exports = storage;