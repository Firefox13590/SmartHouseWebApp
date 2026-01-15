import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
// import { Capacitor } from "@capacitor/core";

// import type { ControlsConfig } from "../assets/components";

import "./../assets/styles/Controls.css";
// import configJson from "./../assets/others/config.json";
import firebaseJson from "../assets/others/firebase.json";


interface controlsConfig{
    alarm: boolean,
    dataCaptureTimer: {
        hour: number,
        minute: number
    }
}


export default function Settings() {
    // const [configData, setConfigData] = useState<controlsConfig>({
    //     alarm: false,
    //     dataCaptureTimer: {
    //         hour: 2,
    //         minute: 0
    //     }
    // });
    const [configData, setConfigData] = useState<controlsConfig | null>(null);


    useEffect(() => {
        // console.log(getConfigData());
        const conf: controlsConfig = {
            alarm: false,
            dataCaptureTimer: {hour: 2, minute: 0}
        };

        const readOut = getConfigData();
        // console.log(readOut);
        readOut
            .then((rep) => {
                // console.log(rep);
                const repConv = JSON.parse(rep) as controlsConfig;
                // console.log(repConv);
                // setConfigData(repConv);
                for(const prop in repConv){
                    conf[prop] = repConv[prop];
                }
            })
            .catch((err) => console.error(err));
        
        // console.log(conf);
        setConfigData(conf);
    }, [setConfigData]);


    const resetConfig = async() => {
        await Filesystem.deleteFile({
            path: "config.json",
            directory: Directory.Data
        });

        setConfigData({
            alarm: false,
            dataCaptureTimer: {
                hour: 2,
                minute: 0
            }    
        });

        await writeData('config.json', JSON.stringify(configData, null, 4));
        // console.log(await getConfigData());
    }

    const writeData = async(path: string, data: string) => {
        try {
            // const outputJson = JSON.stringify(configData, null, 4);
            const writeResult = await Filesystem.writeFile({
                path: path, 
                data: data,
                directory: Directory.Data,
                encoding: Encoding.UTF8,
                recursive: true    
            });
            console.log('Config saved', writeResult);
        } catch (err) {
            console.error('Error writing config file:', err);
        }
        // console.log(await getConfigData());

        const app = initializeApp(firebaseJson.config);
        const db = getFirestore(app);
        await setDoc(doc(db, "smartHouseTest", firebaseJson.docAccess.config), configData);
    }

    const updateConfigData = async(property: string, value: unknown) => {
        setConfigData((prevState) => {
            if (prevState === null) {
                return {
                    alarm: false,
                    dataCaptureTimer: { hour: 2, minute: 0 },
                    [property]: value
                } as controlsConfig;
            }
            return {
                ...prevState,
                [property]: value
            } as controlsConfig;
        });
        // console.log(property, value);
        // console.log(configData);

        // write file in app data folder
        await writeData('config.json', JSON.stringify(configData, null, 4));
    }

    const getConfigData = async() => {
        const readRes = await Filesystem.readFile({
            path: "config.json",
            directory: Directory.Data,
        });
        // console.log(readRes);
        const readData = readRes.data as string;
        // console.log(readData);

        return readData;
    }


    return(
        <>
        <Link to={"/"} className="back2home">&lt; Home</Link>

        <h1>Settings</h1>

        <button onClick={resetConfig}>Reset settings</button>

        {configData === null ? (
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
            <div id="config">
                <div className="controlSection">Behaviour</div>

                <div id="config-alarm" className="input-display">
                    <p>Set alarm system: </p>

                    <div
                    style={{
                        display: "flex",
                        gap: "1px",

                        border: "1px solid #aaa",
                        backgroundColor: "#aaa",
                        borderRadius: "10px",
                        // padding: "5px",
                        overflow: "hidden",
                    }}>
                        <div className={configData?.alarm ? "active" : ""}
                        onClick={() => updateConfigData("alarm", true)}>
                            {/* <input type="radio" name="alarm" id="alarm-on" value="on" />
                            <label htmlFor="alarm-on">On</label> */}
                            ON
                        </div>

                        <div className={configData?.alarm ? "" : "active"}
                        onClick={() => updateConfigData("alarm", false)}>
                            {/* <input type="radio" name="alarm" id="alarm-off" value="off" defaultChecked />
                            <label htmlFor="alarm-off">Off</label> */}
                            OFF
                        </div>
                    </div>
                </div>

                <div id="config-capture-timer" className="input-display">
                    <p>Capture data every: </p>

                    <div
                    style={{
                        display: "flex",
                        gap: "5px",
                    }}>
                        <select name="select-hour" id="select-hour" defaultValue={configData?.dataCaptureTimer.hour}
                        // onChange={(e) => updateConfigData("dataCaptureTimer.hour", (e.target as HTMLSelectElement).value)}>
                        onChange={async(e) => {
                            if(configData?.dataCaptureTimer !== null && configData?.dataCaptureTimer !== undefined){
                                const config = {
                                    ...configData,
                                    dataCaptureTimer: {
                                        ...configData.dataCaptureTimer,
                                        hour: Number(e.target.value)
                                    }
                                };
                                console.log(Number(e.target.value));
                                setConfigData(config);
                                await writeData('config.json', JSON.stringify(config, null, 4));
                            }
                        }}>
                        <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={48}>48</option>
                            <option value={72}>72</option>
                        </select>
                        <label htmlFor="select-hour">h</label>

                        <select name="select-minute" id="select-minute" defaultValue={configData?.dataCaptureTimer.minute}
                        // onChange={(e) => updateConfigData("dataCaptureTimer.minute", (e.target as HTMLSelectElement).value)}>
                        onChange={async(e) => {
                            if(configData?.dataCaptureTimer !== null && configData?.dataCaptureTimer !== undefined){
                                const config = {
                                    ...configData,
                                    dataCaptureTimer: {
                                        ...configData.dataCaptureTimer,
                                        minute: Number(e.target.value)
                                    }
                                };
                                console.log(Number(e.target.value));
                                setConfigData(config);
                                await writeData('config.json', JSON.stringify(config, null, 4));
                            }
                        }}>
                        <option value={0}>0</option>
                            {/* <option value={15}>15</option> */}
                            <option value={30}>30</option>
                        </select>
                        <label htmlFor="select-minute">min</label>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}