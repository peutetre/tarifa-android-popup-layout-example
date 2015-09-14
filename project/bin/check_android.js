var Q = require('q'),
    path = require('path'),
    fs = require('fs'),
    xml2js = require('xml2js');

module.exports = function (msg) {
    var manifest = path.join(__dirname, '../../app/platforms/android/AndroidManifest.xml'),
        src = path.join(__dirname, 'popup.xml'),
        theme = path.join(__dirname, '../../app/platforms/android/res/values/popup.xml'),
        defer = Q.defer(),
        xml = fs.readFileSync(manifest, 'utf-8');

    xml2js.parseString(xml, function (err, result) {
        if(err) {
            defer.reject(err);
        }
        else {
            // "@android:style/Theme.Dialog"
            // "@android:style/Theme.Holo.Dialog.NoActionBar"
            result.manifest.application[0].$['android:theme'] = "@style/PopupTheme";
            delete result.manifest.application[0].activity[0].$['android:theme'];
            var builder = new xml2js.Builder({
                renderOpts: { pretty: true, indent: '    ', newline: '\n' },
                headless: true
            });
            fs.writeFileSync(manifest, builder.buildObject(result), 'utf-8');
            fs.writeFileSync(theme, fs.readFileSync(src, 'utf-8'), 'utf-8');
            defer.resolve(msg);
        }
    });

    return defer.promise;
}
