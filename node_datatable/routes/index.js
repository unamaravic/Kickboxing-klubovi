const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.oidc.isAuthenticated());
    res.render('index', {
        title: 'Kickboxing klubovi',
    });
});
module.exports = router;

