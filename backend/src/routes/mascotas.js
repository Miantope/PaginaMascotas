const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { especie } = req.query;
        let resultado;

        if (especie) {
            resultado = await pool.query(
                `SELECT id, nombre, especie, edad, genero, personalidad, descripcion, imagen
                 FROM mascotas
                 WHERE disponible = TRUE AND especie = $1
                 ORDER BY id`,
                [especie]
            );
        } else {
            resultado = await pool.query(
                `SELECT id, nombre, especie, edad, genero, personalidad, descripcion, imagen
                 FROM mascotas
                 WHERE disponible = TRUE
                 ORDER BY id`
            );
        }

        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({ error: 'No se pudieron obtener las mascotas' });
    }
});

module.exports = router;