import { Transform } from 'stream';


const transform = async () => {
    process.stdin.setEncoding('utf-8');
    process.stdout.setEncoding('utf-8');
    
    console.log('Enter text to reverse (press Ctrl+C to exit):');

    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('');
            callback(null, reversed);
        }
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout)

    process.stdin.on('error', err => {
       console.error(`Error reading from stdin: ${err.message}`);
    });
    reverseTransform.on('error', err => {
        console.error(`Error in transform stream: ${err.message}`);
    });

};

await transform();