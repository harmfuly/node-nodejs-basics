import { createWriteStream } from 'fs';
import path from 'path';

const write = async () => {
    process.stdin.setEncoding('utf-8');
    console.log('Enter text to write to the file (press Ctrl+C to exit):');
    
    const writablePath = path.join(process.cwd(), 'src/streams/files/fileToWrite.txt');
    const writableStream = createWriteStream(writablePath, { flags: 'a', encoding: 'utf-8' });

    process.stdin.on('data', data => {
        const trimData = data.trim();
        writableStream.write(data);
        console.log('You entered:', trimData);
    });

    writableStream.on('error', err => {
        console.error(`Error writing to the file: ${err.message}`);
    });

    process.stdin.on('error', err => {
        console.error(`Error reading from stdin: ${err.message}`);
    });

};

await write();