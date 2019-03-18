const express = require('express');
const router = express.Router();

const multer = require('multer');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    var ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null,  Date.now()+"_" + file.originalname+ ext);
  }
});


const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;

router.post('/create',upload.single('productImage'), product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.get('/all', product_controller.product_all);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);

