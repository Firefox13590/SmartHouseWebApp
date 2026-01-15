// Firebase related definitions

import type { DocumentReference, Timestamp } from "firebase/firestore/lite";


export declare interface IDataCollectionArray{
    dataCollections: IDataCollection[],
}
/**
 * Type of data tracked by an IoTObject element.
 * 
 * Holds information about data over time like temperature.
 */
export declare interface IDataCollection {
    dataName: string,
    dataValues: number[],
    dataTimestamps: Timestamp[],
}
export declare interface IDataStateArray{
    dataStates: IDataState[],
}
/**
 * Type of data tracked by an IoTObject element.
 * 
 * holds information about the current state of data like a door.
 */
export declare interface IDataState {
    dataName: string,
    dataState: boolean,
}

/**
 * Representation of an IoT element like a Smarthouse.
 */
export declare interface IIotObject {
    name: string,
    dataCollectionsRef?: DocumentReference,
    dataStatesRef?: DocumentReference,
}
export declare interface IIotData{
    dataCollectionArray?: IDataCollectionArray,
    dataStateArray?: IDataStateArray,
}


// Components related interfaces

export declare interface IGraphProperties{
    id: string,
    // key: string,
    data: IDataCollection[],
    graphDisplay: string,
}

