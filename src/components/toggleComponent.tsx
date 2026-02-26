import type { IToggleProp } from "../definitions/interfaces";

import LightIcon from "../assets/images/ampoule.png";


export default function Toggle(props: IToggleProp){
    // console.log(props.name, props.value);


    return(
        <div className="ds-item"
        // key={"state-" + props.id}
        style={{
            border: "1px solid grey",
            borderRadius: "10px",
            width: "40vw"
        }}>
            <h4
            style={{
                textTransform: "capitalize",
            }}>
                {props.name.replace("_", " - ")}
            </h4>
            <img
            src={LightIcon}
            className={`${props.name.split("_")[0]} ${props.value ? "active" : ""}`}
            />
        </div>
    )
}

