import mysql from 'mysql2/promise';
import { scanner } from '../utils/scanner.mjs';
import { writeFile } from '../utils/writeFile.mjs';
import { replaceQuestionMarks } from '../utils/replaceQuestionMarks.mjs';

export async function grantPrivileges(db){
    try{
        console.log('\n\n===DANDO PRIVILEGIOS===');
        //comandos de sql
        //crear usuario para trabajar tanto en localhost como en ip local
        await db.execute("CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '' ");

        //otorgar permisos
        await db.execute("GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '' ")
    } catch (error){
        console.log('Error al dar prvilegios ', error);
    }
}

export async function fetchData(db, value){
    try{
        console.log('\n\n===RECUPERANDO DATOS===');
        console.log(await db.execute('SHOW TABLES'));
        if(!value) { value = await scanner('digita el nombre de la tabla a consultar\n'); }
        const [rows, fields] = await db.execute(`SELECT * FROM ${mysql.escapeId(value)}`);
        console.log('consulta realizada con éxito');
        console.log(rows);
        return rows;

    } catch (error){
        console.log('Error al mostrar datos', error);
    }
}

export async function createRow(db, tableName, values = []){
    try{
        console.log('\n\n ===CREACION DE REGISTROS===')
       
        //tomando datos del usuario
        console.log(await db.execute('SHOW TABLES'));
        if(!tableName) { tableName = await scanner('digita la tabla  para crear registro\n'); }
        const [descriptionRows, descriptionFields] = await db.execute(`DESCRIBE ${mysql.escapeId(tableName)}`);
        //mostrando la descripción de la tabla seleccionada
        console.log(descriptionRows);
        
        //para el ciclo for necesitamos la cantida de campos que tiene cada tabla
        const columnCount = descriptionRows.length;
        
        //definición de los arreglos para la inserción
        let arrayField = values;
        if(!arrayField || arrayField.length === 0) {
            for(let x = 1; x < columnCount; x++){
                console.log('descripcion de la tabla elegida \n', descriptionRows[x]);
                const fieldContent = await scanner(('digite el valor del campo: ', descriptionRows[x].Field + '\n'));
                arrayField.push(fieldContent);
            }
        }

        console.log('arreglos a insertar: ', arrayField);
        
        //se realiza la inserción 
        const insertRow = `INSERT INTO ${tableName} (${descriptionRows.slice(1).map(col => mysql.escapeId(col.Field)).join(", ")}) VALUES (${arrayField.map(() => '?').join(", ")})`;
        await db.execute(insertRow, arrayField);
        const replacedQuery = await replaceQuestionMarks(insertRow, arrayField);
        console.log('consulta realizada!: ', replacedQuery);
        console.log('Se guardará el cambio en dbchangelog.txt');
        await writeFile(replacedQuery);
        console.log('cambio guardado!: ', replacedQuery);

        
    } catch (error){
        console.log('Error al crear registros ', error);
    }
}

export async function deleteRow(db, tableName, idRow, idColumn){
    try{
        console.log("\n\n ===ELIMINANDO REGISTROS===");
        
        //consulta y toma de datos de la tabla seleccionada
        console.log(await db.execute('SHOW TABLES'));
        if(!tableName){ 
            tableName = await scanner('digita el nombre de la tabla\n');
        }

        //consulta de la tabla a elegir de todos los registros
        const [dataRows, dataFields] = await db.execute(`SELECT * FROM ${mysql.escapeId(tableName)}`);
        if(!idRow) {
            idRow = await scanner('digita el id de la fila a borrar\n');
        }
        
        //tomando el id de la columna, se le mostrará una descripción de la tabla que ha elegido
        console.log(await db.execute(`DESCRIBE ${tableName}`));
        if(!idColumn){
            idColumn = await scanner('digita el valor de la columna identificadora\n');
        }
        
        //inserón del registro
        let deleteQuery = `DELETE FROM ${mysql.escapeId(tableName)} WHERE ${mysql.escape(idColumn)} = ${mysql.escape(idRow)}`;
        await db.execute(deleteQuery);
        console.log('se ha eliminado el registro exitosamente')
        console.log(deleteQuery, ' ', 'Se guardará en el changelog')
        await writeFile(deleteQuery);

    } catch (error){
        console.log('error al eliminar un registro ', error);
    }
}
