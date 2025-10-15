import { scanner } from './scanner.mjs';
import { fetchData, createRow, deleteRow, grantPrivileges } from '../db/db_crud.mjs'

export async function menuCLI(db) {
    while(true){
        var option = await scanner('\n\n 1:CONSULTAR 2:CREAR REGISTRO 3:ELIMINAR REGISTRO G/g:OTORGAR PERMISOS Q/q:SALIR\n');
        if(option == '1') { await fetchData(db); }
        else if(option == '2') { await createRow(db); }
        else if(option == '3') { await deleteRow(db); } 
        else if(option == 'G' || option == 'g') {
        console.log('Esta función activará todos los permisos para poder trabajar, creará un usuario y le dará los permisos');
        console.log('el api no es segura ya que no me dio tiempo jajaja, pero, igual es recomenable usarla para evaluar');
        console.log('mi mediocre trabajo jajaja');
        const opt = await scanner('Y/y:Continuar N/n: para abortar\n');
        if(opt == 'y' || opt == 'Y') {
            console.log('otorgando permisos');
            await grantPrivileges(db);
        } else if (opt == 'n' || opt == 'N') { console.log('no se han otorgado los permisos'); }
        else console.log('opción no válida');
    }
    else if(option == 'q' || 'Q') { break; }
    else console.log('opcion no valida');
}
}
