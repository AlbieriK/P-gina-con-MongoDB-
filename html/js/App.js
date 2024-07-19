const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'Moviland.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let jsonContent = [];
        if (!err) {
            if (data.length > 0) {
                jsonContent = JSON.parse(data);
            }
        }
        jsonContent.push(formData);

        fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error al guardar en el archivo JSON");
                return;
            }
            res.send("Datos guardados correctamente");
        });
    });
});

app.listen(port, () => {
    console.log('Servidor corriendose en http://localhost:${port}');
});
