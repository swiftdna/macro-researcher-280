const express = require('express');
const router = express.Router();


router.post('/chk', (req, res) => {
  res.json({success: true, data: 'hi'})
});


module.exports = router;