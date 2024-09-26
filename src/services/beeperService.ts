import { v4 as uuidv4 } from "uuid";
import jsonFile from 'jsonfile';
import path, { parse } from 'path';
import {Beeper, BeeperStatus} from '../models/beeperModel';

const beepersFile = path.join(__dirname, '../../src/data/db.json');


export const creatBeeperService = async (beeperName: string) => {
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
    return newBeeper;
}


export const getBeeperService = async () => {
    const beepers = await jsonFile.readFile(beepersFile);
    return beepers;
}


export const getBeeperByIdService = async (beeperId: string) => {
    const beepers = await jsonFile.readFile(beepersFile);
    return beepers.find((beeper: Beeper) => beeper.id === beeperId);
}


export const updateBeeperService = async (beeperId: string, beeperStatus: String) => {
    const beepers = await jsonFile.readFile(beepersFile);
        
    const index = beepers.findIndex((beeper: Beeper) => beeper.id === beeperId);
    if (index === -1) {
        return -1;
    }
    
    beepers[index].status = beeperStatus as BeeperStatus;
    await jsonFile.writeFile(beepersFile, beepers);
    return beepers[index];
}


export const deleteBeeperService = async (beeperId: string) => {
    const beepers = await jsonFile.readFile(beepersFile);
    const index = beepers.findIndex((beeper: Beeper) => beeper.id === beeperId);
    if (index === -1) {
        return -1;
    }
    
    beepers.splice(index, 1);
    await jsonFile.writeFile(beepersFile, beepers);
    return beepers[index];
}



export const getBeepersByStatusService = async (beeperStatus: string) => {
    const beepers = await jsonFile.readFile(beepersFile);
        
    const filterBeepers = beepers.filter((beeper: Beeper) => beeper.status == beeperStatus);
    return filterBeepers;
}