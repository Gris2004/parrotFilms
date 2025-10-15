//importar los paquetes necesarios para app.mjs
import express from 'express'
import connect from './db/dbconnection.mjs'
import { menuCLI } from './utils/menucli.mjs';
import router from './routes/crudroutes.mjs';

//usamos express para iniciar el api
const app = express();
const port = process.env.port || 3000 //establecemos nuestro puerto
const ip = process.env.ip || '0.0.0.0'; //establecemos nuestra ip
app.use(express.json());

const db = await connect();
app.use((req, res, next) => {
    req.db = db;
    next();
});
app.use('/api', router);
app.set('json spaces', 2);

app.listen(port, ip, () => console.log('escuchando el puerto ', port, ' y la ip ', ip));

//conectamos con la base de datos

//iniciamos menúcli
await menuCLI(db);
