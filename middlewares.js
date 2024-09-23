const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';
        if
        (file.mimetype.startsWith('image/')) {
            folder = file.fieldname === 'profile' ? 'profiles' : 'products';

        } else {
            folder = 'documents';
        }
        cb(null, path.join(__dirname, `/uploads/${folder}`));
    },
    filename: function (req, file, cb) {
        cb(null, `${date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'acceso no autorizado, se requiere un token.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            req.user = decoded;


            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'acceso denegado. no tienes permisos suficientes.' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'token invalido o expirado.' });
        }
    };
};