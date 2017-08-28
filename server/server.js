require('./config/config');

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

app.listen(3000, () => {
    console.log('listening on 3000')
})

app.get('/users', (req, res) => {
    Users.find().then((users) => {
        res.send({ users });
    }, (e) => {
        res.status(400).send(e);
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
        res.status(400).send(e);
    });
});

app.delete('/users/:_id', (req, res) => {
    let _id = req.params._id;
    Users.findOneAndRemove({
        _id: new ObjectID(_id)
    }).then((result) => {
        res.send("Success");
    });
});

app.get('/groups', (req, res) => {
    Groups.find().then((groups) => {
        res.send({ groups });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/groups', (req, res) => {
    let group = new Groups({
        name: req.body.name,
    });
    group.save().then((group) => {
        res.send({ groups });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/groups/:_id', (req, res) => {
    let _id = req.params._id;
    Groups.findOneAndRemove({
        _id: new ObjectID(_id)
    }).then((result) => {
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
        res.status(400).send(e);
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
            res.status(400).send(e);
        });
    })
});

let errorStatusResponse = (e, res) => {
    res.status(400).send(e);
}

module.exports = app;