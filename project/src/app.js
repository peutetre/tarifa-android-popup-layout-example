var qstart = require('qstart'),
    Q = require('q'),
    format = require('util').format,
    settings = require('settings'),
    Zanimo = require('zanimo'),
    $ = function (s) { return document.querySelector(s); };

qstart.then(function () {
    var p = $('p.info'),
        logo = $('.main.circle');

    return Q.delay(500).then(function () {
        return Q.delay(logo, 500).then(Zanimo.f('transform', 'rotateZ(0deg)', 300, 'ease-in-out'));
    });
});
