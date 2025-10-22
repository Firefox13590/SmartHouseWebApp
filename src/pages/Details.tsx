import { Link } from "react-router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import type { DocumentData, Firestore } from "firebase/firestore/lite";
import type { DataCollection, IotObject } from "../assets/components/interfaces";

import firebaseJson from "../assets/others/firebase.json";
import "./../assets/styles/Details.css";

import Graph from "../assets/components/graphComponent";



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
        <Link to={"/"} className="back2home">&lt; Home</Link>

        {data === null ? (
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
                        animation: "loading-animation 1s infinite",
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