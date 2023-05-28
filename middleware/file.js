const multer  = require('multer');
const moment = require('moment');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/books')
    },
    filename: (req, file, cb) =>{
        cb(null, `${moment().format("D-MM-YYYY")}-${file.originalname.replace(/ /g, '_') }`)
    }
})

module.exports = multer({storage});
