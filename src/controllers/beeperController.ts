import { Request, Response } from 'express';
import {Beeper, BeeperStatus} from '../models/beeperModel';
import * as beeperService from '../services/beeperService';
import jsonFile from 'jsonfile';
import path, { parse } from 'path';

const beepersFile = path.join(__dirname, '../../src/data/db.json');

export const getAllBeeppers = async (req: Request, res: Response) => {
    try {
        const beepers = await beeperService.getBeeperService();
        res.status(200).json(beepers);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
}

export const getBeeperById = async (req: Request, res: Response) => {
    try {
        const beeperId: string = req.params.id;
        
        const beeper = await beeperService.getBeeperByIdService(beeperId);
        
        if (!beeper) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        res.status(200).json(beeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beeper from the database' });
    }
}



export const createBeeper = async (req: Request, res: Response) => {
    try {
        const beeperName: string = req.body.name;
        const newBeeper: Beeper = await beeperService.creatBeeperService(beeperName);
        
        res.status(201).json({newBeeper});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed creating beeper in the database' });
    }
}


export const updateBeeper = async (req: Request, res: Response) => {
    try {
        const beeperId: string = req.params.id;
        const beeperStatus: string = req.body.status;
        
        const beeper = await beeperService.updateBeeperService(beeperId, beeperStatus);
        
        if (beeper === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        
        res.status(200).json(beeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed updating beeper in the database' });
    }
}



export const deleteBeeper = async (req: Request, res: Response) => {
    try {
        const beeperId: string = req.params.id;
        
        const deletedBeeper = await beeperService.deleteBeeperService(beeperId);
        
        if (deletedBeeper === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed deleting beeper from the database' });
    }
}


export const getBeepersByStatus = async (req: Request, res: Response) => {
    try {
        const beeperStatus: string = req.params.status;

        const filterBeepers = await beeperService.getBeepersByStatusService(beeperStatus);
        
        res.status(200).json(filterBeepers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
}