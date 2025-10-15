import mysql from 'mysql2/promise';

export async function connect(){
    try{
        const connection = await mysql.createConnection({
            host: '0.0.0.0',
            port: 3306,
            user: 'root',
            password: '',
            database: 'parrotfilms'
        });
        console.log('Conexión con la base de datos establecida');
        return connection;
    } catch (error){
        console.error('Error al conectar con la base de datos ', error);
    }
}

export default connect;
