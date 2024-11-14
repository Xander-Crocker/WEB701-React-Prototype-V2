const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.roles = decoded.roles;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.roles.includes('admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Require Admin Role' });
    }
};

module.exports = { verifyToken, isAdmin };