import { createWriteStream, createReadStream } from 'fs';
import zlib from 'zlib';
import path from 'path';

const compress = async () => {
    const fileToCompress = createReadStream(path.join(process.cwd(), 'src/zip/files/fileToCompress.txt'));

    const gzip = zlib.createGzip();

    const compressedFile = createWriteStream(path.join(process.cwd(), 'src/zip/files/archive.gz'));
    fileToCompress.pipe(gzip).pipe(compressedFile);

    compressedFile.on('finish', () => {
        console.log('File has been compressed successfully');
    });

    compressedFile.on('error', (err) => {
        console.error(`Error writing compressed file: ${err.message}`);
    });

    fileToCompress.on('error', (err) => {
        console.error(`Error reading file to compress: ${err.message}`);
    });
};

await compress();