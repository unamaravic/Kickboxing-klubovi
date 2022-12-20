const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getKickboxingKlubovi); //svi zapisi
router.get("/:id", controller.getClanKlubTrener); //zapisi za pojedinog clana
router.get("/prikaz/klubovi", controller.getKlubovi); //svi klubovi
router.post("/prikaz/klubovi", controller.addKlub); //dodaj klub
router.get("/prikaz/klubovi/:klubid", controller.getKlubById); //pojedini klub
router.delete("/prikaz/klubovi/:klubid", controller.removeKlub); //obrisi klub
router.put("/prikaz/klubovi/:klubid", controller.updateKlub); //update kluba
router.get("/prikaz/clanovi", controller.getClanovi); //svi clanovi
router.get("/prikaz/treneri", controller.getTreneri); //svi treneri
router.get("/prikaz/openapi", controller.getOpenapi);

module.exports = router;