import type { DocumentReference } from "firebase/firestore/lite";
import type { DataCollection } from "./types";



/* 
            Firebase related custom data structure definitions
*/

/**
 * Holds all data collections linked to an {@link IIotObject}, with the data name as key and its value as an array of timestamps and values.
 * 
 * Tracked by an {@link IIotObject} element.
 * 
 * @param dataName Name of the data collection (e.g. "temperature").
 */
interface IAllDataCollections{
    [dataName: string]: DataCollection,
}
/**
 * Holds all data states, with the data name as key and its value as boolean.
 * 
 * Tracked by an {@link IIotObject} element.
 * 
 * @param dataName Name of the state data (e.g. "light_bathroom").
 */
interface IAllDataStates{
    [dataName: string]: DataState,
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
    dataCollections?: IAllDataCollections,
    dataStates?: IAllDataStates,
}



/* 
            Component props definitions
*/

/**
 * Graph component props definition.
 * 
 * @param id Unique identifier for the graph.
 * @param data Array of data collections, with the data name as key and its value as an array of timestamps and values.
 * @param graphDisplay Display mode for the graph (e.g. "separated", "combined").
 */
interface IGraphProp{
    id: string,
    data: [string, DataCollection][],
    graphDisplay: GraphDisplay,
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


