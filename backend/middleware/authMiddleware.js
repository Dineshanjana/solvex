module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No Bearer token provided" });
    }

    const accessToken = authHeader.split(" ")[1]; 

    req.accessToken = accessToken; 

    next()

}