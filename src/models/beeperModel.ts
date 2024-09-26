export enum BeeperStatus {
    manufactured = "manufactured",
    assembled = "assembled",
    shipped = "shipped",
    deployed = "deployed",
    Detonated = "detonated"
}

export interface Beeper {
    id?: string;
    name: string;
    status: BeeperStatus;
    created_at: Date;
    detonated_at: Date | null;
    letitude: number | -1;
    longitude: number | -1;
}