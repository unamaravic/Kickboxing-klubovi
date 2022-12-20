const express = require('express');
const kickboxingKluboviRoutes = require('./src/klubovi/routes');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/api/v1', kickboxingKluboviRoutes);
app.use(function(req, res) {
    res.setHeader('Content-Type', 'application/json').status(501).json({
        "Status": 501,
        "message": 'Neimplementirana metoda za ovu rutu',
        "response": {}
    });
});

app.listen(port, () => console.log(`app listening on ${port}`));
