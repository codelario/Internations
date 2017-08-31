let config = require('./config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
let { Users } = require('./models/users.model');
let { Groups } = require('./models/groups.model');
let { UsersGroups } = require('./models/users-groups.model');

let app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTION");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(config.server.PORT, () => {
    console.log('listening on ' + config.server.PORT);
})

app.get('/users', (req, res) => {
    Users.find().then((users) => {
        res.send({ users });
    }, (e) => {
        errorStatusResponse();
    });
});

app.post('/users', (req, res) => {
    let user = new Users({
        name: req.body.name,
        lastname: req.body.lastname
    })
    user.save().then((users) => {
        res.send({ users });
    }, (e) => {
        errorStatusResponse();
    });
});

app.delete('/users/:_id', (req, res) => {
    let _id = req.params._id;
    Users.findOneAndRemove({
        _id: new ObjectID(_id)
    }).then((result) => {
        UsersGroups.findOneAndRemove({
            user: new ObjectID(_id)
        }).then((result) => {
            res.send("Success");
        });
    });
});

app.get('/groups', (req, res) => {
    Groups.find().then((groups) => {
        res.send({ groups });
    }, (e) => {
        errorStatusResponse();
    });
});

app.post('/groups', (req, res) => {
    let group = new Groups({
        name: req.body.name,
    });
    group.save().then((group) => {
        res.send({ groups });
    }, (e) => {
        errorStatusResponse();
    });
});

app.delete('/groups/:_id', (req, res) => {
    let _id = req.params._id;
    let these = this;
    Groups.findOneAndRemove({
        _id: new ObjectID(_id)
    }).then((result) => {
        UsersGroups.update (
            {},
            { "$pull": { "groups": { "id": _id } } },
            { safe: true, multi: true },
            (err) => {} 
        );
        res.send("Success");
    });
});

app.get('/usersgroups/:_id', (req, res) => {
    let _id = req.params._id;
    UsersGroups.findOne({
        user: new ObjectID(_id)
    }).then((user) => {
        res.send({ user });
    }, (e) => {
        errorStatusResponse();
    });
});

app.post('/usersgroups', (req, res) => {
    let usersGroups = new UsersGroups({
        user: req.body.user,
        groups: req.body.groups
    });
    UsersGroups.find({
        user: new ObjectID(req.body.user)
    }).remove().then(() => {
        usersGroups.save().then((groups) => {
            res.send({ groups });
        }, (e) => {
            errorStatusResponse();
        });
    })
});

let errorStatusResponse = (e, res) => {
    res.status(400).send(e);
}

module.exports = app;