import { Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const apiRoutes = Router();

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
};

apiRoutes.get('/', isAuth, (req, res) => {
    res.redirect('/datos');
});

apiRoutes.get('/register', (req, res) => {
    res.sendFile('register.html', {root: 'views'});
});

apiRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
);

apiRoutes.get('/failregister', (req, res) => {
    res.sendFile('register-error.html', {root: 'views'});
});

apiRoutes.get('/login', (req, res) => {
    res.sendFile('login.html', {root: 'views'});
});

apiRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' })
);

apiRoutes.get('/faillogin', (req, res) => {
    res.sendFile('login-error.html', {root: 'views'});
})

apiRoutes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default apiRoutes;