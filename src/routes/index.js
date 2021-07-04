const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    // res.send({message : 'All working ok'});
    res.redirect('/words');
});

module.exports = router;