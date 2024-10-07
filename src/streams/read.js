import { createReadStream } from 'fs';
import { createWriteStream } from 'fs';
import path from 'path';

const read = async () => {
    const readableFilePath = path.join(process.cwd(), 'src/streams/files/fileToRead.txt');
    const wrirebleFilePath = path.join(process.cwd(), 'src/streams/files/fileToWrite.txt');
    const readableStream = createReadStream(readableFilePath, 'utf-8');
    const wrirebleStream = createWriteStream(wrirebleFilePath, 'utf-8');

    readableStream.on('data', (chunk) => {
        wrirebleStream.write(chunk)
    });
    readableStream.on('error', (err) => console.error(`Error reading file: ${err.message}`));

}

await read();