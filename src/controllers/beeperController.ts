import { Request, Response } from 'express';
import {Beeper} from '../models/beeperModel';
import jsonFile from 'jsonfile';
import path from 'path';

const beepersFile = path.join(__dirname, '../data/db.json');

export const getAllBeeppers = async (req: Request, res: Response) => {
    try {
        const beepers = await jsonFile.readFile(beepersFile);
        res.status(200).json(beepers);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reading beepers from the database.' });
    }
}