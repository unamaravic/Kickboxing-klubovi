const pool = require('../../db');
const queries = require('./queries');
const openapi = require('../../openapi.json');

const getKlubovi = (req, res) => {
    pool.query(queries.getKlubovi, (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
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
            res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
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
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
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
            res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
        }
    })
}

const getClanovi = (req, res) => {
    pool.query(queries.getClanovi, [], (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
    })
}

const getTreneri = (req, res) => {
    pool.query(queries.getTreneri, [], (error, results) => {
        if (error)  res.setHeader('Content-Type', 'application/json').status(500).json({"Status": 500, "message": "Problem sa serverom", "response": {}});
        res.setHeader('Content-Type', 'application/json').status(200).json({"Status": 200, "message": "Uspješno dohvaćeni podaci", "response": results.rows});
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