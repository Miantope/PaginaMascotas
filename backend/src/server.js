require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rutasMascotas = require('./routes/mascotas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/salud', (req, res) => {
    res.json({
        estado: 'ok',
        mensaje: 'El servidor de PaginaMascotas está funcionando'
    });
});

app.use('/api/mascotas', rutasMascotas);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});