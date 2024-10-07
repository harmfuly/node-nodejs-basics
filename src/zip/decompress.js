import { createWriteStream, createReadStream } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { unlink } from 'fs/promises';

const decompress = async () => {
   const fileForDecompressPath = path.join(process.cwd(), 'src/zip/files/archive.gz');
   const decompressedFilePath = path.join(process.cwd(), 'src/zip/files/fileToCompress.txt');

   const fileForDecompress = createReadStream(fileForDecompressPath);
   const unzip = zlib.createGunzip();

   const decompressedFile = createWriteStream(decompressedFilePath);
   fileForDecompress.pipe(unzip).pipe(decompressedFile);
   decompressedFile.on('finish', () => {
    console.log('File has been decompressed successfully');
    unlink(fileForDecompressPath , err => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log('File has been deleted successfully');
        }
    })
   });

   decompressedFile.on('error', (err) => {
    console.error(`Error during decompression:', ${err.message}`);
   });

   fileForDecompress.on('error', (err) => {
    console.error(`Error reading file to decompress: ${err.message}`);
   });
};

await decompress();