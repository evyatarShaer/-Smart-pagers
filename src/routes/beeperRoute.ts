import express from 'express';
import * as beeperController from '../controllers/beeperController';


const beeperRouter = express.Router();

beeperRouter.get('/beepers', beeperController.getAllBeeppers);

export default beeperRouter 