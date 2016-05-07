
var exec = require('child_process').exec;
const fs = require('fs');
try {
    fs.statSync(`./epub/react-native-manual.epub`);
} catch (err) {
    console.log('EPUB not found. Please generate the EPUB first.');
    process.exit(1);
}

console.log('Generating MOBI ...');
exec('kindlegen epub/react-native-manual.epub', function(err, stdout, stderr) {
    if (err) console.log(err);
    console.log('MOBI created.');
});
