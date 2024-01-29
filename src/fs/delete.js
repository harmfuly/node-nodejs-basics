import { error } from 'console';
import { access, unlink } from 'fs/promises';
import path from 'path';

const remove = async () => {
    const currentDirPath = process.cwd();

    const fileToRemove = path.join(currentDirPath, 'src/fs/files/fileToRemove.txt');
    
    try {
        await access(fileToRemove);
        await unlink(fileToRemove);
        console.log('File fileToRemove.txt removed successfully.');
    } catch (fileToRemoveError) {
        if (fileToRemoveError.code === 'ENOENT') {
            throw new Error('FS operation failed. File fileToRemove.txt not found.')
        } else {
            throw new Error(`FS operation failed: ${error.message}`)
        }
    }
};

remove().catch((err) => console.error(err));