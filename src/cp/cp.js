import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';

const spawnChildProcess = async (args) => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);

    const child = spawn('node', [resolve(currentDirPath, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    child.on('error', (err) => {
        console.error(`Failed to start child process: ${error.message}`);
    });

};
console.log('press Ctrl+C to exit');

spawnChildProcess( ['arg1', 'arg2'] );
