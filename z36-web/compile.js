const __basedir = __dirname;
const pug = require('pug');
const fs = require('fs');
fs.readdirSync(`${__basedir}/functions`)
    .map((name) => {
        const tempalePath = `${__basedir}/functions/${name}/template.pug`;
        if (fs.existsSync(tempalePath)) {
            const tempaleStat = fs.statSync(tempalePath);
            const compiledTempalePath = `${__basedir}/functions/${name}/template.js`;
            if (fs.existsSync(compiledTempalePath)) {
                const compiledTempaleStat = fs.statSync(compiledTempalePath);
                if ((new Date(tempaleStat.mtime)).getTime() < (new Date(compiledTempaleStat.mtime)).getTime()) {
                    return;
                }
            }
            console.log('Compiling template: ', tempalePath);
            const fn = pug.compileFile(tempalePath, {
                basedir: __basedir
            });
            fs.writeFile(compiledTempalePath, `const pug = require('pug-runtime');module.exports = ${fn.toString()};`);
        }
    });
