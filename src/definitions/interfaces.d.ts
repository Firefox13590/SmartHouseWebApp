import type { DocumentReference, Timestamp } from "firebase/firestore/lite";



/* 
            Firebase related custom data structure definitions
*/

/**
 * Liste de {@link IDataCollection}.
 */
interface IDataCollectionArray{
    dataCollections: IDataCollection[],
}
/**
 * Tracked by an {@link IIotObject} element. 
 * 
 * Data structure responsible for time-based data (e.g. temperature).
 */
interface IDataCollection {
    dataName: string,
    dataValues: number[],
    dataTimestamps: Timestamp[],
}
/**
 * Map of state data, with the data name as key and its value as boolean.
 * 
 * Tracked by an {@link IIotObject} element.
 * 
 * @param dataName Name of the state data (e.g. "door_open").
 * @param dataState Current value of the state (true/false).
 */
interface IDataStateMap{
    [dataName: string]: TDataState,
}

/**
 * An IoT object such as a smart home.
 * 
 * Holds references to its data and configuration in the database.
 */
interface IIotObject {
    name: string,
    dataCollectionsRef?: DocumentReference,
    dataStatesRef?: DocumentReference,
    configRef: DocumentReference,
}
/**
 * Data linked to an {@link IIotObject}, retrieved from the database. 
 * 
 * Contains both time-based data and state data.
 */
interface IIotData{
    dataCollectionArray?: IDataCollectionArray,
    dataStateMap?: IDataStateMap,
}



/* 
            Component props definitions
*/

/**
 * Graph component props definition.
 * 
 * @param id Unique identifier for the graph.
 * @param data Array of {@link IDataCollection} to be displayed.
 * @param graphDisplay Display mode for the graph (e.g. "separated", "combined").
 */
interface IGraphProp{
    id: string,
    data: IDataCollection[],
    graphDisplay: string,
}
/**
 * Toggle component props definition.
 * 
 * @param name Name of the state being toggled (e.g. "door_open").
 * @param value Current value of the state (true/false).
 */
interface IToggleProp{
    name: string,
    value: boolean,
}



/* 
            Others
*/

/**
 * Config for an {@link IIotObject}.
 * 
 * @param alarm Whether the alarm is active or not.
 * @param dataCaptureTimer Time between each data capture, with hour and minute fields.
 */
interface IControlsConfig{
    alarm: boolean,
    dataCaptureTimer: {
        hour: number,
        minute: number
    }
}


