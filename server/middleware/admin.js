module.exports = function adminCheck(req, res, next) {
    if(req.user.role !== 'ADMIN'){
        res.status(401).json({ message: "User is not admin!" });
    }
    next();
}