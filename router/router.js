const express                          = require("express")
const router                           = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getData);
router.post('/videoUpload', controller.postVideoUpload);


module.exports = router;
