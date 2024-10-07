import { access, readdir, copyFile, mkdir } from 'fs/promises';
import path from 'path';

const copy = async () => {
    const currentDirPath = process.cwd();

    const sourceFolder = path.join(currentDirPath, 'src/fs/files');
    const newFolder = path.join(currentDirPath, 'src/fs/files_copy');

    try {
        await access(sourceFolder);

        try {

            await access(newFolder);
            
            console.error('FS operation failed: New folder already exists');
            
            return;

        } catch (newFolderError) {
            if (newFolderError.code === 'ENOENT') {

                await mkdir(newFolder);

                const files = await readdir(sourceFolder);

                for (const file of files) {
                    const sourceFilePath = path.join(sourceFolder, file);
                    const newFilePath = path.join(newFolder, file);

                    await copyFile(sourceFilePath, newFilePath);
                }

                console.log('Folder copied successfully.');

            } else {
               console.error(`FS operation failed: ${newFolderError.message}`);
                }
            }
            
        } catch (sourceFolderError) {
            if (sourceFolderError.code === 'ENOENT') {
                console.error('FS operation failed: Source folder not found');
            } else {
                console.error(`FS operation failed: ${sourceFolderError.message}`);
            }
        }
};

copy().catch((err) => console.error(err));
