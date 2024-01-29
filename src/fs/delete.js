import { error } from 'console';
import { access, unlink } from 'fs/promises';

const remove = async () => {
    const fileToRemove = 'files/fileToRemove.txt';
    
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