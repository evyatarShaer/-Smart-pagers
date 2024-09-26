import { Request, Response } from 'express';
import {Beeper} from '../models/beeperModel';
import {BeeperStatus} from '../models/beeperModel';
import jsonFile from 'jsonfile';
import path, { parse } from 'path';

const beepersFile = path.join(__dirname, '../../src/data/db.json');

export const getAllBeeppers = async (req: Request, res: Response) => {
    try {
        const beepers = await jsonFile.readFile(beepersFile);
        res.status(200).json(beepers);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
}

export const getBeeperById = async (req: Request, res: Response) => {
    try {
        const beeperId: String = req.params.id;
        const beepers = await jsonFile.readFile(beepersFile);
        
        const beeper = beepers.find((beeper: Beeper) => beeper.id === beeperId);
        
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
        const newBeeper: Beeper = req.body;
        const beepers = await jsonFile.readFile(beepersFile);
        newBeeper.status: BeeperStatus = "manufactured";

        beepers.push(newBeeper);
        await jsonFile.writeFile(beepersFile, beepers);
        
        res.status(201).json(newBeeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed creating beeper in the database' });
    }
}


export const updateBeeper = async (req: Request, res: Response) => {
    try {
        const beeperId: String = req.params.id;
        const beeperStatus: String = req.params.BeeperStatus;
        
        const beepers = await jsonFile.readFile(beepersFile);
        
        const index = beepers.findIndex((beeper: Beeper) => beeper.id === beeperId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        
        beepers[index].status = beeperStatus;
        await jsonFile.writeFile(beepersFile, beepers);
        
        res.status(200).json(beeperStatus);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed updating beeper in the database' });
    }
}