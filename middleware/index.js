module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    },

    isAdmin: function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user && req.user.role == "Admin") {
                return next();
            } else
                res.send(401, 'For Admin ONLY !!! ');
        }
        res.redirect("/login");
    }
}