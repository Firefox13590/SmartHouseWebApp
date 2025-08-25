import { Link } from "react-router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import type { DocumentData, Firestore } from "firebase/firestore/lite";

import firebaseJson from "../assets/others/firebase.json";

import Graph from "../assets/components/graphComponent";


export interface DataCollection {
    dataName: string,
    dataValues: (string | number)[],
}
interface IotObject {
    dbAccess: string,
    name: string,
    type: string,
    trackedData: DataCollection[],
}


export default function Details() {
    const [data, setData] = useState<IotObject | DocumentData | null>(null);
    const graphsColor = ["080", "00f", "f00", "880", "088", "808"];
    const [graphDisplay, setGraphDisplay] = useState("separated");


    useEffect(() => {
        // console.log(firebaseJson.config);
        const app = initializeApp(firebaseJson.config);
        const db = getFirestore(app);
        // console.log(db);

        getDbData(db);
    }, []);


    const getDbData = async(db: Firestore) => {
        const smartHouseCol = collection(db, "smartHouseTest");
        const smartHouseSnapshot = await getDocs(smartHouseCol);
        const smartHouseData = smartHouseSnapshot.docs.map(doc => doc.data());
        console.log(smartHouseData);
        setData(smartHouseData[0]);
    }


    return(
        <>
        {data === null ? (
            <h1>Loading</h1>
        ) : (
            <>
            <Link to={"/"} className="back2home">&lt; Home</Link>

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
                }}>{data.name}</h1>

                <label className="input-display">
                    <p>Graph display: </p>
                    <select defaultValue="separated"
                    onChange={(e) => {setGraphDisplay(e.target.value)}}>
                        <option value="separated">Separated</option>
                        <option value="condensed">Condensed</option>
                    </select>
                </label>
            </div>

            {graphDisplay === "separated" ? (
                <>
                {data.trackedData.map((elem: DataCollection, index: number) => (
                    <Graph 
                    color={[`#${graphsColor[index]}`]}
                    object={[elem]}
                    display={graphDisplay}
                    id={`chart${index}`}
                    key={`chart${index}`}></Graph>
                ))}
                {/* <Graph color="green" object={data.trackedData[0]}></Graph> */}
                </>
            ) : (
                <Graph 
                color={[`#${graphsColor[0]}`, `#${graphsColor[1]}`]}
                object={data.trackedData}
                display={graphDisplay}
                id={`chart-1`}
                key={`chart-1`}></Graph>
            )}
            </>
        )}
        </>
    )
}