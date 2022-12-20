const getKlubovi = "SELECT * FROM klub";
const getKlubById = "SELECT * FROM klub WHERE klubid = $1";
const checkEmailExists = "SELECT * FROM klub WHERE email = $1";
const addKlub = "INSERT INTO klub (naziv, godinaosnivanja, sjedište, država, email) VALUES ($1, $2, $3, $4, $5)";
const removeKlub = "DELETE FROM klub WHERE klubid = $1";
const updateKlub = "UPDATE klub SET naziv = $1 WHERE klubid = $2";
const getKickboxingKlubovi = "SELECT * FROM clanklubtrener";
const getClanKlubTrener = "SELECT * FROM clanklubtrener WHERE briskazniceclana = $1";
const getClanovi = "SELECT * FROM clanosoba";
const getTreneri = "SELECT * FROM trenerosoba";

module.exports = {
    getKlubovi, 
    getKlubById,
    checkEmailExists,
    addKlub,
    removeKlub,
    updateKlub,
    getKickboxingKlubovi,
    getClanKlubTrener,
    getClanovi,
    getTreneri,
}