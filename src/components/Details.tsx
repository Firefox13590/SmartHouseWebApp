import { Link } from "react-router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";

import type { Firestore } from "firebase/firestore/lite";
import type { IDataCollection, IIotObject, IIotData, IDataCollectionArray, IDataStateMap, IDataState } from "../definitions/interfaces";

import firebaseJson from "../assets/data/firebase.json";
import "./Details.css";
import Graph from "./graphComponent";
import Toggle from "./toggleComponent";



export default function Details() {
    const [iotObj, setIotObj] = useState<IIotObject | null>(null);
    const [iotData, setIotData] = useState<IIotData | null>(null);
    const [graphDisplay, setGraphDisplay] = useState("separated");



    useEffect(() => {
        // console.log(firebaseJson.config);
        const app = initializeApp(firebaseJson.config);
        const db = getFirestore(app);
        // console.log(db);

        getDbData(db);
    }, []);



    const getDbData = async(db: Firestore) => {
        const docRef = doc(db, "smartHouseTest", firebaseJson.docAccess.main);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const snapData = docSnap.data() as IIotObject;
            // console.log("document data: ", snapData);
            setIotObj(snapData);

            if(snapData.dataCollectionsRef !== undefined){
                const collectionData = (await getDoc(doc(db, snapData.dataCollectionsRef.path))).data() as IDataCollectionArray;
                // console.log("data collections: ", collectionData);
                setIotData((prev) => ({
                    ...prev,
                    dataCollectionArray: collectionData
                }));
            }
            if(snapData.dataStatesRef !== undefined){
                const stateData = (await getDoc(doc(db, snapData.dataStatesRef.path))).data() as IDataStateMap;
                console.log("data states: ", stateData);
                console.log(Object.entries(stateData));
                console.log(Object.entries(stateData.dataStates));
                console.log(Object.entries(stateData.dataStates).map(el => el[0]));
                setIotData((prev) => ({
                    ...prev,
                    dataStateArray: stateData
                }));
            }
        }
    }

    const refresh = () => {
        setIotObj(null);

        // console.log(firebaseJson.config);
        const app = initializeApp(firebaseJson.config);
        const db = getFirestore(app);
        // console.log(db);

        getDbData(db);
    }



    return(
        <>
        <Link to={"/"} className="back2home">&lt; Home</Link>

        {iotObj === null ? (
            <>
            <h1>Loading</h1>
            <div
            style={{
                width: "300px",
                height: "300px",
                margin: "auto",
                position: "relative",

                display: "flex",
                justifyContent: "center",
                alignItems: "start",
            }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i}
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#fff",
                        // backgroundImage: `linear-gradient(white, #${graphsColor[i]})`,
                        borderRadius: "50%",

                        position: "absolute",
                        animation: "loading-animation 1s infinite ease",
                        animationDelay: `${i * 0.1}s`,
                        transformOrigin: "center 150px",
                    }}></div>
                ))}
            </div>
            </>

        ) : (
            <>
            <div
            style={{
                backgroundColor: "#fff1",
                padding: "20px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
            }}>
                <h1
                style={{
                    margin: "auto",
                }}>{iotObj.name}</h1>

                <label className="input-display">
                    <p>Graph display: </p>
                    <select defaultValue="separated"
                    onChange={(e) => {setGraphDisplay(e.target.value)}}>
                        <option value="separated">Separated</option>
                        <option value="condensed">Condensed</option>
                    </select>
                </label>

                <button onClick={refresh}>Refresh</button>
            </div>

            {iotData === null ? (
                <h4>No data tracked currently</h4>
            ) : (
                <>
                {iotData.dataCollectionArray !== undefined ? (
                    // dc for data collection
                    <div className="dc-container">
                    {graphDisplay === "separated" ? (
                        <>
                        {iotData.dataCollectionArray.dataCollections.map((elem: IDataCollection, index: number) => (
                            <Graph 
                            data={[elem]}
                            graphDisplay={graphDisplay}
                            id={`chart-${index}`}
                            key={`chart-${index}`}/>
                        ))}
                        </>
                    ) : (
                        <Graph 
                        data={iotData.dataCollectionArray.dataCollections}
                        graphDisplay={graphDisplay}
                        id={'chart-1'}
                        key={'chart-1'}/>
                    )}
                    </div>
                ) : (
                    <h4>No data collection tracked currently</h4>
                )}

                {iotData.dataStateArray !== undefined ? (
                    <>
                    {/* ds for data state */}
                    <div className="ds-container"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        justifyItems: "center",
                        rowGap: "10vw"
                    }}>
                        {/* {Object.entries(iotData.dataStateArray.dataStates).map(el => (
                            <Toggle 
                            key={el[0]}
                            id={el[0]}
                            value={el[1][el[0]]}
                            />
                        ))} */}
                        {Object.entries(iotData.dataStateArray.dataStates).map(([key, value]) => (
                            <Toggle
                            key={key}
                            // data={{[key]: value}}
                            data={value}
                            />
                        ))}
                    </div>
                    </>
                ) : (
                    <h4>No data state tracked currently</h4>
                )}
                </>
            )}
            </>
        )}
        </>
    )
}