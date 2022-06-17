const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) =>{
    console.log('req,,',req.url,',',req.params,',',req.query)
    res.sendFile(path.join(__dirname, '../../backend/public/chat', 'index.html'));
});

module.exports = router;

