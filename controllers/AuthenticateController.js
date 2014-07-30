var User = require('../models/UserModel');

module.exports = function(app, passport, LocalStrategy) {   

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {   
        console.log("Deserializing user: " + id);     
        User.findOne({_id: id}, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy('local', function(username, password, done) {
        console.log("Authenticating user: " + username);
        process.nextTick(function() {
            User.findOne({'username': username}, function(err, user) {                
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'User was not found' });
                }             
                console.log('User found');   
                return done(err, user);
            });
        });
    }));
};