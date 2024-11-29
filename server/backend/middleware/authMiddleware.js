

// export const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

//     if (!token) {
//         return res.sendStatus(401); // Unauthorized
//     }

//     // Check if the token is in the blacklist
//     // if (tokenBlacklist.has(token)) {
//     //     return res.sendStatus(403); // Forbidden
//     // }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403); // Forbidden
//         }
//         req.user = user; // Save user information in request
//         next(); // Proceed to the next middleware or route handler
//     });
// }