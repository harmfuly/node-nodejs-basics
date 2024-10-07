import { access, readFile } from 'fs/promises';
import path from 'path';

const read = async () => {
    const currentDirPath = process.cwd();

    const fileName = 'src/fs/files/fileToRead.txt';
    const filePath = path.join(currentDirPath, fileName);

    try {
        await access(filePath);

        const fileContent = await readFile(filePath, 'utf-8');
        
        console.log('\x1b[34m%s\x1b[0m', 'Content of file:');
        console.log(fileContent);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: File fileToRead.txt is not found.');
        } else {
            throw new Error(`FS operation failed: ${error.message}`);
        }
    }
};

read().catch((err) => console.error(err));