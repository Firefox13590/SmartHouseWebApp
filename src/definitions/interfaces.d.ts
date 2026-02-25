import type { DocumentReference, Timestamp } from "firebase/firestore/lite";





/* 
        Définitions pour Firebase
*/

/**
 * Liste de {@link IDataCollection}.
 */
export declare interface IDataCollectionArray{
    dataCollections: IDataCollection[],
}
/**
 * Type de donnée trackée par un élément {@link IIotObject}.
 * 
 * Responsable des données sur la durée (ex: température).
 */
export declare interface IDataCollection {
    dataName: string,
    dataValues: number[],
    dataTimestamps: Timestamp[],
}
/**
 * Liste de {@link IDataState}.
 */
export declare interface IDataStateMap{
    // dataStates: IDataState[],
    // dataStates: {[dataName: string]: IDataState},
    // dataStates: Record<string, IDataState>,
    [dataName: string]: IDataState,
}
/**
 * Type de donnée trackée par un élément {@link IIotObject}.
 * 
 * Responsable des données d'état (ex: porte ouverte/fermée).
 */
export declare interface IDataState {
    // dataName: string,
    // dataState: boolean,
    [dataName: string]: boolean,
}

/**
 * Un objet IoT comme une maison intelligente.
 */
export declare interface IIotObject {
    name: string,
    dataCollectionsRef?: DocumentReference,
    dataStatesRef?: DocumentReference,
    configRef: DocumentReference,
}
/**
 * Les données associées à un objet {@link IIotObject}.
 */
export declare interface IIotData{
    dataCollectionArray?: IDataCollectionArray,
    dataStateArray?: IDataStateMap,
}





/* 
        Définitions pour les composants
*/

/**
 * Propriétés pour le composant Graph.
 */
export declare interface IGraphProp{
    id: string,
    data: IDataCollection[],
    graphDisplay: string,
}
export declare interface IToggleProp{
    // name: string,
    // value: boolean,
    [name: string]: IDataState,
}





/* 
        Autres définitions
*/

/**
 * Configuration des contrôles d'un objet {@link IIotObject}.
 */
export declare interface IControlsConfig{
    alarm: boolean,
    dataCaptureTimer: {
        hour: number,
        minute: number
    }
}


