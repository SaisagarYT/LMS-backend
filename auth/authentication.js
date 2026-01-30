const jwt = require('jsonwebtoken');

// This function is not actually needed on the server side
// Token verification should be done in middleware (protectedRoute.js)
// Keeping this for legacy compatibility
const userAuthentication = (token) => {
    try {
        if (!token) {
            return null;
        }
        const decode = jwt.verify(token, process.env.SECRET);
        return decode;
    } catch (err) {
        console.log('Token verification error:', err.message);
        return null;
    }
}

module.exports = userAuthentication;