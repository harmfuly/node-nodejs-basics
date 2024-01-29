import { access, readdir } from 'fs/promises';
import path from 'path';

const list = async () => {
    const currentDirPath = process.cwd();
    const folderPath = path.join(currentDirPath, 'src/fs/files');

     try {
        await access(folderPath);

        const fileNames = await readdir(folderPath);
        console.log('Files:', fileNames);
     }
     catch (folderPathError) {
        if (folderPathError.code === 'ENOENT') {
            throw new Error('FS operation failed. Folder "files" not found.');
        } else {
            throw new Error(`FS operation failed: ${error.message}`);
        }
     }
};

list().catch((err) => console.error(err));