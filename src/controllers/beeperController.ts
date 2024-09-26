import { Request, Response } from 'express';
import {Beeper} from '../models/beeperModel';
import {BeeperStatus} from '../models/beeperModel';
import { v4 as uuidv4 } from "uuid";
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
        const beeperName: string = req.body.name;
        const beepers = await jsonFile.readFile(beepersFile);
        
        const newBeeper: Beeper = {
            id: uuidv4(),
            name: beeperName,
            status: BeeperStatus.manufactured,
            created_at: new Date(),
            detonated_at: null,
            letitude: -1,
            longitude: -1   
        }

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
        const beeperStatus: String = req.body.status;
        
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



export const deleteBeeper = async (req: Request, res: Response) => {
    try {
        const beeperId: String = req.params.id;
        
        const beepers = await jsonFile.readFile(beepersFile);
        
        const index = beepers.findIndex((beeper: Beeper) => beeper.id === beeperId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        
        beepers.splice(index, 1);
        await jsonFile.writeFile(beepersFile, beepers);
        
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
        
        const beepers = await jsonFile.readFile(beepersFile);
        
        const filterBeepers = beepers.filter((beeper: Beeper) => beeper.status === beeperStatus);
        
        res.status(200).json(filterBeepers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
}