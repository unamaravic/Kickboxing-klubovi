const pool = require('../../db');
const queries = require('./queries');
const openapi = require('../../openapi.json');

const getKlubovi = (req, res) => {
    pool.query(queries.getKlubovi, (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        const salji = new Array(); 
        for (let i = 0; i < results.rowCount; i++) {
            var red = results.rows[i];
            var redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",
                    "klubid": "identifier",
                    "naziv": "name",
                    "godinaosnivanja": "foundingDate",
                    "država": "addressCountry",
                    "sjedište": "addressLocality",
                }, 
                "@type": "SportsTeam",
                "klubid": red["klubid"], //klubid
                "naziv": red["naziv"], //naziv
                "godinaosnivanja": red["godinaosnivanja"], //godinaosnivanja
                "location": {
                    "@type": "PostalAddress", 
                    "država": red["država"], //addressCountry
                    "sjedište": red["sjedište"] //sjedište 
                },
                "email": red["email"], //email                   
            }
            salji.push(redpush);
        } 
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": salji});
    });
};

const getKlubById = (req, res) => {
    const klubid = parseInt(req.params.klubid);
    if (isNaN(klubid))
        res.setHeader('Content-Type', 'application/json').status(400).json({"Status": 400, "message": "Krivo upisan identifikator", "response": {}});

    pool.query(queries.getKlubById, [klubid], (error, results) => {
        if (results.rows.length == 0) {
            res.setHeader('Content-Type', 'application/json').status(404).json({"Status": 404, "message": "Ne postoji zapis s ovim identifikatorom", "response": {}});
        }
        else { 
            if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
            var red = results.rows[0];
            const redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",                       
                    "klubid": "identifier",
                    "naziv": "name",
                    "godinaosnivanja": "foundingDate",
                    "država": "addressCountry",
                    "sjedište": "addressLocality",
                },
                "@type": "SportsTeam",
                "klubid": red["klubid"], //klubid
                "naziv": red["naziv"], //naziv
                "godinaosnivanja": red["godinaosnivanja"], //godinaosnivanja
                "location": {
                    "@type": "PostalAddress", 
                    "država": red["država"], //addressCountry
                    "sjedište": red["sjedište"] //sjedište 
                },
                "email": red["email"], //email    
            }
            res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": redpush});
        }
    })
};

const addKlub = (req, res) => {
    const { naziv, godinaosnivanja, sjedište, država, email} = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        console.log(email);
        if (results.rows.length) {
            res.setHeader('Content-Type', 'application/json').status(409).json({"Status": 409, "message": "Zapis već postoji", "response": results.rows});
            return;
        }

        pool.query(queries.addKlub, [naziv, godinaosnivanja, sjedište, država, email], (error, results) => {
            if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
            res.setHeader('Content-Type', 'application/json').status(201).json({"Status": 201, "message": "Uspješno dodan novi zapis", "response": results.rows});
        })
    })

}

const removeKlub = (req, res) => {
    const klubid = parseInt(req.params.klubid);
    if (isNaN(klubid)) {
        res.setHeader('Content-Type', 'application/json').status(400).json({"Status": 400, "message": "Krivo upisan identifikator", "response": {}});
        return;
    }
    pool.query(queries.getKlubById, [klubid], (error, results) => {
        if (results.rows.length == 0) {
            res.setHeader('Content-Type', 'application/json').status(404).json({"Status": 404, "message": "Ne postoji zapis s ovim identifikatorom", "response": {}});
        }
        else {
            pool.query(queries.removeKlub, [klubid], (error, results) => {
                if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
                res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno obrisani podaci", "response": results.rows});
            });
        }
    });
}

const updateKlub = (req, res) => {
    const klubid = parseInt(req.params.klubid);
    if (isNaN(klubid)) {
        res.setHeader('Content-Type', 'application/json').status(400).json({"Status": 400, "message": "Krivo upisan identifikator", "response": {}});
        return;
    }
    const { naziv } = req.body;

    pool.query(queries.getKlubById, [klubid], (error, results) => {
        if (results.rows.length == 0) res.setHeader('Content-Type', 'application/json').status(404).json({"Status": 404, "message": "Ne postoji zapis s ovim identifikatorom", "response": {}});
        else {
            pool.query(queries.updateKlub, [naziv, klubid], (error, results)  => {
                if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
                res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno promijenjeni podaci", "response": results.rows});
            })
        }
    })

    
}

const getKickboxingKlubovi = (req, res) => {
    pool.query(queries.getKickboxingKlubovi, [], (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        const salji = new Array(); 
        for (let i = 0; i < results.rowCount; i++) {
            var red = results.rows[i];
            var redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",
                    "licencado": "https://schema.org/Date",
                    "imeclana": "givenName",
                    "prezimeclana": "familyName",
                    "spol": "gender",
                    "datumrodenjaclana": "birthDate",
                    "briskazniceclana": "identifier",
                    "oibclana": "identifier",
                    "težina": "weight",
                    "klubid": "identifier",
                    "naziv": "name",
                    "godinaosnivanja": "foundingDate",
                    "država": "addressCountry",
                    "sjedište": "addressLocality",
                    "imetrenera": "givenName",
                    "prezimetrenera": "familyName",
                    "datumrodenjatrenera": "birthDate",
                    "briskaznicetrenera": "identifier",
                    "oibtrenera": "identifier"
                },
                "@type": "Person",
                "imeclana": red["imeclana"],//imeclana
                "prezimeclana": red["prezimeclana"], //prezimeclana
                "spol": red["spol"], //spol
                "datumrodenjaclana": red["datumrodenjaclana"], //datumrodenjaclana
                "briskazniceclana": red["briskazniceclana"], //briskazniceclana
                "licencado": red["licencado"], //licencado
                "težina": red["težina"],
                "oibclana": red["oibclana"],              
                "memberOf": {
                    "@type": "SportsTeam",
                    "klubid": red["klubid"], //klubid
                    "naziv": red["naziv"], //naziv
                    "godinaosnivanja": red["godinaosnivanja"], //godinaosnivanja
                    "location": {
                        "@type": "PostalAddress", 
                        "država": red["država"], //addressCountry
                        "sjedište": red["sjedište"] //sjedište 
                    },
                    "email": red["email"], //email
                    "coach": {
                        "@type": "Person", 
                        "imetrenera": red["imetrenera"], //imetrenera
                        "prezimetrenera": red["prezimetrenera"], //prezimetrenera
                        "datumrodenjatrenera": red["datumrodenjatrenera"], //datumrođenjatrenera
                        "briskaznicetrenera": red["briskaznicetrenera"], //briskaznicetrenera,
                        "oibtrenera": red["oibtrenera"],
                        "licencado": red["licencado"]
                    }
                }
            };
            salji.push(redpush);
        }
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": salji});
    })
}

//popravi
const getClanKlubTrener = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);

    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json').status(400).json({"Status": 400, "message": "Krivo upisan identifikator", "response": {}});
    }
    pool.query(queries.getClanKlubTrener, [id], (error, results) => {
        if (results.rows.length == 0) {
            res.setHeader('Content-Type', 'application/json').status(404).json({"Status": 404, "message": "Ne postoji zapis s ovim identifikatorom", "response": {}});
        }
        else { 
            if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
            var red = results.rows[0];
            var redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",
                    "licencado": "https://schema.org/Date",
                    "imeclana": "givenName",
                    "prezimeclana": "familyName",
                    "spol": "gender",
                    "datumrodenjaclana": "birthDate",
                    "briskazniceclana": "identifier",
                    "oibclana": "identifier",
                    "težina": "weight",
                    "klubid": "identifier",
                    "naziv": "name",
                    "godinaosnivanja": "foundingDate",
                    "država": "addressCountry",
                    "sjedište": "addressLocality",
                    "imetrenera": "givenName",
                    "prezimetrenera": "familyName",
                    "datumrodenjatrenera": "birthDate",
                    "briskaznicetrenera": "identifier",
                    "oibtrenera": "identifier"
                },
                "@type": "Person",
                "imeclana": red["imeclana"],//imeclana
                "prezimeclana": red["prezimeclana"], //prezimeclana
                "spol": red["spol"], //spol
                "datumrodenjaclana": red["datumrodenjaclana"], //datumrodenjaclana
                "briskazniceclana": red["briskazniceclana"], //briskazniceclana
                "licencado": red["licencado"], //licencado
                "težina": red["težina"],
                "oibclana": red["oibclana"],              
                "memberOf": {
                    "@type": "SportsTeam",
                    "klubid": red["klubid"], //klubid
                    "naziv": red["naziv"], //naziv
                    "godinaosnivanja": red["godinaosnivanja"], //godinaosnivanja
                    "location": {
                        "@type": "PostalAddress", 
                        "država": red["država"], //addressCountry
                        "sjedište": red["sjedište"] //sjedište 
                    },
                    "email": red["email"], //email
                    "coach": {
                        "@type": "Person", 
                        "imetrenera": red["imetrenera"], //imetrenera
                        "prezimetrenera": red["prezimetrenera"], //prezimetrenera
                        "datumrodenjatrenera": red["datumrodenjatrenera"], //datumrođenjatrenera
                        "briskaznicetrenera": red["briskaznicetrenera"], //briskaznicetrenera,
                        "oibtrenera": red["oibtrenera"],
                        "licencado": red["licencado"]
                    }
                }
            };
            res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": redpush});
        }
    })
}

const getClanovi = (req, res) => {
    pool.query(queries.getClanovi, [], (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        var salji = new Array(); 
        for (let i = 0; i < results.rowCount; i++) {
            var red = results.rows[i];
            var redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",
                    "imeclana": "givenName",
                    "prezimeclana": "familyName",
                    "spol": "gender",
                    "datumrodenjaclana": "birthDate",
                    "briskazniceclana": "identifier",
                    "oibclana": "identifier",
                    "težina": "weight"
                },
                "@type": "Person",
                "imeclana": red["imeclana"],//imeclana
                "prezimeclana": red["prezimeclana"], //prezimeclana
                "spol": red["spol"], //spol
                "datumrodenjaclana": red["datumrodenjaclana"], //datumrodenjaclana
                "briskazniceclana": red["briskazniceclana"], //briskazniceclana
                "licencado": red["licencado"], //licencado
                "težina": red["težina"],
                "oibclana": red["oibclana"]
            };
            salji.push(redpush);
        }
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": salji});
    })
}

const getTreneri = (req, res) => {
    pool.query(queries.getTreneri, [], (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        var salji = new Array(); 
        for (let i = 0; i < results.rowCount; i++) {
            var red = results.rows[i];
            var redpush = {
                "@context" : {
                    "@vocab": "https://schema.org",
                    "licencado": "https://schema.org/Date",
                    "imetrenera": "givenName",
                    "prezimetrenera": "familyName",
                    "datumrodenjatrenera": "birthDate",
                    "briskaznicetrenera": "identifier",
                    "oibtrenera": "identifier"
                },               
                "@type": "Person", 
                "imetrenera": red["imetrenera"], //imetrenera
                "prezimetrenera": red["prezimetrenera"], //prezimetrenera
                "datumrodenjatrenera": red["datumrodenjatrenera"], //datumrođenjatrenera
                "briskaznicetrenera": red["briskaznicetrenera"], //briskaznicetrenera,
                "oibtrenera": red["oibtrenera"],
                "licencado": red["licencado"]
            }
            salji.push(redpush);
        }
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": salji});
    })
}

/* const removeZapis = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getClanKlubTrener, [id], (error, results) => {
        const noZapisFound = !results.rows.length;
        if (noZapisFound) res.send("Zapis does not exist in db").status(404).setHeader("Content-type", "application/json");
    });

    pool.query(queries.removeZapis, [id], (error, results) => {
        if (error) res.status(500).send(error).setHeader("Content-type", "application/json");
        res.status(200).send("Zapis removed successfully").setHeader("Content-type", "application/json");
    })
} */

/* const updateZapis = (req, res) => {
    const id = parseInt(req.params.id);
    const { težina } = req.body;

    pool.query(queries.getClanKlubTrener, [id], (error, results) => {
        const noZapisFound = !results.rows.length;
        if (noZapisFound) res.send("Zapis does not exist in db").status(404).setHeader("Content-type", "application/json");
    })

    pool.query(queries.updateZapis, [težina, id], (error, results)  => {
        if (error) res.status(500).send(error).setHeader("Content-type", "application/json");
        res.status(200).send("Zapis updated successfully").setHeader("Content-type", "application/json");
    })
} */

const getOpenapi = (req, res) => {
    res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": openapi});
}

module.exports = {
    getKlubovi, 
    getKlubById, 
    addKlub, 
    removeKlub, 
    updateKlub, 
    getKickboxingKlubovi, 
    getClanKlubTrener, 
    getClanovi, 
    getTreneri,
    getOpenapi,
};