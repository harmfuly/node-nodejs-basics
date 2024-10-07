import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const calculateHash = async () => {
    const filePath = path.join(process.cwd(), 'src/hash/files/fileToCalculateHashFor.txt');
    const fileStream = createReadStream(filePath);
    const hash = createHash('sha256');

    fileStream.on('data', (chunk) => hash.update(chunk));
    fileStream.on('end', () => {
        const resulthash = hash.digest('hex');
        console.log(`Hash: ${resulthash}`);
    });
    fileStream.on('error', (err) => console.error(`Error reading file: ${err.message}`));
};

await calculateHash();