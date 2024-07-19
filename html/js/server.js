const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/movilandDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});
const Purchase = mongoose.model('Purchase', purchaseSchema);

app.post('/submit-form', (req, res) => {
    const { name, email, phone, address } = req.body;
    const newPurchase = new Purchase({
        name,
        email,
        phone,
        address,
    });
    newPurchase.save()
        .then(() => {
            res.status(200).send('Datos guardados exitosamente en MongoDB.');
        })
        .catch(err => {
            res.status(400).send('Error al guardar los datos en MongoDB: ' + err);
        });
});
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
