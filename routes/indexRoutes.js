import { Router } from 'express';
import passport from 'passport';
import { fork } from 'child_process';
import calculate from '../calculate.js';


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

apiRoutes.get('/info', (req, res) => {
    const directory = process.cwd();
    
    const id = process.pid;

    const nodeVersion = process.version;

    const memory = process.memoryUsage();

    const platform = process.platform;

    const inputArgs = process.argv.slice(2).length == 0
        ? 'No argument inputs'
        : process.argv.slice(2);

    const processVariables = {directory, id, nodeVersion, memory, platform, inputArgs};

    res.json(processVariables);
});

apiRoutes('/api/randoms', (req, res) => {

    calculate(req.query);
    
    const calculate = fork('../calculate.js');

    calculate.send('start');

    calculate.on('message', obj => {
        res.end("Obj: ", obj);
    })

});

export default apiRoutes;