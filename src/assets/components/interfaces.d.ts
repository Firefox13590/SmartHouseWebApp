


// Firebase related definitions

/**
 * Type of data tracked by an IoTObject element.
 * 
 * Holds information about data over time like temperature.
 */
export declare interface DataCollection {
    dataName: string,
    dataValues: (string | number)[],
}
/**
 * Type of data tracked by an IoTObject element.
 * 
 * holds information about the current state of data like a door.
 */
export declare interface DataState {
    dataname: string,
    dataState: boolean,
}

/**
 * Representation of an IoT element like a Smarthouse.
 */
export declare interface IotObject {
    dbAccess: string,
    name: string,
    type: string,
    trackedData: (DataCollection | DataState)[],
}