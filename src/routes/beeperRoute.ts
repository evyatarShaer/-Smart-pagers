import express from 'express';
import * as beeperController from '../controllers/beeperController';


const beeperRouter = express.Router();

beeperRouter.get('/beepers', beeperController.getAllBeeppers);
beeperRouter.get('/beepers/:id', beeperController.getBeeperById);
beeperRouter.post('/beepers', beeperController.createBeeper);
beeperRouter.put('/beepers/:id/status', beeperController.updateBeeperStatus);
beeperRouter.delete('/beepers/:id', beeperController.deleteBeeper);
beeperRouter.get('/beepers/status/:status', beeperController.getBeepersByStatus);

export default beeperRouter 