import type { IToggleProp } from "./interfaces";

import LightIcon from "../images/ampoule.png";


export default function Toggle(props: IToggleProp){



    return(
        <div className="ds-item"
        key={"state-" + props.index}
        style={{
            border: "1px solid grey",
            borderRadius: "10px",
            width: "40vw"
        }}>
            <h4
            style={{
                textTransform: "capitalize",
            }}>
                {props.data.dataName.replace("_", " - ")}
            </h4>
            <img src={LightIcon} className={`${props.data.dataName.split('_')[0]} ${props.data.dataState ? "active" : ""}`}/>
        </div>
    )
}

