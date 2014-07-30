var UserModel = require('../models/UserModel');

function UserController() {
    this.register = register;
    this.authenticate = authenticate;
    this.logout = logout;
}

function register(req, res) {
    console.log('Attempting user registration for: ' + req.body.username + ' ' + req.body.password);
    UserModel.findOne({username:req.body.username}, {}, function(err, user) {
        if(user) {
            console.log('Username ' + user.username + ' already taken.');
            res.send('Username ' + user.username + ' already taken.');
        }
        else {
            console.log('Registering ' + req.body.username + ' user.');
            UserModel.create({
                username: req.body.username,
                password: req.body.password
            }, function(err, users) {
                if (err) {
                    res.send(err);
                }
                console.log("Registration successful.");
                res.json(users);
            });
        }
        
    }, function(err) {
        console.log('error');
        res.send(err);        
    });   
}

function authenticate(req, res) {
    console.log(req.user);
    res.json({
        success: req.isAuthenticated(),         
        username: req.user ? req.user.username : ''
    }); 
}

function logout(req, res) {
    console.log('Logging out...');
    req.logout();
    res.end();
    res.json({success: true}); 
    console.log('Successful');
}

module.exports = UserController;