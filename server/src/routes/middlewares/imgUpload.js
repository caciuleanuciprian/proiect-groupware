  
const multer = require('multer');
  
const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ imgUpload });

module.exports = {imgUpload, upload}