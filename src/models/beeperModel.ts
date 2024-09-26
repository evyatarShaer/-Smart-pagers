enum BeeperStatus {
    manufactured,
    assembled,
    shipped,
    deployed
}

export interface Beeper {
    id?: string;
    name: string;
    status: BeeperStatus;
    created_at: Date;
    detonated_at: Date;
    letitude: number | -1;
    longitude: number | -1;
}