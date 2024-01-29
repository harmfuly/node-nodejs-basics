import { access, rename as fsRename } from 'fs/promises';
import path from 'path';

const rename = async () => {
    const currentDirPath = process.cwd();

    const sourceFile = path.join(currentDirPath, 'src/fs/files/wrongFilename.txt');
    const newFile =  path.join(currentDirPath, 'src/fs/files/properFilename.md');

    try {
        await access(sourceFile);

        try {
           await access(newFile);
           throw new Error('FS operation failed: properFilename.md already exists');
        }
        catch (newFileError) {
            if (newFileError.code === 'ENOENT') {
                await fsRename(sourceFile, newFile);

                console.log('File renamed successfully');
            } else {
                throw new Error(`FS operation failed: ${newFileError.message}`);
        }
    }
    } catch (sourceFileError) {
        if (sourceFileError.code === 'ENOENT') {
            throw new Error ('FS operation failed: wrongFilename.txt is not found')
        } else {
            throw new Error(`FS operation failed: ${sourceFileError.message}`);
        }
    }
};

rename().catch((err) => console.error(err));