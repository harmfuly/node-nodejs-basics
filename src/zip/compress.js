import { createWriteStream, createReadStream } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { unlink } from 'fs/promises';

const compress = async () => {
    const fileToCompressPath = path.join(process.cwd(), 'src/zip/files/fileToCompress.txt');
    const compressedFilePath = path.join(process.cwd(), 'src/zip/files/archive.gz');

    const fileToCompress = createReadStream(fileToCompressPath);
    const gzip = zlib.createGzip();
    const compressedFile = createWriteStream(compressedFilePath);
    
    fileToCompress.pipe(gzip).pipe(compressedFile);

    compressedFile.on('finish', () => {
        console.log('File has been compressed successfully');
        unlink(fileToCompressPath, err => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            } else {
                console.log('File has been deleted successfully');
            }
        })
    });

    compressedFile.on('error', (err) => {
        console.error(`Error writing compressed file: ${err.message}`);
    });

    fileToCompress.on('error', (err) => {
        console.error(`Error reading file to compress: ${err.message}`);
    });
};

await compress();