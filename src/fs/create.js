import { access, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {

    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);

    console.log('currentDirPath:', currentDirPath);
    
    const filePath = join(currentDirPath, 'files', 'fresh.txt');

    console.log('filePath', filePath);

    try {

        await access(filePath);
        throw new Error('FS operation failed: File already exists');
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            try {
                await writeFile(filePath, 'I am fresh and young');
                console.log ('File created successfully: fresh.txt');
            }
            catch (writeError) {
                throw new Error(`FS operation failed: ${writeError.message}`);
            }
        }
        else {
            throw new Error(`FS operation failed: ${error.message}`);
        }
    }
};

create().catch((err) => console.error(err));