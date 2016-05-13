require('app-module-path').addPath(__dirname);

var express = require('express'),
    lang = require('lang/en.json'),
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
        services: [
            {text: lang.serviceMachines, url: "/services#machines"},
            {text: lang.serviceMetalConstructions, url: "/services#metalConstructions"},
            {text: lang.serviceConstructionMachines, url: "/services#constructionMashines"},
            {text: lang.serviceSchoolEquipment, url: "/services#schoolEquipment"},
            {text: lang.serviceContainers, url: "/services#containers"},
            {text: lang.serviceFences, url: "/services#fences"},
            {text: lang.serviceSpecialEquipment, url: "/services#specialEquipment"}
        ],
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
