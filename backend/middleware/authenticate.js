const jwt = require('jsonwebtoken');

const authenticateRoute = async(req, res, next) => {
    const token = req.headers.cookie.split("=")[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        req.user =decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { authenticateRoute };
