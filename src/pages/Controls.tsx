import { useEffect, useState } from "react";
import { Link } from "react-router";
// import * as fs from "fs";
import { Filesystem, Directory } from '@capacitor/filesystem';

import "./../assets/styles/Controls.css";
import configJson from "./../assets/others/config.json";


interface controlsConfig{
    alarm?: boolean,
}


export default function Controls() {
    const [configData, setConfigData] = useState<controlsConfig>({});


    useEffect(() => {
        // console.log(configJson);
        setConfigData(configJson);
    }, [setConfigData]);


    function updateConfigData(property: string, value: unknown){
        setConfigData((prevState) => ({
            ...prevState,
            [property]: value,
        }));
        // console.log(property, value);
        // console.log(configData);

        const outputJson = JSON.stringify(configData, null, 4);
        // fs.writeFile("./../assets/others/config.json", outputJson, (err) => {
        //     if(err){
        //         console.error("Error writing config file:", err);
        //     }
        // });
        Filesystem.writeFile({
            path: "./../assets/others/config.json",
            data: outputJson,
            directory: Directory.Data,
        });
    }


    return(
        <>
        <Link to={"/"} className="back2home">&lt; Home</Link>

        <h1>Settings</h1>

        <div id="config">
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
                    <div className={configData.alarm ? "active" : ""}
                    onClick={() => updateConfigData("alarm", true)}>
                        {/* <input type="radio" name="alarm" id="alarm-on" value="on" />
                        <label htmlFor="alarm-on">On</label> */}
                        ON
                    </div>

                    <div className={configData.alarm ? "" : "active"}
                    onClick={() => updateConfigData("alarm", false)}>
                        {/* <input type="radio" name="alarm" id="alarm-off" value="off" defaultChecked />
                        <label htmlFor="alarm-off">Off</label> */}
                        OFF
                    </div>
                </div>
            </div>

            <div id="config-capture-timer" className="input-display">
                <p>Capture data collections every: </p>

                <div
                style={{
                    display: "flex",
                    gap: "5px",
                }}>
                    <select name="select-hour" id="select-hour" defaultValue={0}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                    </select>
                    <label htmlFor="select-hour">h</label>

                    <select name="select-minute" id="select-minute" defaultValue={30}>
                        <option value={0}>0</option>
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                    </select>
                    <label htmlFor="select-minute">min</label>
                </div>
            </div>
        </div>
        </>
    )
}