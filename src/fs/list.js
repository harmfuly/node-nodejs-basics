import { access, readdir } from 'fs/promises';

const list = async () => {
     const folderPath = 'files';

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