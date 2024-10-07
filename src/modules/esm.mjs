import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { readFile } from 'fs/promises';

const random = Math.random();

const aDataPath = path.resolve('./src/modules/files/a.json');
const bDataPath = path.resolve('./src/modules/files/b.json');

const aData = await readFile(aDataPath, 'utf-8').then(JSON.parse);
const bData = await readFile(bDataPath, 'utf-8').then(JSON.parse);

const aObject = assertObject(aData);
const bObject = assertObject(bData);

let unknownObject;

unknownObject = random > 0.5 ? aObject : bObject;

function assertObject(data) {
    if (typeof data !== 'object') {
        throw new Error('Imported JSON data is not an object');
    }
    return data;
}


console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export default {
    unknownObject,
    myServer,
};

