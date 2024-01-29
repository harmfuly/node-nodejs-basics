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
            throw new Error('FS operation failed: New folder already exists');
        }
        catch (newFolderError) {
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
                throw new Error (`FS operation failed: ${newFolderError.message}`);
                }
            }
        } catch (sourceFolderError) {
            if (sourceFolderError.code === 'ENOENT') {
                throw new Error('FS operation failed: Source folder not found');
            } else {
                throw new Error(`FS operation failed: ${sourceFolderError.message}`);
            }
        }
};

copy().catch((err) => console.error(err));
