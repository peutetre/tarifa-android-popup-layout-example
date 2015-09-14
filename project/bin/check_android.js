var Q = require('q'),
    path = require('path'),
    fs = require('fs'),
    xml2js = require('xml2js');

module.exports = function (msg) {
    var manifest = path.join(__dirname, '../../app/platforms/android/AndroidManifest.xml'),
        defer = Q.defer(),
        xml = fs.readFileSync(manifest, 'utf-8');

    xml2js.parseString(xml, function (err, result) {
        if(err) {
            defer.reject(err);
        }
        else {
            // result.manifest.application[0].$['android:theme'] = "@android:style/Theme.Dialog";
            result.manifest.application[0].$['android:theme'] = "@android:style/Theme.Holo.Dialog.NoActionBar";
            delete result.manifest.application[0].activity[0].$['android:theme'];
            var builder = new xml2js.Builder({
                renderOpts: { pretty: true, indent: '    ', newline: '\n' },
                headless: true
            });
            fs.writeFileSync(manifest, builder.buildObject(result), 'utf-8');
            defer.resolve(msg);
        }
    });

    return defer.promise;
}
