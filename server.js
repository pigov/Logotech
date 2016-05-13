require('app-module-path').addPath(__dirname);

var express = require('express'),
    lang = require('lang/bg.json'),
    fs = require('fs'),
    _ = require('lodash'),
    app = express();

var indexTemplate = _.template(fs.readFileSync(__dirname + '/index.html'));

app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.get(['/', '/profile', '/services', '/clients', '/contact'], function (req, res) {
    res.send(indexTemplate(_.extend(lang, {
        currentPage: req.path,
        urls: {
            home: "/",
            profile: "/profile",
            services: "/services",
            clients: "/clients",
            contact: "/contact"
        }
    })));
});

app.listen(3002, function () {
    console.log("Started listening on port 3002");
});
