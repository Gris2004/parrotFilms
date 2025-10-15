import { Router } from 'express';
import { fetchData, createRow, deleteRow, grantPrivileges } from '../db/db_crud.mjs';

const router = Router();

//endpoint para dar privilegios
router.get('/grant', async(req, res) => {
   try{
        const { db } = req; //pasará por un midleware
        await grantPrivileges(db);
        res.json({message: 'privilegios otorgados'});
   } catch (error) {
        res.status(500).json({error: error.message});
   }
});

//endpoint para mostrar los datos de una tabla
router.get('/tables/:name', async (req, res) => {
    try{
        const { db } = req;
        const { name } = req.params;
        const result = await fetchData(db, name);
        res.json(result);
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

//endpoint para crear un registro
router.post('/tables/:name', async (req, res) => {
    try{
        const { db } = req;
        const { name } = req.params;
        const values = req.body.values || [];
        await createRow(db, name, values);
        res.json({message: 'registro creado'});
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

router.delete('/tables/:name/:idColumn/:idRow', async (req, res) => {
    try{
        const { db } = req;
        const { name, idColumn, idRow } = req.params;
        await deleteRow(db, name, idRow, idColumn);
        res.json({message: 'registro eliminado'});
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

export default router;
