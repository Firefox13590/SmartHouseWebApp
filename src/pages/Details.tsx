import { Link } from "react-router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";

import type { Firestore } from "firebase/firestore/lite";
import type { IDataCollection, IIotObject, IIotData, IDataCollectionArray, IDataStateArray, IDataState } from "../assets/components/interfaces";

import firebaseJson from "../assets/others/firebase.json";
import "./../assets/styles/Details.css";
import Graph from "../assets/components/graphComponent";
import LightIcon from "../assets/images/ampoule.png";



export default function Details() {
    const [iotObj, setIotObj] = useState<IIotObject | null>(null);
    const [iotData, setIotData] = useState<IIotData | null>(null);
    const [graphDisplay, setGraphDisplay] = useState("separated");

    // const graphsColor = ["080", "00f", "f00", "880", "088", "808"];


    useEffect(() => {
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
                    const stateData = (await getDoc(doc(db, snapData.dataStatesRef.path))).data() as IDataStateArray;
                    // console.log("data states: ", stateData);
                    setIotData((prev) => ({
                        ...prev,
                        dataStateArray: stateData
                    }));
                }
            }
        }
    

        // console.log(firebaseJson.config);
        const app = initializeApp(firebaseJson.config);
        const db = getFirestore(app);
        // console.log(db);

        getDbData(db);
    }, []);


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
            {/* <Link to={"/"} className="back2home">&lt; Home</Link> */}

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
            </div>

            {iotData === null ? (
                <h4>No data tracked currently</h4>
            ) : (
                <>
                {iotData.dataCollectionArray !== undefined ? (
                    <>
                    {graphDisplay === "separated" ? (
                        <>
                        {iotData.dataCollectionArray.dataCollections.map((elem: IDataCollection, index: number) => (
                            <Graph 
                            data={[elem]}
                            graphDisplay={graphDisplay}
                            id={`chart-${index}`}
                            key={`chart-${index}`}></Graph>
                        ))}
                        {/* <Graph color="green" object={data.trackedData[0]}></Graph> */}
                        </>
                    ) : (
                        <Graph 
                        data={iotData.dataCollectionArray.dataCollections}
                        graphDisplay={graphDisplay}
                        id={'chart-1'}
                        key={'chart-1'}></Graph>
                    )}
                    </>
                ) : (
                    <h4>No data collection tracked currently</h4>
                )}

                {iotData.dataStateArray !== undefined ? (
                    <>
                    {/* <div>insert data state</div> */}
                    <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        gap: "5vw"
                    }}>
                        {iotData.dataStateArray.dataStates.map((elem: IDataState, index: number) => (
                            <div
                            key={"state-" + index}
                            style={{
                                border: "1px solid grey",
                                borderRadius: "10px",
                                width: "40vw"
                            }}>
                                <h4
                                style={{
                                    textTransform: "capitalize",
                                }}>
                                    {elem.dataName.replace("_", " - ")}
                                </h4>
                                {/* <img src={LightIcon} alt="" style={{filter: "invert(1)"}}/> */}
                                <img src={LightIcon} className={`link-icon light ${elem.dataState ? "on" : "off"}`}/>
                            </div>
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