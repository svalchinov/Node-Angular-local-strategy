module.exports = function(app, passport, user) {

    // authentication
    app.post('/api/user/auth', passport.authenticate('local', { 
        successRedirect: '/api/user/auth/result',
        failureRedirect: '/api/user/auth/result'
    }));   

    app.get('/api/user/auth/result', user.authenticate);
    app.post("/api/user/register", user.register);
    app.get("/api/user/logout", user.logout);

    // default route
    app.get('/*', function(req, res) {
        res.sendfile('./public/app/index.html');
    });

    // restrict all api paths
    app.get('/api/*', function(req, res, next) {
            // Need to filter anonymous users somehow 
            if (!req.user) {
                return res.json({ message: 'You must be logged in.' });
            }
            next();
        }, 
        function(req, res) {
            res.json({ message: 'This message is only for authenticated users' });
        });
};