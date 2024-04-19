const express = require('express');
const router = express.Router();

const dataCn = require('../controller/dataCn');

router.use('/', dataCn);

module.exports = router