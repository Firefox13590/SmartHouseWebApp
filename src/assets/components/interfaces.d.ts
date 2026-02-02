import type { DocumentReference, Timestamp } from "firebase/firestore/lite";





/* 
        Definitions pour Firebase
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
export declare interface IDataStateArray{
    dataStates: IDataState[],
}
/**
 * Type de donnée trackée par un élément {@link IIotObject}.
 * 
 * Responsable des données d'état (ex: porte ouverte/fermée).
 */
export declare interface IDataState {
    dataName: string,
    dataState: boolean,
}

/**
 * Un objet IoT comme une maison intelligente.
 */
export declare interface IIotObject {
    name: string,
    dataCollectionsRef?: DocumentReference,
    dataStatesRef?: DocumentReference,
}
/**
 * Les données associées à un objet {@link IIotObject}.
 */
export declare interface IIotData{
    dataCollectionArray?: IDataCollectionArray,
    dataStateArray?: IDataStateArray,
}





/* 
        Définitions pour les composants
*/

/**
 * Propriétés pour le composant Graph.
 */
export declare interface IGraphProperties{
    id: string,
    // key: string,
    data: IDataCollection[],
    graphDisplay: string,
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


