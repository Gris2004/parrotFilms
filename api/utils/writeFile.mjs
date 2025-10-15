import { promises as fs } from 'fs';

export async function writeFile(text){
    let routeFile = '../dbChangelog.txt';

    try{
        await fs.appendFile(routeFile, text + ';\n');
        console.log('Texto guardado en ', routeFile, ': ', text + '\n');
    } catch (error) {
        console.error('error al guardar el texto en ', routeFile, error);
    }
}

