import { createReadStream } from 'fs';
import path from 'path';

const read = async () => {
    const readableFilePath = path.join(process.cwd(), 'src/streams/files/fileToRead.txt');
    const readableStream = createReadStream(readableFilePath, 'utf-8');

    readableStream.pipe(process.stdout)
    readableStream.on('error', (err) => console.error(`Error reading file: ${err.message}`));
}

await read();