
if (!process.argv[2]) {
    console.log('Version not informed. Usage:');
    console.log('  node epub.js <version>');
    process.exit(1);
}
const version = process.argv[2];

const fs = require('fs');
try {
    fs.statSync(`./versions/${version}`);
} catch (err) {
    console.log('Version not found. Available:');
    const files = fs.readdirSync(`./versions`);
    console.log(files.join(', '));
    process.exit(1);
}

const exec = require('child_process').exec;
const async = require('async');
const del = require('del');
const toc = require(`./versions/${version}/toc.json`);
const Applause = require('applause');
var options = {
    patterns: [
        {
            match: /<img src="(.*)".*(\/|\/img)>/g,
            replacement: function () {
                let file = arguments[1];
                return `![${file}](./versions/${version}/${file})`;
            }
        },
        {
            match: /<script.*\/script>/g,
            replacement: ''
        },
        {
            match: /<block.*\/>/g, // inline block
            replacement: ''
        },
        {
            match: /(<|<\/)block.*>/g,
            replacement: ''
        },
        {
            match: /!\[(.*)\]\((.*)\)/g,
            replacement: function () {
                let description = arguments[1];
                let file = arguments[2];
                return `![${description}](./versions/${version}/${file})`;
            }
        }
    ]
};
var applause = Applause.create(options);
let tocMarkdown = [];

function replaceOptions(data) {
    let result = applause.replace(data);
    if (result.content) {
        return result.content;
    }
    return data;
}

function writeMdString(item, callback) {
    const filename = `.tmp/${item.file}.md`;
    let data = `# ${item.title}\n\n`;
    data += fs.readFileSync(`versions/${version}/docs/${item.file}.md`);
    data = replaceOptions(data);
    fs.appendFile(filename, data, function(err) {
        if (err) throw err;

        tocMarkdown.push(`.tmp/${item.file}.md`);
        callback();
    });
}

del.sync('.tmp/*');
console.log('Deleted old files.');

async.forEach(toc, writeMdString, function(err) {
    if (err) console.log(err);

    var tocMdString = tocMarkdown.join(' ');

    exec(`pandoc \
    --self-contained \
    --epub-metadata=epub/metadata.xml \
    -o epub/react-native-manual.epub \
    --epub-cover-image=epub/cover.jpg \
    --epub-stylesheet=epub/epub.css \
    versions/${version}/title.txt \
    ${tocMdString}`,
        function(err, stdout, stderr) {
            if (err) console.log(err);
            console.log('EPUB created.');
        });
});
