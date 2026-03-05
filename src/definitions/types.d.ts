import type { Timestamp } from "firebase/firestore/lite";

type DataState = boolean;
type DataCollection = {
    dataTimestamps: Timestamp[],
    dataValues: number[]
};

type GraphDisplay = "separated" | "condensed";
