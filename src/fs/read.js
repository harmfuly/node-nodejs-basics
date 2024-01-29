import { access, readFile } from 'fs/promises'

const read = async () => {
    const filePath = 'files/fileToRead.txt';

    try {
        await access(filePath);

        const fileContent = await readFile(filePath, 'utf-8');
        console.log('Content of file:', fileContent);
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