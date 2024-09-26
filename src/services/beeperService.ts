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


export const updateBeeperStatusService = async (beeperId: string, beeperStatus: String, beeperLet?: string, beeperLon?: string) => {
    const beepers = await jsonFile.readFile(beepersFile);
        
    const index = beepers.findIndex((beeper: Beeper) => beeper.id === beeperId);
    if (index === -1) {
        return -1;
    }
    
    beepers[index].status = beeperStatus as BeeperStatus;
    if (beeperStatus === "deployed")
    {
        beepers[index].letitude = Number(beeperLet);
        beepers[index].longitude = Number(beeperLon);

        const Detonated = (beeper: Beeper) => {
            beeper.status = BeeperStatus.Detonated;
            beeper.detonated_at = new Date();
            beeper.letitude = -1;
            beeper.longitude = -1;
        }
        const timer: NodeJS.Timeout = setInterval(() => {
            Detonated(beepers[index])
        }, 10000);
        clearInterval(timer);
    }
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