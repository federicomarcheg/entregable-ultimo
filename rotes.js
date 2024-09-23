const userSchema = new mongoose.Schema({

    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_connection: Date
});

const express = require('express');
const router = express.Router();
const verifyRole = require('.middlewares/auth');


router.get('/premium-content',
    verifyRole('premium'), (req, res) => {
        res.json({ message: 'este es contenido exclusivo para usuarios premium' });
    });

    router.get('/admin-dashboard',
        verifyRole('admin'), (req, res) => {
            res.json({ message: 'este es el panel de administración' });
        });

        module.exports = router;