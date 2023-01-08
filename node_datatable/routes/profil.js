const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const userInfo = req.oidc.fetchUserInfo();
    console.log(req.oidc.isAuthenticated());
    if (!req.oidc.isAuthenticated()) {
        console.log("logged err");
        res.status(404); //Send error response here
    }
    res.render('profil', {
        title: 'Korisnički profil',
        prijavljen: req.oidc.isAuthenticated(),
        korisnik: JSON.stringify(userInfo)
    });
});
module.exports = router;

